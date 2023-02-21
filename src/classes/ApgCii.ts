/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.7.0 [APG 2019/08/15]
 * @version 0.7.1 [APG 2019/08/27]
 * @version 0.8.0 [APG 2022/04/03] Porting to Deno
 * @version 0.9.2 [APG 2022/11/30] Github beta
 * @version 0.9.3 [APG 2022/12/18] Deno Deploy
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { A2D, Lgr, Rst, Svg, Uts, Cad } from "../../deps.ts";

import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../interfaces/IApgCiiInstruction.ts";
import { ApgCiiValidatorService } from "./ApgCiiValidatorService.ts";


/** Apg Cad Instructions Interpreter
 */
export class ApgCii extends Lgr.ApgLgrLoggable {

  /** Interpreter Name*/
  private _name: string;

  /** Apg Cad Svg Instance*/
  private _cad: Cad.ApgCadSvg;

  /** Set of the points defined in the drawing */
  private _points: Map<string, A2D.Apg2DPoint> = new Map<string, A2D.Apg2DPoint>();

  /** Index for auto numbering of ids */
  private _currInstructionNum = 0;

  /** Index for auto labelling of the points */
  private _nextPointIndex = 0;

  /** Set of instructions */
  private _instructions: IApgCiiInstruction[] = [];

  /** Stack of layers */
  private _layersStack: Svg.ApgSvgNode[] = [];

  /** Last node for Stroke ad fill operations */
  private _lastNode: Svg.ApgSvgNode | null = null;

  /** Path Drawing mode: only path and point operations are allowed in this mode */
  private _pathMode = false;

  /** Path builder for path mode */
  private _pathBuilder = new Svg.ApgSvgPathBuilder();

  /** Path origin */
  private _pathOrigin: A2D.Apg2DPoint | null = null;


  constructor(alogger: Lgr.ApgLgr, acad: Cad.ApgCadSvg) {

    super('ApgCii', alogger);
    this.logBegin('constructor');

    this._cad = acad;
    this._name = 'Unnamed ApgCii';
    this._layersStack.push(acad.currentLayer);

    this.logEnd();
  }


  // #region Instuctions loading and validation --------------------------------

  public set(ainstructions: IApgCiiInstruction[]) {
    let r: Rst.IApgRst = { ok: true }
    this.logBegin(this.set.name);

    r = this.#validateAndSet(ainstructions);

    this.logEnd(r);
    return r;
  }

  public async load(afile: string) {

    let r: Rst.IApgRst = { ok: true }
    this.logBegin(this.load.name);

    const jsonData = await Uts.ApgUtsJsonFile.Read(afile);
    const instructions = <IApgCiiInstruction[]>jsonData;

    r = this.#validateAndSet(instructions);

    this.logEnd();
    return r;
  }

  #validateAndSet(ainstructions: IApgCiiInstruction[]) {

    let r: Rst.IApgRst = { ok: true }
    this.logBegin(this.#validateAndSet.name);

    r = ApgCiiValidatorService.Validate(ainstructions);

    if (r.ok) {
      this._instructions = ainstructions;
    }

    this.logEnd();
    return r

  }

  // #endregion


  // #region Drawing setup -----------------------------------------------------

  setName_(aname: string) {

    let r: Rst.IApgRst = { ok: true }
    this.logBegin(this.setName_.name);
    this.#traceInstruction(eApgCiiInstructionTypes.SET_NAME);

    if (this._currInstructionNum === 1) {
      this._name = aname;
    }
    else {
      r = Rst.ApgRstErrors.Parametrized(
        "If present [%1] must first instruction",
        [eApgCiiInstructionTypes.SET_NAME]
      );
    }

    this.logEnd();
    return r;
  }


  setViewBox_(aviewBox: Cad.IApgCadSvgViewBox) {

    this.logBegin(this.setViewBox_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.SET_VIEWBOX);

    if (r.ok) {

      if (this._currInstructionNum === 2) {
        this._cad.setViewBox(aviewBox);
      }
      else {
        r = Rst.ApgRstErrors.Parametrized(
          "If present [%1] must be the second instruction immediately after [%2]",
          [eApgCiiInstructionTypes.SET_VIEWBOX, eApgCiiInstructionTypes.SET_NAME]
        );
      }
    }

    this.logEnd();
    return r;
  }


  setCartesian_(acartesianParams: Cad.IApgCadSvgCartesians) {

    this.logBegin(this.setCartesian_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.SET_CARTESIAN);

    if (r.ok) {
      const prevType = this._instructions[this._currInstructionNum - 1].type;
      if (
        (prevType === eApgCiiInstructionTypes.SET_NAME) ||
        (prevType === eApgCiiInstructionTypes.SET_VIEWBOX) ||
        (prevType === eApgCiiInstructionTypes.SET_BACKGROUND)
      ) {
        this._cad.setCartesian(acartesianParams);
      }
      else {
        r = Rst.ApgRstErrors.Parametrized(
          "If present [%1] must follow [%2], [%3] or [%4]",
          [eApgCiiInstructionTypes.SET_CARTESIAN, eApgCiiInstructionTypes.SET_NAME, eApgCiiInstructionTypes.SET_VIEWBOX, eApgCiiInstructionTypes.SET_BACKGROUND]
        );
      }
    }

    this.logEnd();
    return r;
  }


  setBackground_(abckg: Cad.IApgCadSvgGround) {

    this.logBegin(this.setBackground_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.SET_BACKGROUND);

    if (r.ok) {

      const prevType = this._instructions[this._currInstructionNum - 1].type;
      if (
        (prevType === eApgCiiInstructionTypes.SET_NAME) ||
        (prevType === eApgCiiInstructionTypes.SET_VIEWBOX)
      ) {
        this._cad.setBackground(abckg);
      }
      else {
        r = Rst.ApgRstErrors.Parametrized(
          "If present [%1] must follow [%2], or [%3]",
          [eApgCiiInstructionTypes.SET_BACKGROUND, eApgCiiInstructionTypes.SET_NAME, eApgCiiInstructionTypes.SET_VIEWBOX]
        );
      }
    }

    this.logEnd();
    return r;
  }

  //#endregion


  // #region Layers and groups -------------------------------------------------

  /** Sets the current layer by name and puts it on the stack. Layer must already exist */
  pushLayer_(alayerName: string) {

    this.logBegin(this.pushLayer_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.PUSH_LAYER, alayerName);

    if (r.ok) {
      const layer: Svg.ApgSvgNode | undefined = this._cad.setCurrentLayer(alayerName);

      if (!layer) {
        r = Rst.ApgRstErrors.Parametrized(
          `Layer [%1] not found `,
          [alayerName]
        )
      }
      else {
        this._layersStack.push(layer);
      }
    }

    this.logEnd();
    return r;
  }


  /** Removes the layer from the stack and restores the previous one. Stack must not be empty */
  popLayer_() {

    this.logBegin(this.popLayer_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.POP_LAYER);

    if (r.ok) {

      const layer = this._layersStack.pop();

      if (!layer) {
        r = Rst.ApgRstErrors.Parametrized(
          `There aren't any layer on the layer stack. There are POP_LAYER mismatches.`,
          []
        )
      }
      else if (this._layersStack.length < 1) {
        r = Rst.ApgRstErrors.Parametrized(
          `Pop operation has emptied the layer Stack. There is a POP_LAYER mismatch.`,
          []
        )
      }
      else {
        const layerName = this._layersStack[this._layersStack.length - 1].ID;
        this._cad.setCurrentLayer(layerName);
      }
    }

    this.logEnd();
    return r;
  }


  /** Creates a new group in the current layer ad sets it as the current one
   * @returns Error If the group name already exists */
  newGroup_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.newGroup_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.NEW_GROUP);

    if (r.ok) {
      const group: Svg.ApgSvgNode | undefined = this._cad.getGroup(ainstruction.name!);

      if (group) {
        r = Rst.ApgRstErrors.Parametrized(
          `Group name [%1] already exists. Use SetGroup instead.`,
          [ainstruction.name!]
        )
      }
      else {
        const options: Cad.IApgCadStyleOptions = {};
        if (ainstruction.strokeStyle) {
          r = this.#checkStrokeStyle(ainstruction.strokeStyle);
        }
        if (r.ok && ainstruction.fillStyle) {
          r = this.#checkFillStyle(ainstruction.fillStyle);
        }
        if (r.ok && ainstruction.textStyle) {
          r = this.#checkTextStyle(ainstruction.textStyle);
        }
        if (r.ok) {
          this._cad.newGroup(ainstruction.name!, options);
        }
      }
    }

    this.logEnd();
    return r;
  }


  /** Relinks the drawing instructions to the already created and named group.  */
  setGroup_(agroupName: string) {

    this.logBegin(this.setGroup_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.SET_GROUP);

    if (r.ok) {
      const group: Svg.ApgSvgNode | undefined = this._cad.setCurrentGroup(agroupName);

      if (!group) {
        r = Rst.ApgRstErrors.Parametrized(
          `Group [%1] not found .`,
          [agroupName]
        )
      }
    }

    this.logEnd();
    return r;
  }


  /** After this call the drawing instructions will bond to the current layer */
  noGroup_() {

    this.logBegin(this.noGroup_.name);
    const r = this.#traceInstruction(eApgCiiInstructionTypes.NO_GROUP);

    if (r.ok) {
      this._cad.unSetCurrentGroup();
    }

    this.logEnd();
    return r;
  }

  //#endregion


  // #region Points management --------------------------------------------------

  /** Adds a point to the points set. Path mode compatible*/
  newPoint_(ainstruction: IApgCiiInstruction) {

    const pointName = ainstruction.name || 'P#' + this._nextPointIndex;

    this.logBegin(this.newPoint_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.NEW_POINT, pointName, true);

    if (ainstruction.name) {
      const pointExists = this._points.get(ainstruction.name);
      if (pointExists) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] already exists`,
          [ainstruction.name]
        )
      }
    }

    if (r.ok) {
      const newPoint = new A2D.Apg2DPoint(ainstruction.x!, ainstruction.y!);
      this._nextPointIndex++;
      this._points.set(pointName, newPoint);
    }

    this.logEnd();
    return r;
  }


  /** Adds a point to the points set, by setting a distance from another point. Path mode compatible */
  newPointByDelta_(ainstruction: IApgCiiInstruction) {

    const pointName = ainstruction.name || 'P#' + this._nextPointIndex;

    this.logBegin(this.newPointByDelta_.name,);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.NEW_POINT_DELTA, pointName, true);

    const point = this._points.get(ainstruction.origin!);

    if (!point) {
      r = Rst.ApgRstErrors.Parametrized(
        `Point origin named [%1] not found in set.`,
        [ainstruction.origin!]
      )
    }
    else {
      const x = point.x + ainstruction.w!;
      const y = point.y + ainstruction.h!;
      const newPoint = new A2D.Apg2DPoint(x, y);

      this._nextPointIndex++;
      this._points.set(pointName, newPoint);
    }

    this.logEnd();
    return r;
  }


  //#endregion


  // #region Utility methods ---------------------------------------------------

  /** 
   * Adds the specified node to the current group if set or to the current layer
   */
  #setParent(anode: Svg.ApgSvgNode) {

    const currentParent = (this._cad.currentGroup) ? this._cad.currentGroup : this._cad.currentLayer;
    anode.childOf(currentParent);

  }

  /** @payload: Apg2DPoint[]*/
  #get2PointsByNames(apoints: string[]) {

    let r: Rst.IApgRst = { ok: true }
    const pts: A2D.Apg2DPoint[] = [];
    this.logBegin(this.#get2PointsByNames.name);

    if (apoints.length !== 2) {
      r = Rst.ApgRstErrors.Parametrized(
        `Wrong number of points: must be 2`)
    }

    r = this.#getNPoints(apoints, pts);

    if (r.ok) {
      if (pts.length !== 2) {
        r = Rst.ApgRstErrors.Parametrized(
          `Points [%1] and [%2] are identical`,
          apoints
        )
      }
    }

    if (r.ok) {
      const jsonPt1 = JSON.stringify(pts[0]);
      const jsonPt2 = JSON.stringify(pts[1]);

      if (jsonPt1 === jsonPt2) {
        r = Rst.ApgRstErrors.Parametrized(
          `Points [%1] and [%2] are overlapped`,
          apoints
        )
      }
    }

    r.payload = { signature: "Apg2DPoint[]", data: pts }
    this.logEnd();
    return r;
  }


  #getNPoints(apointNames: string[], apoints: A2D.Apg2DPoint[]) {

    let r = this.#getPointsByNames(apointNames!);

    if (r.ok) {
      r = this.#extractPointsFromPayload(r, apoints);
    }
    return r;
  }


  #get2Points(apointNames: string[], apoints: A2D.Apg2DPoint[]) {

    let r = this.#get2PointsByNames(apointNames!);

    if (r.ok) {
      r = this.#extractPointsFromPayload(r, apoints);
    }
    return r;
  }


  #extractPointsFromPayload(ar: Rst.IApgRst, apts: A2D.Apg2DPoint[]) {

    if (ar.ok) {
      const p = Rst.ApgRst.ExtractPayload(ar, "Apg2DPoint[]") as Rst.IApgRst;

      if (p.ok != undefined && p.ok == false) {
        ar = p;
      }

      if (ar.ok) {
        for (const point of p as unknown as A2D.Apg2DPoint[]) {
          apts.push(point);
        }
      }
    }
    return ar;
  }


  #getPointsByNames(apts: string[]) {

    let r: Rst.IApgRst = { ok: true }
    this.logBegin(this.#getPointsByNames.name);
    const pts: A2D.Apg2DPoint[] = []

    let prevPt: string;
    let first = true;
    apts.forEach(apointName => {
      if (r.ok) {
        const point = this._points.get(apointName);
        if (!point) {
          r = Rst.ApgRstErrors.Parametrized(
            `Point named [%1] not found.`,
            [apointName]
          )
        }
        else {
          if (first) {
            first = false;
            pts.push(point);
          }
          else {
            if (prevPt !== apointName) {
              pts.push(point);
            }
          }
          prevPt = apointName;
        }
      }
    });
    r.payload = { signature: "Apg2DPoint[]", data: pts }
    this.logEnd();
    return r;
  }


  #trySetRotation(
    node: Svg.ApgSvgNode,
    apivot: A2D.Apg2DPoint | string,
    aangle: number
  ) {
    let r: Rst.IApgRst = { ok: true }

    let pivot: A2D.Apg2DPoint | null = null
    if (typeof (apivot) == 'string') {
      const newPivot = this._points.get(apivot);
      if (!newPivot) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found.`,
          [apivot]
        )
      }
      else {
        pivot = A2D.Apg2DPoint.Clone(newPivot);
      }
    }
    else {
      pivot = A2D.Apg2DPoint.Clone(apivot);
    }

    if (r.ok && pivot) {
      node.rotate(aangle, pivot.x, pivot.y);
    }

    return r;
  }


  #trySetFillStyle(node: Svg.ApgSvgNode, afillStyleName: string) {
    let r = this.#checkFillStyle(afillStyleName);
    const p = Rst.ApgRst.ExtractPayload(r, "IApgSvgFillStyle") as Rst.IApgRst;
    if (p.ok != undefined && p.ok == false) {
      r = p;
    }
    if (r.ok) {
      const fill = p as unknown as Svg.IApgSvgFillStyle;
      node.fill(fill.color, fill.opacity);
    }
    return r;
  }


  #trySetStrokeStyle(node: Svg.ApgSvgNode, astrokeStyleName: string) {
    let r = this.#checkStrokeStyle(astrokeStyleName);
    const p = Rst.ApgRst.ExtractPayload(r, "IApgSvgStrokeStyle") as Rst.IApgRst;
    if (p.ok != undefined && p.ok == false) {
      r = p;
    }
    if (r.ok) {
      const strk = p as unknown as Svg.IApgSvgStrokeStyle;
      node.stroke(strk.color, strk.width);
      if (strk.dashPattern) {
        node.strokeDashPattern(strk.dashPattern, strk.dashOffset)
      }
    }
    return r;
  }


  #trySetTextStyle(node: Svg.ApgSvgNode, atextStyleName: string) {
    let r = this.#checkTextStyle(atextStyleName);
    const p = Rst.ApgRst.ExtractPayload(r, "IApgSvgTextStyle") as Rst.IApgRst;
    if (p.ok != undefined && p.ok == false) {
      r = p;
    }
    if (r.ok) {
      const textStyle = p as unknown as Svg.IApgSvgTextStyle;
      node.textStyle(textStyle);
    }
    return r;
  }


  #checkIfPolygonIsClosed(apts: A2D.Apg2DPoint[]) {
    const lastI = apts.length - 1;
    if (apts[0].x != apts[lastI].x || apts[0].y != apts[lastI].y) {
      apts.push(apts[0]);
    }
  }


  #checkStrokeStyle(astrokeStyleName: string) {
    let r: Rst.IApgRst = { ok: true }

    const p = this._cad.getStrokeStyle(astrokeStyleName);
    if (p === undefined) {
      r = Rst.ApgRstErrors.Parametrized(
        `Stroke style [%1] not found`,
        [astrokeStyleName]
      )
    }

    if (r.ok) {
      r.payload = { signature: 'IApgSvgStrokeStyle', data: p }
    }
    return r;
  }


  #checkFillStyle(afillStyleName: string) {
    let r: Rst.IApgRst = { ok: true }

    const p = this._cad.getFillStyle(afillStyleName);
    if (p === undefined) {
      r = Rst.ApgRstErrors.Parametrized(
        `Fill style [%1] not found`,
        [afillStyleName]
      )
    }

    if (r.ok) {
      r.payload = { signature: 'IApgSvgFillStyle', data: p }
    }
    return r;
  }


  #checkTextStyle(atextStyleName: string) {
    let r: Rst.IApgRst = { ok: true }

    const p = this._cad.getTextStyle(atextStyleName);
    if (p === undefined) {
      r = Rst.ApgRstErrors.Parametrized(
        `Text style [%1] not found`,
        [atextStyleName]
      )
    }

    if (r.ok) {
      r.payload = { signature: 'IApgSvgTextStyle', data: p }
    }
    return r;
  }


  #getBasicShapesFactory() {
    const factory = this._cad.getPrimitiveFactory(
      Cad.eApgCadFactories.BASIC_SHAPES
    ) as Cad.ApgCadSvgBasicShapesFactory;
    return factory;
  }


  #traceInstruction(atype: eApgCiiInstructionTypes, aname?: string, apathModeAllowed = false) {
    this._currInstructionNum++;
    let m = `  > ${this._currInstructionNum}: ${atype}`;
    if (aname && aname != "") {
      m += " - " + aname;
    }
    this.logTrace(m);

    return this.#checkPathMode(atype, apathModeAllowed);

  }


  #checkPathMode(atype: eApgCiiInstructionTypes, apathModeAllowed: boolean) {
    let r: Rst.IApgRst = { ok: true }

    if (!apathModeAllowed && this._pathMode) {
      r = Rst.ApgRstErrors.Parametrized(
        `Interpreter is in path mode. The current instruction [%1] is not allowed`,
        [atype]
      )
    }

    return r;
  }


  #setShapeAttributes(
    anode: Svg.ApgSvgNode,
    ainstruction: IApgCiiInstruction,
    arotationPivot?: A2D.Apg2DPoint
  ) {

    let r: Rst.IApgRst = { ok: true };

    if (r.ok && ainstruction.fillStyle) {
      r = this.#trySetFillStyle(anode, ainstruction.fillStyle);
    }
    else {
      anode.fill(Cad.eApgCadDftFillStyles.NONE);
    }

    if (r.ok && ainstruction.strokeStyle) {
      r = this.#trySetStrokeStyle(anode, ainstruction.strokeStyle);
    }

    if (r.ok && ainstruction.angle) {
      if (arotationPivot) {
        r = this.#trySetRotation(anode, arotationPivot, ainstruction.angle);
      }
      else if (ainstruction.pivot) {
        r = this.#trySetRotation(anode, ainstruction.pivot, ainstruction.angle);
      }
    }

    return r;
  }

  //#endregion


  // #region Drawing routines --------------------------------------------------


  /** Draws a series of points */
  drawPoints_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPoints_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_POINTS);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#getNPoints(ainstruction.points!, pts);
    }

    if (r.ok) {

      const factory = this.#getBasicShapesFactory();

      for (const pt of pts) {
        const node = factory.buildDot(pt, ainstruction.radious!)

        if (r.ok && ainstruction.strokeStyle) {
          r = this.#trySetStrokeStyle(node, ainstruction.strokeStyle);
        }
        if (r.ok && ainstruction.fillStyle) {
          r = this.#trySetFillStyle(node, ainstruction.fillStyle);
        }
        if (r.ok) {
          this.#setParent(node);
        }
      }
    }
    this.logEnd();
    return r;
  }


  /** Draws all the points adding debbugging info (name / coordinates) */
  drawAllPointsWithInfo_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawAllPointsWithInfo_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_ALL_POINTS);

    if (r.ok) {
      r = this.#checkTextStyle(ainstruction.textStyle!)

      if (!r.ok) {
        r = this.#checkTextStyle(Cad.eApgCadDftTextStyles.MONO);
      }
    }

    if (r.ok) {
      const ts = Rst.ApgRst.ExtractPayload(r, "IApgSvgTextStyle") as Rst.IApgRst;

      if (ts.ok != undefined && ts.ok == false) {
        r = ts;
      }

      if (r.ok) {
        const textStyle = ts as unknown as Svg.IApgSvgTextStyle

        const factory = this.#getBasicShapesFactory();

        this._points.forEach((pt, name) => {
          const node = factory
            .buildPoint(pt, ainstruction.radious!, name, textStyle!);

          this.#setParent(node);
        });
      }
    }
    this.logEnd();
    return r;
  }


  /** Draws a line between the given points */
  drawLine_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawLine_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_LINE, ainstruction.name);

    const pts: A2D.Apg2DPoint[] = [];

    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {
      const factory = this.#getBasicShapesFactory();
      const node = factory.buildLine(pts[0], pts[1])

      r = this.#setShapeAttributes(node, ainstruction, pts[0]);

      this.#setParent(node);
    }

    this.logEnd();
    return r;
  }


  /** Draws an open polyline */
  #drawPolyLine(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawPolyLine.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_POLYLINE, ainstruction.name);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#getNPoints(ainstruction.points!, pts);
    }

    if (r.ok && pts.length > 2) {

      const factory = this.#getBasicShapesFactory();
      const node = factory.buildPolyLine(pts)

      r = this.#setShapeAttributes(node, ainstruction, pts[0]);

      this.#setParent(node);
    }

    this.logEnd();
    return r;
  }


  /** Draw rectangle by bottom left and upper right corners*/
  #drawRectangleByPoints(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawRectangleByPoints.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_RECTANGLE_POINTS, ainstruction.name);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {

      const vertices: A2D.Apg2DPoint[] = [];
      vertices.push(new A2D.Apg2DPoint(pts[0].x, pts[0].y));
      vertices.push(new A2D.Apg2DPoint(pts[0].x, pts[1].y));
      vertices.push(new A2D.Apg2DPoint(pts[1].x, pts[1].y));
      vertices.push(new A2D.Apg2DPoint(pts[1].x, pts[0].y));
      vertices.push(new A2D.Apg2DPoint(pts[0].x, pts[0].y));

      const factory = this.#getBasicShapesFactory();
      const node = factory.buildPolyLine(vertices, true);

      r = this.#setShapeAttributes(node, ainstruction, pts[0]);

      this.#setParent(node);

    }

    this.logEnd();
    return r;
  }


  /** Draws a rectangle from an origin and sizes */
  #drawRectangleBySizes(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawRectangleBySizes.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES, ainstruction.name);

    if (r.ok) {

      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {

        const vertices: A2D.Apg2DPoint[] = [];
        vertices.push(new A2D.Apg2DPoint(origin.x, origin.y));
        vertices.push(new A2D.Apg2DPoint(origin.x + ainstruction.w!, origin.y));
        vertices.push(new A2D.Apg2DPoint(origin.x + ainstruction.w!, origin.y + ainstruction.h!));
        vertices.push(new A2D.Apg2DPoint(origin.x, origin.y + ainstruction.h!));
        vertices.push(new A2D.Apg2DPoint(origin.x, origin.y));

        const factory = this.#getBasicShapesFactory();
        const node = factory.buildPolyLine(vertices, true)

        r = this.#setShapeAttributes(node, ainstruction, origin);

        this.#setParent(node);
      }
    }
    this.logEnd();
    return r;
  }


  /** Draws a closed polyline or any polygon from the given points */
  drawPolygon_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPolygon_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_POLYGON, ainstruction.name);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#getNPoints(ainstruction.points!, pts);
    }

    if (r.ok && pts.length < 3) {
      r = Rst.ApgRstErrors.Parametrized(
        `Not enough points [%1] for a polygon`,
        [pts.length.toString()]
      )
    }

    if (r.ok) {
      this.#checkIfPolygonIsClosed(pts);

      const factory = this.#getBasicShapesFactory()
      const node = factory.buildPolyLine(pts, true)

      r = this.#setShapeAttributes(node, ainstruction, pts[0]);

      this.#setParent(node);

    }
    this.logEnd();
    return r;
  }


  /** Draws a regular polygon from the given origin, radious and number of sides */
  drawRegularPolygon_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawRegularPolygon_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_REGULAR_POLYGON, ainstruction.name);

    if (r.ok) {
      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {

        const factory = this.#getBasicShapesFactory();
        const node = factory.buildPolygon(origin, ainstruction.radious!, ainstruction.n!, 0)

        r = this.#setShapeAttributes(node, ainstruction, origin);

        this.#setParent(node);

      }
    }
    this.logEnd();
    return r;
  }


  /** Draws a circle given center and radious  */
  drawCircle_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawCircle_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_CIRCLE, ainstruction.name);

    if (r.ok) {
      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {

        const factory = this.#getBasicShapesFactory();
        const node = factory.buildCircle(origin, ainstruction.radious!);

        r = this.#setShapeAttributes(node, ainstruction, origin);

        this.#setParent(node);
      }
    }

    this.logEnd();
    return r;
  }


  /** Draws an arc given center the radious the beggining and the end */
  drawArc_(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawArc_.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_ARC, ainstruction.name);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {

      const factory = this.#getBasicShapesFactory();

      const node = factory.buildArc(pts[0], pts[1], ainstruction.angle!)

      r = this.#setShapeAttributes(node, ainstruction, pts[0]);

      this.#setParent(node);

    }

    this.logEnd();
    return r;
  }


  /** Draws a text at the given coords */
  #drawText(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawText.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_TEXT, ainstruction.name);

    if (r.ok) {
      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {

        // TODO @5 APG ... -- this is a mess better to draw text without Annotations factory
        // implement a method in basic shapes factroy
        const factory = this._cad.getPrimitiveFactory(
          Cad.eApgCadFactories.BASIC_SHAPES
        ) as Cad.ApgCadSvgBasicShapesFactory;
        //const g = factory.build(this._cad.currentLayer, pts[0], pts[1], atext[0]);
        //const textStyle = this.#checkTextStyle(atextStyleName);
        //if (textStyle) {
        //  g?.textStyle(textStyle);
        //}
      }
    }
    this.logEnd();
    return r;
  }


  /** Draws an annotation from the given data */
  #drawAnnotation(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawAnnotation.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_ANNOTATION);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {

      const factory = this._cad.getPrimitiveFactory(
        Cad.eApgCadFactories.ANNOTATIONS
      ) as Cad.ApgCadSvgAnnotationsFactory;

      const disp = new A2D.Apg2DPoint(pts[1].x - pts[0].x, pts[1].y - pts[0].y);

      const _g = factory.build(
        this._cad.currentLayer,
        pts[0],
        disp,
        ainstruction.text!.join('\n'),
        ainstruction.angle!
      );
    }
    this.logEnd();
    return r;
  }


  /** Draws a linear dimension from the given data */
  #drawLinearDim(ainstruction: IApgCiiInstruction) {


    this.logBegin(this.#drawLinearDim.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_LIN_DIM);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {

      const factory = this._cad.getPrimitiveFactory(
        Cad.eApgCadFactories.LINEAR_DIMS
      ) as Cad.ApgCadSvgLinearDimensionsFactory;


      let dimType = Cad.eApgCadLinearDimensionTypes.ALIGNED;
      if (
        ainstruction.payload &&
        ainstruction.payload.type &&
        typeof (ainstruction.payload.type) == 'number' &&
        Uts.ApgUtsEnum.NumericContains(Cad.eApgCadLinearDimensionTypes, ainstruction.payload.type)
      ) {
        dimType = ainstruction.payload.type;
      }
      let before = "";
      let after = ""
      if (ainstruction.text) {
        before = ainstruction.text[0];
        after = ainstruction.text[1];
      }

      const node = factory
        .build(
          dimType,
          pts[0],
          pts[1],
          ainstruction.radious!,
          before,
          after
        );

      this.#setParent(node!);

    }
    this.logEnd();
    return r;
  }


  /** Draws an arc dimension from the given data */
  #drawArcDim(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.#drawArcDim.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_ARC_DIM);

    const pts: A2D.Apg2DPoint[] = [];
    if (r.ok) {
      r = this.#get2Points(ainstruction.points!, pts);
    }

    if (r.ok) {

      const factory = this._cad.getPrimitiveFactory(
        Cad.eApgCadFactories.ARC_DIMS
      ) as Cad.ApgCadSvgArcDimensionsFactory;


      let dimType = Cad.eApgCadArcDimensionTypes.OUTER_DIAMETER;
      if (
        ainstruction.payload &&
        ainstruction.payload.type &&
        typeof (ainstruction.payload.type) == 'number' &&
        Uts.ApgUtsEnum.NumericContains(Cad.eApgCadArcDimensionTypes, ainstruction.payload.type)
      ) {
        dimType = ainstruction.payload.type;
      }
      let before = "";
      let after = ""
      if (ainstruction.text) {
        before = ainstruction.text[0];
        after = ainstruction.text[1];
      }

      const node = factory
        .build(
          dimType,
          pts[0],
          pts[1],
          ainstruction.radious!,
          before,
          after
        );

      this.#setParent(node!);

    }
    this.logEnd();
    return r;
  }

  //#endregion

  // #region Path Drawing routines ---------------------------------------------

  /** Enters in path mode */
  drawPathBegin(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathBegin.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_BEGIN, ainstruction.name);

    if (r.ok) {

      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {
        this._pathMode = true;
        this._pathBuilder = new Svg.ApgSvgPathBuilder();
        this._pathOrigin = origin;
      }
    }

    this.logEnd();
    return r;
  }


  /** Moves path cursor to the given point */
  drawPathMove(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathMove.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_MOVE, "", true);

    if (r.ok) {
      const origin = this._points.get(ainstruction.origin!);
      if (!origin) {
        r = Rst.ApgRstErrors.Parametrized(
          `Point named [%1] not found: `,
          [ainstruction.origin!]
        )
      }
      else {
        this._pathBuilder.moveAbs(origin.x, origin.y);
      }

    }

    this.logEnd();
    return r;
  }


  /** Closes the current path usyally to start another */
  drawPathClose(_ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathClose.name);
    const r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_CLOSE, "", true);

    if (r.ok) {
      this._pathBuilder.close();
    }

    this.logEnd();
    return r;
  }


  /** Draws a line between the given points in Path Mode*/
  drawPathLine(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathLine.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_LINE, "", true);

    const origin = this._points.get(ainstruction.origin!);
    if (!origin) {
      r = Rst.ApgRstErrors.Parametrized(
        `Point named [%1] not found: `,
        [ainstruction.origin!]
      )
    }
    else {
      this._pathBuilder.lineAbs(origin.x, origin.y);
    }

    this.logEnd();
    return r;
  }


  /** Draws an arc between the given points in Path Mode*/
  drawPathArc(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathArc.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_ARC, "", true);

    const origin = this._points.get(ainstruction.origin!);
    if (!origin) {
      r = Rst.ApgRstErrors.Parametrized(
        `Point named [%1] not found: `,
        [ainstruction.origin!]
      )
    }
    else {

      let largeArc = false;
      let clockwise = true;
      if (ainstruction.payload) {
        largeArc = ainstruction.payload!.largeArc! as boolean | false;
        clockwise = ainstruction.payload!.clockwise! as boolean | true;
      }
      this._pathBuilder.arcAbs(
        origin.x, origin.y,
        ainstruction.radious!, ainstruction.radious!, ainstruction.angle! | 0,
        largeArc, clockwise
      );
    }

    this.logEnd();
    return r;
  }


  /** Exits from path mode */
  drawPathEnd(ainstruction: IApgCiiInstruction) {

    this.logBegin(this.drawPathEnd.name);
    let r = this.#traceInstruction(eApgCiiInstructionTypes.DRAW_PATH_END, ainstruction.name, true);

    if (r.ok) {
      this._pathMode = false;
      const path = this._pathBuilder.build();
      const node = this._cad.svg.path(path);

      r = this.#setShapeAttributes(node, ainstruction, this._pathOrigin!);

      this.#setParent(node);
    }

    this.logEnd();
    return r;
  }

  // #endregion

  /** Parses the instructions set and builds the SVG drawing */
  build() {

    this.logBegin(this.build.name);

    let r: Rst.IApgRst = { ok: true }
    for (const ainstruction of this._instructions) {
      let ri: Rst.IApgRst = { ok: true };
      switch (ainstruction.type) {
        case eApgCiiInstructionTypes.SET_NAME: {
          ri = this.setName_(ainstruction.name!); //
          break;
        }
        case eApgCiiInstructionTypes.SET_VIEWBOX: {
          ri = this.setViewBox_(ainstruction.payload!); // 
          break;
        }
        case eApgCiiInstructionTypes.SET_CARTESIAN: {
          ri = this.setCartesian_(ainstruction.payload!); // 
          break;
        }
        case eApgCiiInstructionTypes.SET_BACKGROUND: {
          ri = this.setBackground_(ainstruction.payload!); // 
          break;
        }
        case eApgCiiInstructionTypes.NEW_POINT: {
          ri = this.newPoint_(ainstruction); // 2023/01/04 
          break;
        }
        case eApgCiiInstructionTypes.NEW_POINT_DELTA: {
          ri = this.newPointByDelta_(ainstruction); // 2023/01/04
          break;
        }
        case eApgCiiInstructionTypes.NEW_STROKE_STYLE: {
          throw new Error('Not implemented ' + eApgCiiInstructionTypes.NEW_STROKE_STYLE);
          // this._cad.newStrokeStyle(
          //   ainstruction.name!,
          //   ainstruction.payload!
          // );
          // break;
        }
        case eApgCiiInstructionTypes.NEW_FILL_STYLE: {
          throw new Error('Not implemented ' + eApgCiiInstructionTypes.NEW_FILL_STYLE);
          // this._cad.newFillStyle(
          //   ainstruction.name!,
          //   ainstruction.payload!
          // );
          // break;
        }
        case eApgCiiInstructionTypes.NEW_TEXT_STYLE: {
          throw new Error('Not implemented ' + eApgCiiInstructionTypes.NEW_FILL_STYLE);
          // this._cad.newFillStyle(
          //   ainstruction.name!,
          //   ainstruction.payload!
          // );
          // break;
        }
        case eApgCiiInstructionTypes.PUSH_LAYER: {
          ri = this.pushLayer_(ainstruction.name!); // 2023/01/04
          break;
        }
        case eApgCiiInstructionTypes.POP_LAYER: {
          ri = this.popLayer_(); // 2023/01/22
          break;
        }
        case eApgCiiInstructionTypes.NEW_GROUP: {
          ri = this.newGroup_(ainstruction); // 2023/01/21
          break;
        }
        case eApgCiiInstructionTypes.SET_GROUP: {
          ri = this.setGroup_(ainstruction.name!); // 
          break;
        }
        case eApgCiiInstructionTypes.NO_GROUP: {
          this.noGroup_(); // 2023/01/21
          break;
        }

        case eApgCiiInstructionTypes.DRAW_POINTS: {
          ri = this.drawPoints_(ainstruction); // 2023/01/04
          break;
        }
        case eApgCiiInstructionTypes.DRAW_ALL_POINTS: {
          ri = this.drawAllPointsWithInfo_(ainstruction); // 2023/01/04
          break;
        }

        case eApgCiiInstructionTypes.DRAW_LINE: {
          ri = this.drawLine_(ainstruction); // 2023/01/04
          break;
        }
        case eApgCiiInstructionTypes.DRAW_CIRCLE: {
          ri = this.drawCircle_(ainstruction); // 2023/01/06
          break;
        }
        case eApgCiiInstructionTypes.DRAW_ARC: {
          ri = this.drawArc_(ainstruction); // 2023/01/06
          break;
        }
        case eApgCiiInstructionTypes.DRAW_POLYLINE: {
          ri = this.#drawPolyLine(ainstruction); // 2023/01/06
          break;
        }
        case eApgCiiInstructionTypes.DRAW_RECTANGLE_POINTS: {
          ri = this.#drawRectangleByPoints(ainstruction); // 2023/01/07
          break;
        }
        case eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES: {
          ri = this.#drawRectangleBySizes(ainstruction); // 2023/01/07 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_POLYGON: {
          ri = this.drawPolygon_(ainstruction); // 2023/01/07
          break;
        }
        case eApgCiiInstructionTypes.DRAW_REGULAR_POLYGON: {
          ri = this.drawRegularPolygon_(ainstruction); // 2023/01/15
          break;
        }

        case eApgCiiInstructionTypes.DRAW_PATH_BEGIN: {
          ri = this.drawPathBegin(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_PATH_MOVE: {
          ri = this.drawPathMove(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_PATH_LINE: {
          ri = this.drawPathLine(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_PATH_ARC: {
          ri = this.drawPathArc(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_PATH_CLOSE: {
          ri = this.drawPathClose(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_PATH_END: {
          ri = this.drawPathEnd(ainstruction); // 
          break;
        }

        case eApgCiiInstructionTypes.DRAW_TEXT: {
          ri = this.#drawText(ainstruction); // 
          break;
        }
        case eApgCiiInstructionTypes.DRAW_ANNOTATION: {
          ri = this.#drawAnnotation(ainstruction);
          break;
        }
        case eApgCiiInstructionTypes.DRAW_LIN_DIM: {
          ri = this.#drawLinearDim(ainstruction);
          break;
        }
        case eApgCiiInstructionTypes.DRAW_ARC_DIM: {
          ri = this.#drawArcDim(ainstruction);
          break;
        }

      }
      if (!ri.ok) {
        r = ri;
        break;
      }
    }

    this.logEnd(r);

  }



}
