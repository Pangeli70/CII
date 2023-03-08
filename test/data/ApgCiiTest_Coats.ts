/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/18] 
 * -----------------------------------------------------------------------
 */

import { A2D } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { ApgCiiTestPanel } from "../src/classes/ApgCiiTestPanel.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";



export function ApgCiiTest_Coats() {

    const W = Math.random() * 2000 + 2000;
    const N = Math.round(Math.random() * 2) + 1;
    const TYPE = Math.round(Math.random() * 2);


    const noHoles: A2D.Apg2DPoint[] = [];

    const WD = (W - (520 * N)) / (N + 1);
    const inspectionWindowHoles1 = [
        new A2D.Apg2DPoint(-W / 2 + WD, (495 - 15 - 350) / 2),
        new A2D.Apg2DPoint(520, 350),
    ]

    if (N > 1) {
        inspectionWindowHoles1.push(new A2D.Apg2DPoint(WD, 0));
        inspectionWindowHoles1.push(new A2D.Apg2DPoint(520, 350))
    }
    if (N > 2) {
        inspectionWindowHoles1.push(new A2D.Apg2DPoint(WD, 0));
        inspectionWindowHoles1.push(new A2D.Apg2DPoint(520, 350));
    }

    const glassWidth = (W - 140 - 140 - (75 * 2)) / 3;
    const glassheight = 495 - 142;
    const glazedSectionHoles = [
        new A2D.Apg2DPoint(-W / 2 + 140, 71),
        new A2D.Apg2DPoint(glassWidth, glassheight),
        new A2D.Apg2DPoint(75, 0),
        new A2D.Apg2DPoint(glassWidth, glassheight),
        new A2D.Apg2DPoint(75, 0),
        new A2D.Apg2DPoint(glassWidth, glassheight),
    ]

    const holes = TYPE == 0 ? noHoles : TYPE == 1 ? inspectionWindowHoles1 : glazedSectionHoles; 

    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    const r = {
        name: eApgCiiTests.TC_COAT,
        description: "Coat made of a series of panels",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 09',
            },
            {
                type: eApgCiiInstructionTypes.GROUP_BEGIN,
                name: 'Door Coat',
                strokeStyle: 'None'
            },
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'PANEL_FILL',
                payload: {
                    color: randomColor,
                    opacity: 1
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_STROKE_STYLE,
                name: 'RIB_LIGHT',
                payload: {
                    color: '#FFFFFF',
                    width: 4,
                    opacity: 0.7
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_STROKE_STYLE,
                name: 'RIB_SHADOW',
                payload: {
                    color: '#000000',
                    width: 4,
                    opacity: 0.7
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
                x: 2000,
                y: 55
            },
            ...ApgCiiTestPanel.PanelFront(
                "PANEL_1", 'O_1', W, 495, 'PANEL_FILL', ['RIB_SHADOW','RIB_LIGHT'], holes
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 2000,
                y: 55 + 495
            },
            ...ApgCiiTestPanel.PanelFront(
                "PANEL_2", 'O_2', W, 495, 'PANEL_FILL', ['RIB_SHADOW', 'RIB_LIGHT'], holes
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 2000,
                y: 55 + 495 *2
            },
            ...ApgCiiTestPanel.PanelFront(
                "PANEL_3", 'O_3', W, 495, 'PANEL_FILL', ['RIB_SHADOW', 'RIB_LIGHT'], holes
            ),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_4',
                x: 2000,
                y: 55 + 495 * 3
            },
            ...ApgCiiTestPanel.PanelFront(
                "PANEL_4", 'O_4', W, 495, 'PANEL_FILL', ['RIB_SHADOW', 'RIB_LIGHT'], holes
            ),
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'RUBBER',
                payload: {
                    color: '#222222',
                    opacity: 1
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_FILL_STYLE,
                name: 'SALLOX',
                payload: {
                    color: '#111111',
                    opacity: 1
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_5',
                x: 2000 - W / 2,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES,
                origin: 'O_5',
                w: W,
                h: 45,
                fillStyle: 'RUBBER'
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_6',
                x: 2000 - W / 2,
                y: 45
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES,
                origin: 'O_6',
                w: W,
                h: 20,
                fillStyle: 'SALLOX'
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_7',
                x: 2000 - W / 2,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES,
                origin: 'O_7',
                w: 15,
                h: 495 * 4 + 55,
                fillStyle: 'RUBBER'
            },
            {
                type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
                origin: 'O_7',
                w: W,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES,
                origin: 'O_7',
                w: -15,
                h: 495 * 4 + 55,
                fillStyle: 'RUBBER'
            },
            {
                type: eApgCiiInstructionTypes.GROUP_END
            }
        ]
    }

    return r;
}