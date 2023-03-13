/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */


import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_MeasOutsideView() {

    const VIEWBOX: Cad.IApgCadSvgViewBox = {
        canvasWidth: 500,
        canvasHeight: 500,
        viewPortWidth: 3000,
        viewPortHeight: 3000,
        originXDisp: 100,
        originYDisp: -10
    }

    const r: IApgCiiTest = {
        name: eApgCiiTests.TC_MEAS_ON_SITE_TV,
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
                name: 'HWR',
                x: 2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RS1',
                origin: "HWR",
                w: 300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RS2',
                origin: "RS1",
                w: 0,
                h: -1000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HWR', 'RS1', 'RS2'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'HWL',
                x: -2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LS1',
                origin: "HWL",
                w: -400,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LS2',
                origin: "LS1",
                w: 0,
                h: -1000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HWL', 'LS1', 'LS2'],
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWL', 'HWR'],
                radious: 500,
                text: ["LF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWL', 'LS1'],
                radious: -700,
                text: ["SSx:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWR', 'RS1'],
                radious: -700,
                text: ["SDx:", ""]
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