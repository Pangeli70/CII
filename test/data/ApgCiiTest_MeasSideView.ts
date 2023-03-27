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

export function ApgCiiTest_MeasSideView(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {

    const VIEWBOX: Cad.IApgCadSvgViewBox = {
        canvasWidth: acanvasWidth,
        canvasHeight: acanvasWidth / acanvasRatio,
        viewPortWidth: 10000,
        viewPortHeight: 5000,
        originXDisp: 2500,
        originYDisp: 500
    };

    const r: IApgCiiTest = {
        name: eApgCiiTests.TC_MEAS_ON_SITE_SV,
        description: "Measures taken on site 1",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Measures side view',
            },
            {
                type: eApgCiiInstructionTypes.SET_VIEWBOX,
                payload: VIEWBOX
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
                name: 'HF',
                x: 0,
                y: 2550
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HFE',
                origin: "HF",
                w: -250,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'HTE',
                origin: "HFE",
                w: 0,
                h: 1650
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HF', 'HFE', 'HTE'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'hF',
                origin: "HF",
                w: 0,
                h: 125
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'hF1',
                origin: "hF",
                w: 250,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'hT',
                origin: "hF1",
                w: 0,
                h: 800
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'Ceiling1',
                origin: "hT",
                w: 2800,
                h: 600
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'Ceiling2',
                origin: "Ceiling1",
                w: 0,
                h: 125
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYGON,
                points: ['HTE', 'HFE', 'HF', 'hF', 'hF1', 'hT', 'Ceiling1', 'Ceiling2'],
                fillStyle: 'pattern(Brick2)',
                // fillStyle: 'texture(Wood_Ash)',
                // fillStyle: 'gradient(LinearLeftToRightLightShadow)',
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['ZERO', 'HF'],
                radious: 500,
                text: ["HF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['hF', 'HF'],
                radious: -700,
                text: ["hF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['ZERO', 'hT'],
                radious: 500,
                text: ["HT:", ""],
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.VERTICAL
                }
            },

            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'Lintel',
                origin: 'HF',
                w: 0,
                h: 70
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'Lintel1',
                origin: 'Lintel',
                w: 1000,
                h: -600
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.ANNOTATIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_ANNOTATION,
                points: ['Lintel', 'Lintel1'],
                text: ['Lintel'],
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