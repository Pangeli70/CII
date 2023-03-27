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
    P_LinearDim_3 = "P3",
    P_LinearDim_4 = "P4",
    P_ArcDim_1 = "PAD1",
    P_ArcDim_2 = "PAD2",
    P_ArcDim_3 = "PAD3",
    P_ArcDim_4 = "PAD4",
    P_Annot_1 = "PA1",
    P_Annot_2 = "PA2"
}


export function ApgCiiTest_DimsAndAnnots(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {
    const r: IApgCiiTest = {
        name: eApgCiiTests.DIMS_AND_ANNOTS,
        description: "Dimensions and annotations on proper layers",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Dimensions & annotations',
            },
            {
                type: eApgCiiInstructionTypes.SETUP_END,
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
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
                x: 1800,
                y: 3000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_1, ePoints.P_LinearDim_2],
                text: ['', 'Algn'],
                radious: 200,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_2, ePoints.P_LinearDim_1],
                radious: 200,
                text: [' ', 'Vert'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.VERTICAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_1, ePoints.P_LinearDim_2],
                radious: 200,
                text: [' ', 'Horz'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_LinearDim_3,
                x: 500,
                y: 1500
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_LinearDim_4,
                x: 1800,
                y: 1000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_4, ePoints.P_LinearDim_3],
                text: ['', 'Algn'],
                radious: 200,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_4, ePoints.P_LinearDim_3],
                radious: 200,
                text: [' ', 'Vert'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.VERTICAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: [ePoints.P_LinearDim_4, ePoints.P_LinearDim_3],
                radious: 200,
                text: [' ', 'Horz'],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_1,
                x: 4000,
                y: 2000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_2,
                x: 4600,
                y: 1400
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: -200,
                text: [' ', 'Horz'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: -200,
                text: [' ', 'Vert'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.VERTICAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: -200,
                text: [' ', 'OutD'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.OUTER_DIAMETER
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_1, ePoints.P_ArcDim_2],
                radious: 1000,
                text: [' ', 'InD'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.INNER_DIAMETER
                }
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_3,
                x: 6000,
                y: 2000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: ePoints.P_ArcDim_4,
                x: 6600,
                y: 1400
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_3, ePoints.P_ArcDim_4],
                radious: 200,
                text: [' ', 'OutR'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.OUTER_RADIOUS
                }
            },

            {
                type: eApgCiiInstructionTypes.DRAW_ARC_DIM,
                points: [ePoints.P_ArcDim_3, ePoints.P_ArcDim_4],
                radious: 200,
                text: [' ', 'InR'],
                payload: {
                    type: Cad.eApgCadArcDimensionTypes.INNER_RADIOUS
                }
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
                name: Cad.eApgCadDftLayers.ZERO
            },
            {
                type: eApgCiiInstructionTypes.DRAW_CIRCLE,
                origin: ePoints.P_ArcDim_1,
                radious: 848.5
            },
            {
                type: eApgCiiInstructionTypes.DRAW_CIRCLE,
                origin: ePoints.P_ArcDim_3,
                radious: 848.5
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