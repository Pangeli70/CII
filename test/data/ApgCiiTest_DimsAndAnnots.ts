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

enum ePoints {
    P_LinearDim_1 = "P1",
    P_LinearDim_2 = "P2",
    P_ArcDim_1 = "P3",
    P_ArcDim_2 = "P4",
    P_Annot_1 = "P5",
    P_Annot_2 = "P6"
}


export function ApgCiiTest_DimsAndAnnots() {
    const r: IApgCiiTest = {
        name: eApgCiiTests.DIMS_AND_ANNOTS,
        description: "Dimensions and annotations on proper layers",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'TEST 02',
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_LinearDim_1,
                x: 500,
                y: 3500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_LinearDim_2,
                x: 1200,
                y: 3300
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_1, ePoints.P_LinearDim_2],
                text: ['-', ' '],
                radious: 200,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_2, ePoints.P_LinearDim_1],
                radious: 200,
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.VERTICAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_1, ePoints.P_LinearDim_2],
                radious: 200,
                text: [' ', '-'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_1,
                x: 1000,
                y: 2000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_2,
                x: 1200,
                y: 1800
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: -200,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: -200,
            },
            {
                type: eApgCiiInstructionTypes.POP_LAYER,
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_Annot_1,
                x: 1000,
                y: 100
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_Annot_2,
                x: 1500,
                y: 500
            },

            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.ANNOTATIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ANNOTATION,
                points: [ePoints.P_Annot_1, ePoints.P_Annot_2],
                text: ['Annotation', 'Test', 'Multiline', 'Will work?'],
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