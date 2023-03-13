/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */


import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { ApgCiiTesterRandomizer } from "../src/classes/ApgCiiTesterRandomizer.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_Setup(arandomizer: ApgCiiTesterRandomizer) {

    const MIN_X_1 = 4000;
    const MIN_X_2 = 1000;
    const MAX_X_1 = 5000;
    const MAX_X_2 = 10000;
    const MIN_Y_1 = 4000;
    const MIN_Y_2 = 1000;
    const MAX_Y_1 = 5000;
    const MAX_Y_2 = 10000;

    const minx = arandomizer.randomInt(MIN_X_1, MIN_X_2);
    const maxx = arandomizer.randomInt(MAX_X_1, MAX_X_2);
    const miny = arandomizer.randomInt(MIN_Y_1, MIN_Y_2);
    const maxy = arandomizer.randomInt(MAX_Y_1, MAX_Y_2);


    const vw = maxx - minx;
    const vh = maxy - miny;

    const VIEWBOX: Cad.IApgCadSvgViewBox = {
        canvasWidth: 1000,
        canvasHeight: Math.round(1000 / vw * vh),
        viewPortWidth: vw,
        viewPortHeight: vh,
        originXDisp: minx,
        originYDisp: miny
    }

    const r: IApgCiiTest = {
        name: eApgCiiTests.SETUP,
        description: "Randomized setup",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Setup tests',
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