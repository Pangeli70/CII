/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";

export function ApgCiiTest_Setup(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth = 1000,
    acanvasRatio = 16 / 9
) {

    const VIEWBOX: Cad.IApgCadSvgViewBox = getRandomizedViewBox(arandomizer, acanvasWidth, acanvasRatio);
    const resume = JSON.stringify(VIEWBOX, undefined, "  ").split("\n");

    const CARTESIANS: Cad.IApgCadSvgCartesians = {
        mode: Cad.eApgCadCartesianMode.NORMAL,
        axisStroke: {
            color: 'green',
            width: 3
        },
        drawTicks: true,
        ticksStep: 100,
        ticksSize: 25,
        bigTicksEvery: 1000,
        bigTicksSize: 50,
        tickStroke: {
            color: 'blue',
            width: 20
        },
        drawBigTicksLables: true,
        drawBigTicks: true,
        labelsTextStyleName: 'mono'

    }

    const GRID: Cad.IApgCadSvgGrid = {
        mode: Cad.eApgCadGridMode.DOTS,
        gridStep: 100,
        gridStroke: {
            color: "red",
            width: 2,
            dashPattern: [10, 90],
            dashOffset: 5
        },
        drawMajors: false,
        majorEvery: 500,
        majorGridStroke: {
            color: 'orange',
            width: 5,
            dashPattern: [10, 90],
            dashOffset: 5
        },
    }

    const BACKGROUND: Cad.IApgCadSvgGround = {
        draw: true,
        strokeWidth: 20,
        strokeColor: 'cyan',
        fillColor: '#250060'
    }


    const r: IApgCiiTest = {
        name: eApgCiiTests.SETUP,
        description: "Randomized setup",
        instructions: [
            {
                type: eApgCiiInstructionTypes.SETUP_BEGIN,
            },
            {
                type: eApgCiiInstructionTypes.SET_NAME,
                name: 'Setup tests',
            },
            {
                type: eApgCiiInstructionTypes.SET_VIEWBOX,
                payload: VIEWBOX
            },
            {
                type: eApgCiiInstructionTypes.SET_CARTESIANS,
                payload: CARTESIANS
            },
            {
                type: eApgCiiInstructionTypes.SET_GRID,
                payload: GRID
            },
            {
                type: eApgCiiInstructionTypes.SET_BACKGROUND,
                payload: BACKGROUND
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
                name: 'HWR',
                x: 2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RS1',
                origin: "HWR",
                w: 300,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'RS2',
                origin: "RS1",
                w: 0,
                h: -1000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HWR', 'RS1', 'RS2'],
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT,
                name: 'HWL',
                x: -2000,
                y: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LS1',
                origin: "HWL",
                w: -400,
                h: 0
            },
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'LS2',
                origin: "LS1",
                w: 0,
                h: -1000
            },
            {
                type: eApgCiiInstructionTypes.DRAW_POLYLINE,
                points: ['HWL', 'LS1', 'LS2'],
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
                points: ['HWL', 'LS1'],
                radious: -700,
                text: ["SSx:", ""]
            },
            {
                type: eApgCiiInstructionTypes.DRAW_LIN_DIM,
                points: ['HWR', 'RS1'],
                radious: -700,
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
            {
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: 'resume',
                origin: "ZERO",
                w: VIEWBOX.viewPortWidth / 2 - VIEWBOX.originXDisp,
                h: VIEWBOX.viewPortHeight / 2 - VIEWBOX.originYDisp
            },
            {
                type: eApgCiiInstructionTypes.DRAW_TEXT,
                origin: 'resume',
                text: resume
            },

        ]
    }
    return r;
}

function getRandomizedViewBox(
    arandomizer: Cad.Test.ApgCadTestRandomizer,
    acanvasWidth: number,
    acanvasRatio: number
) {
    const MIN_X_1 = 1;
    const MIN_X_2 = 4;
    const minx = arandomizer.randomInt(MIN_X_1, MIN_X_2);

    const MAX_X_1 = 5;
    const MAX_X_2 = 10;
    const maxx = arandomizer.randomInt(MAX_X_1, MAX_X_2);

    const MIN_Y_1 = 1;
    const MIN_Y_2 = 4;
    const miny = arandomizer.randomInt(MIN_Y_1, MIN_Y_2);

    const MAX_Y_1 = 5;
    const MAX_Y_2 = 10;
    const maxy = arandomizer.randomInt(MAX_Y_1, MAX_Y_2);

    let vw = (maxx - minx);
    let vh = (maxy - miny);

    let xd = arandomizer.randomInt(vw / 10, vw / 2);
    let yd = arandomizer.randomInt(vh / 10, vh / 2);

    const cw = acanvasWidth;
    const ch = Math.round(cw / acanvasRatio);
    vw *= 1000;
    vh *= 1000;
    xd *= 1000;
    yd *= 1000;

    const r: Cad.IApgCadSvgViewBox = {
        canvasWidth: cw,
        canvasHeight: ch,
        viewPortWidth: vw,
        viewPortHeight: vh,
        originXDisp: xd,
        originYDisp: yd
    };
    return r;
}
