/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_DimsAndAnnots() {
    const r: IApgCiiTest = {
        name: eApgCiiTests.DIMS_AND_ANNOTS,
        description: "Dimensions and annotatins o proper layers",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 02',
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P19',
                x: 3500,
                y: 3500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P20',
                x: 4000,
                y: 3000
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['P19', 'P20'],
                radious: 200,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['P20', 'P19'],
                radious: 200,
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.VERTICAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['P19', 'P20'],
                radious: 200,
                text: ['<[(', ')]>'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P21',
                x: 500,
                y: 4500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P22',
                x: 900,
                y: 4900
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: ['P21', 'P22'],
                radious: -200,
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P23',
                x: 5000,
                y: 100
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'P24',
                x: 5500,
                y: 800
            },
            {
                type: eApgCiiInstructionTypes.POP_LAYER,
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.ANNOTATIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ANNOTATION,
                points: ['P23', 'P24'],
                text: ['Annotation', 'Test', 'Multiline', 'Will work?'],
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