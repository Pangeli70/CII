/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/18] 
 * -----------------------------------------------------------------------
 */

import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { ApgCiiTestInspectionWindow } from "../src/classes/ApgCiiTestInspectionWindow.ts";
import { ApgCiiTestPanel } from "../src/classes/ApgCiiTestPanel.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";



export function ApgCiiTest_InspectionWindows() {

    const W = [525, 700, 250];
    const H = [350, 350, 250];

    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    const r = {
        name: eApgCiiTests.TC_INSP_WINDOW,
        description: "Inspection window bevels",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 10',
            },
            {
                type: eApgCiiInstructionTypes.GROUP_BEGIN,
                name: 'Bevels',
                strokeStyle: 'None'
            },
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'BEVEL_FILL',
                payload: {
                    color: randomColor,
                    opacity: 1
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'FACE_ENLIGHTED',
                payload: {
                    color: '#FFFFFF',
                    opacity: 0.5
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'FACE_DARKENED',
                payload: {
                    color: '#000000',
                    opacity: 0.5
                }
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
                x: 1000,
                y: 1000
            },
            ...ApgCiiTestInspectionWindow.BevelFront(
                "BEVEL_1", 'O_1', W[0], H[0], 'BEVEL_FILL', ['FACE_ENLIGHTED', 'FACE_DARKENED']
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 2000,
                y: 1000
            },
            ...ApgCiiTestInspectionWindow.BevelFront(
                "BEVEL_2", 'O_2', W[1], H[1], 'BEVEL_FILL', ['FACE_ENLIGHTED', 'FACE_DARKENED']
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 3000,
                y: 1000
            },
            ...ApgCiiTestInspectionWindow.BevelFront(
                "BEVEL_3", 'O_3', W[2], H[2], 'BEVEL_FILL', ['FACE_ENLIGHTED', 'FACE_DARKENED']
            ),
            {
                type: eApgCiiInstructionTypes.GROUP_END
            }
        ]
    }

    return r;
}