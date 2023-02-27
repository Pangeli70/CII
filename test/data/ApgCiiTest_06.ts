/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/18] 
 * -----------------------------------------------------------------------
 */

import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { ApgCiiTestSlidingSystem } from "../src/classes/ApgCiiTestSlidingSystem.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";




export function ApgCiiTest_06() {
    const r: IApgCiiTest = {
        name: eApgCiiTests.SLIDING_CURVE,
        description: "Sliding systems curves",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 06',
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'ZERO',
                x: 0,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_1',
                x: 200,
                y: 1200
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_1", 'O_1', 300, 1, 35),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 2000,
                y: 1200
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_2", 'O_2', 380, 6, 55),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 3400,
                y: 500
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_3", 'O_3', 300, 1, 0),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_4',
                x: 4500,
                y: 1500
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_4", 'O_4', 380, 6, 15),
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DEBUG
            },
            // {
            //     type: eApgCadInstructionTypes.DRAW_ALL_POINTS,
            //     radious: 10
            // },

        ]
    }
    return r;
}