/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/15] Deno Deploy beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_DrawingPrimitives() {
    const r: IApgCiiTest = {
        name: eApgCiiTests.PRIMITIVES,
        description: "Basic shapes on the default layer: Zero ",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Drawing primitives',
            },
            {
                type: eApgCiiInstructionTypes.SETUP_END,
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P1',
                x: 100,
                y: 100
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P2',
                x: 900,
                y: 900
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LINE,
                points: ['P1', 'P2']
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'P3',
                origin: 'P2',
                w: 500,
                h: 100,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POINTS,
                points: ['P3'],
                radious: 10
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P4',
                x: 2500,
                y: 2500
            },
            {
                type: eApgCiiInstructionTypes.DRAW_CIRCLE,
                origin: 'P4',
                radious: 500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P5',
                x: 500,
                y: 3000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P6',
                x: 1000,
                y: 3100
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P7',
                x: 1500,
                y: 3250
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P8',
                x: 1750,
                y: 3500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P9',
                x: 1850,
                y: 3650
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['P5', 'P6', 'P7', 'P8', 'P9',],
            },
            {

                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P10',
                x: 2000,
                y: 300
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P11',
                x: 3000,
                y: 300
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P12',
                x: 2600,
                y: 500
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYGON,
                points: ['P10', 'P11', 'P12'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P13',
                x: 3500,
                y: 1500
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES,
                origin: 'P13',
                w: 300,
                h: 1000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P14',
                x: 3600,
                y: 500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P15',
                x: 4600,
                y: 250
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_POINTS,
                points: ['P14', 'P15'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P16',
                x: 1000,
                y: 2000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_REGULAR_POLYGON,
                origin: "P16",
                radious: 400,
                n: 12
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P17',
                x: 2500,
                y: 1500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P18',
                x: 2200,
                y: 1500
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC,
                points: ['P17', 'P18'],
                angle: -80
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC,
                points: ['P18', 'P17'],
                angle: 80
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