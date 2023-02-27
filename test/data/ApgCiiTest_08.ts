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



export function ApgCiiTest_08() {

    const W = Math.random() * 2000 + 2000;


    const WD = (W - (520 * 3)) / 4;
    const holes1 = [
        new A2D.Apg2DPoint(-W / 2 + WD, (495 - 15 - 350) / 2),
        new A2D.Apg2DPoint(520, 350),
        new A2D.Apg2DPoint(WD, 0),
        new A2D.Apg2DPoint(520, 350),
        new A2D.Apg2DPoint(WD, 0),
        new A2D.Apg2DPoint(520, 350),
    ]

    const glassWidth = (W - 140 - 140 - (75 * 2)) / 3;
    const glassheight = 495 - 142;
    const holes2 = [
        new A2D.Apg2DPoint(-W / 2 + 140, 71),
        new A2D.Apg2DPoint(glassWidth, glassheight),
        new A2D.Apg2DPoint(75, 0),
        new A2D.Apg2DPoint(glassWidth, glassheight),
        new A2D.Apg2DPoint(75, 0),
        new A2D.Apg2DPoint(glassWidth, glassheight),
    ]

    const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

    const r = {
        name: eApgCiiTests.HOLE_PANEL,
        description: "Panels",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 08',
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
                    color: '#FFFF66',
                    width: 4,
                    opacity: 0.5
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_STROKE_STYLE,
                name: 'RIB_SHADOW',
                payload: {
                    color: '#000066',
                    width: 4,
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
                x: 2000,
                y: 45
            },
            ...ApgCiiTestPanel.PanelFront("PANEL_1", 'O_1', W, 495, 'PANEL_FILL'),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_2',
                x: 2000,
                y: 45 + 495
            },
            ...ApgCiiTestPanel.PanelFront("PANEL_2", 'O_2', W, 495, 'PANEL_FILL', holes1),
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'O_3',
                x: 2000,
                y: 45 + 495 + 495
            },
            ...ApgCiiTestPanel.PanelFront("PANEL_3", 'O_3', W, 495, 'PANEL_FILL', holes2),
        ]
    }

    return r;
}