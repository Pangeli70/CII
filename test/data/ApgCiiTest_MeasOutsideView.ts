/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */


import { Cad, A2D } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_MeasOutsideView(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {

    const VIEWBOX: Cad.IApgCadSvgViewBox = {
        canvasWidth: acanvasWidth,
        canvasHeight: acanvasWidth / acanvasRatio,
        viewPortWidth: 8000,
        viewPortHeight: 8000 / acanvasRatio,
        originXDisp: 8000 / 2,
        originYDisp: 800
    }

    const HPV = 1700;
    const pts: A2D.Apg2DPoint[] = [];
    pts.push(new A2D.Apg2DPoint(0, 0)); // 0
    pts.push(new A2D.Apg2DPoint(-2300, 0)); // 1
    pts.push(new A2D.Apg2DPoint(0, HPV)); // 2
    const l1 = new A2D.Apg2DLine(pts[1], pts[2]);
    const K_PERSP = 25;
    const z1 = 14000;
    const z1Persp = (z1 / K_PERSP * HPV) / ((z1 / K_PERSP) + HPV);
    pts.push(new A2D.Apg2DPoint(0, z1Persp)); // 3
    pts.push(new A2D.Apg2DPoint(1, z1Persp)); // 4
    const l2 = new A2D.Apg2DLine(pts[3], pts[4]);
    const pi = l1.intersection(l2);
    pts.push(pi!) // 5


    const r: IApgCiiTest = {
        name: eApgCiiTests.TC_MEAS_ON_SITE_OV,
        description: "Measures taken on site outside view",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Measures outside view',
            },
            {
                type: eApgCiiInstructionTypes.SET_VIEWBOX,
                payload: VIEWBOX
            },
            {
                type: eApgCiiInstructionTypes.SETUP_END,
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'ZERO',
                x: 0,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'HBR',
                x: 1500,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HTR',
                origin: "HBR",
                w: 0,
                h: 2200
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HTL',
                origin: "HTR",
                w: -4000,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HBL',
                origin: "HTL",
                w: 0,
                h: -2200
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HBR', 'HTR', 'HTL', 'HBL'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HBM',
                origin: "HBL",
                w: 2000,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HTM',
                origin: "HBM",
                w: 0,
                h: 2200
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LINE,
                points: ['HBM', 'HTM'],
                strokeStyle: Cad.eApgCadDftStrokeStyles.SYMMETRY
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'PV',
                origin: "HBM",
                w: 0,
                h: 1700
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'BLIS', // Bottom left inner side
                origin: "HBM",
                w: -2300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'FRBL', // frustum bottom left
                origin: "HBM",
                w: pts[5].x,
                h: pts[5].y
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LINE,
                points: ['BLIS', 'PV'],
                strokeStyle: Cad.eApgCadDftStrokeStyles.SYMMETRY
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HBL', 'HBR'],
                radious: -600,
                text: ["LF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HBR', 'HTR'],
                radious: -500,
                text: ["HF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HBM', 'ZERO'],
                radious: -300,
                text: ["", "Sfalsamento"]
            },
            {
                type: eApgCiiInstructionTypes.POP_LAYER,
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DEBUG
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ALL_POINTS,
                radious: 10
            },

        ]
    }
    return r;
}