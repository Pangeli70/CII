/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/18] 
 * -----------------------------------------------------------------------
 */

import { A2D, Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../src/interfaces/IApgCiiInstruction.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";


function SlidingCurveSideView(
    aname: string,
    aorigin: string,
    aradious: number,
    afirstAngle: number,
    asecondAngle: number,
) {
    const width = 55;
    const firstSegment = 122;
    const totalLenght = 1000;
    const points: A2D.Apg2DPoint[] = [];
    const toRad = Math.PI / 180;


    const r: IApgCiiInstruction[] = [];
    r.push({
        type: eApgCiiInstructionTypes.NEW_GROUP,
        name: aname,
    });

    let angle = 90 - afirstAngle;
    let dx = Math.cos(angle * toRad) * firstSegment;
    let dy = Math.sin(angle * toRad) * firstSegment;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_1',
        origin: aorigin,
        w: dx,
        h: dy
    });

    angle = 360 - afirstAngle;
    dx = Math.cos(angle * toRad) * aradious;
    dy = Math.sin(angle * toRad) * aradious;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_Center',
        origin: aname + '_1',
        w: dx,
        h: dy
    });

    angle = 90 + asecondAngle;
    dx = Math.cos(angle * toRad) * aradious;
    dy = Math.sin(angle * toRad) * aradious;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_2',
        origin: aname + '_Center',
        w: dx,
        h: dy
    });

    const arcSlice = ((180 - afirstAngle) - (90 + asecondAngle)) / 360;
    const arcPrimitiveRadious = aradious + width / 2;
    const arcPrimitiveLength = (2 * Math.PI * arcPrimitiveRadious) * arcSlice;
    const secondSegment = totalLenght - firstSegment - arcPrimitiveLength;

    angle = asecondAngle;
    dx = Math.cos(angle * toRad) * secondSegment;
    dy = Math.sin(angle * toRad) * secondSegment;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_3',
        origin: aname + '_2',
        w: dx,
        h: dy
    });

    angle = asecondAngle + 90;
    dx = Math.cos(angle * toRad) * width;
    dy = Math.sin(angle * toRad) * width;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_4',
        origin: aname + '_3',
        w: dx,
        h: dy
    });

    angle = asecondAngle + 180;
    dx = Math.cos(angle * toRad) * secondSegment;
    dy = Math.sin(angle * toRad) * secondSegment;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_5',
        origin: aname + '_4',
        w: dx,
        h: dy
    });

    angle = 180 - afirstAngle;
    dx = Math.cos(angle * toRad) * (width);
    dy = Math.sin(angle * toRad) * (width);

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_6',
        origin: aname + '_1',
        w: dx,
        h: dy
    });

    angle = 270 - afirstAngle;
    dx = Math.cos(angle * toRad) * firstSegment;
    dy = Math.sin(angle * toRad) * firstSegment;

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_7',
        origin: aname + '_6',
        w: dx,
        h: dy
    });


    r.push({
        type: eApgCiiInstructionTypes.DRAW_POLYGON,
        points: [aorigin, aname + '_1', aname + '_Center', aname + '_2', aname + '_3', aname + '_4', aname + '_5', aname + '_6', aname + '_7']

    });

    r.push({
        type: eApgCiiInstructionTypes.NO_GROUP
    });
    return r;

}


export const ApgCiiTest_06: IApgCiiTest = {
    name: eApgCiiTests.SLIDING_CURVE,
    description: "Sliding systems curves",
    instructions: [
        {
            type: eApgCiiInstructionTypes.SET_NAME,
            name: 'TEST 06',
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
            x: 200,
            y: 1200
        },
        ...SlidingCurveSideView("CURVE_1", 'O_1', 300, 1, 35),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'O_2',
            x: 2000,
            y: 1200
        },
        ...SlidingCurveSideView("CURVE_2", 'O_2', 380, 6,55),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'O_3',
            x: 3400,
            y: 500
        },
        ...SlidingCurveSideView("CURVE_3", 'O_3', 300, 1, 0),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'O_4',
            x: 4500,
            y: 1500
        },
        ...SlidingCurveSideView("CURVE_4", 'O_4', 380, 6, 15),
        {
            type: eApgCiiInstructionTypes.PUSH_LAYER,
            name: Cad.eApgCadDftLayers.DEBUG
        },
        // {
        //     type: eApgCadInstructionTypes.DRAW_ALL_POINTS,
        //     radious: 10
        // },

    ]
}