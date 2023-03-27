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




export function ApgCiiTest_SlidingCurves(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {
    const data: {
        radious: number,
        firstAngle: number,
        secondAngle: number
    }[] = [];

    for (let i = 0; i < 4; i++) {
        const T = arandomizer.randomInt(1, 3);
        const R = arandomizer.randomInt(1, 2);
        const d = {
            radious: R == 1 ? 300 : 380,
            firstAngle: T == 1 ? 1 : T == 2 ? 6 : arandomizer.randomInt(1, 44),
            secondAngle: arandomizer.randomInt(0, 44)
        }
        data.push(d);
    }



    const MAX_X_1 = 5;
    const MAX_X_2 = 10;
    const maxx = arandomizer.randomInt(MAX_X_1, MAX_X_2);


    const r: IApgCiiTest = {
        name: eApgCiiTests.TC_SLIDING_CURVE,
        description: "Sliding systems curves",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Sliding curves',
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
                name: 'O_1',
                x: 200,
                y: 1200
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView(
                "CURVE_1", 'O_1',
                data[0].radious,
                data[0].firstAngle,
                data[0].secondAngle
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 2000,
                y: 1200
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView(
                "CURVE_2", 'O_2',
                data[1].radious,
                data[1].firstAngle,
                data[1].secondAngle
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 3400,
                y: 500
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView(
                "CURVE_3", 'O_3',
                data[2].radious,
                data[2].firstAngle,
                data[2].secondAngle
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_4',
                x: 4500,
                y: 1500
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView(
                "CURVE_4", 'O_4',
                data[3].radious,
                data[3].firstAngle,
                data[3].secondAngle
            ),
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