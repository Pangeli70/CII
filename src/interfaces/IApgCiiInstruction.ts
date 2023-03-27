/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.1 [APG 2019/01/16]
 * @version 0.8.0 [APG 2022/04/03] Porting to Deno
 * @version 0.9.2 [APG 2022/11/30] Github beta
 * @version 0.9.3 [APG 2022/12/18] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { eApgCiiInstructionTypes } from '../enums/eApgCiiInstructionTypes.ts';


export interface IApgCiiInstruction {
  type: eApgCiiInstructionTypes;
  /** name of the instruction or of the item that will be created */
  name?: string;
  /** horizontal coordinate */
  x?: number;
  /** vertical coordinate */
  y?: number;
  /** width */
  w?: number;
  /** height */
  h?: number;
  /** number of items */
  n?: number;
  /** name of the point used for circles and arcs */
  origin?: string;
  /** for circles and arcs */
  radious?: number;
  /** name of the point used for rotations */
  pivot?: string;
  /** for rotations */
  angle?: number;
  /** names of the points used for lines, polylines, polygons etc */
  points?: string[];
  /** for labels, annotations etc */
  text?: string[];
  /** stroke style name, must be already defined */
  strokeStyle?: string;
  /** fills style name, must be already defined */
  fillStyle?: string;
  /** text style name, must be already defined*/
  textStyle?: string;
  /** other content specific of the instruction, must be validated elsewhere */
  // deno-lint-ignore no-explicit-any
  payload?: any;
}
