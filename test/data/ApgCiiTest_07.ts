/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/18] 
 * -----------------------------------------------------------------------
 */

import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { ApgCiiTestSlidingSystem } from "../src/classes/ApgCiiTestSlidingSystem.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

function getVerticalAngle(ax1: number, ax2: number, al: number) {
    const deltaX = ax2 - ax1;
    const cos = deltaX / al;
    const arcCos = Math.acos(cos);
    const r = 90 - arcCos / Math.PI * 180;
    return r;
}


export function ApgCiiTest_07() {
    const r: IApgCiiTest = {
        name: eApgCiiTests.SLIDING_SYSTEM,
        description: "Sliding systems",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 07',
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
                x: 46.5,
                y: 11
            },
            ...ApgCiiTestSlidingSystem.SlidingTrackSideView("TRACK_1", 'O_1', 1750, getVerticalAngle(46.5, 91.5, 1750)),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 91.5 + 55,
                y: 1762
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_1", 'O_2', 300, 1, 35),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 1046.5,
                y: 11
            },
            ...ApgCiiTestSlidingSystem.SlidingTrackSideView("TRACK_2", 'O_3', 1750, getVerticalAngle(46.5, 91.5, 1750)),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_4',
                x: 1091.5,
                y: 1766
            },
            ...ApgCiiTestSlidingSystem.SlidingTrackSideView("TRACK_3", 'O_4', 1750, 6, 3.5),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_5',
                x: 1330,
                y: 3505
            },
            ...ApgCiiTestSlidingSystem.SlidingCurveSideView("CURVE_2", 'O_5', 380, 6, 0),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_6',
                x: 2000,
                y: 4020
            },
            ...ApgCiiTestSlidingSystem.SlidingTrackSideView("TRACK_4", 'O_6', 500, 90),
        ]
    }
    return r;
}