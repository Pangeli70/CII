/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */


import { Cad, A2D } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_MeasTopView(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {

    const VIEWBOX: Cad.IApgCadSvgViewBox = {
        canvasWidth: acanvasWidth,
        canvasHeight: acanvasWidth / acanvasRatio,
        viewPortWidth: 6000,
        viewPortHeight: 6000 / acanvasRatio,
        originXDisp: 3000,
        originYDisp: 2500
    }



    const r: IApgCiiTest = {
        name: eApgCiiTests.TC_MEAS_ON_SITE_TV,
        description: "Measures taken on site top view",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Measures top view',
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
                name: 'HWR', // Hole Width Right
                x: 2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RSIS1', // Right Side internal space
                origin: "HWR",
                w: 300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RSIS2',
                origin: "RSIS1",
                w: 300,
                h: -2000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RSIS3',
                origin: "RSIS2",
                w: 300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RSES1',
                origin: "HWR",
                w: 0,
                h: 250
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RSES2',
                origin: "RSES1",
                w: 600,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYGON,
                points: ['RSES2', 'RSES1', 'HWR', 'RSIS1', 'RSIS2', 'RSIS3'],
                fillStyle: 'pattern(Saltire1)'
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'HWL', // Hole Width Left
                x: -2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LSIS1', // Left side internal space 
                origin: "HWL",
                w: -400,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LSIS2',
                origin: "LSIS1",
                w: 0,
                h: -2000
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LSIS3',
                origin: "LSIS2",
                w: -300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LSES1', // Left side external space 
                origin: "HWL",
                w: 0,
                h: 250
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LSES2',
                origin: "LSES1",
                w: -700,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYGON,
                points: ['LSES2', 'LSES1', 'HWL', 'LSIS1', 'LSIS2', 'LSIS3'],
                fillStyle: 'pattern(Saltire1)'
            },
            {
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DIMENSIONS
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWL', 'HWR'],
                radious: 500,
                text: ["LF:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWL', 'LSIS1'],
                radious: 500,
                text: ["SSx:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['ZERO', 'RSIS2'],
                radious: 100,
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['ZERO', 'RSIS2'],
                radious: 100,
                payload: {
                    type: Cad.eApgCadLinearDimensionTypes.HORIZONTAL
                }
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWR', 'RSIS1'],
                radious: -500,
                text: ["SDx:", ""]
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