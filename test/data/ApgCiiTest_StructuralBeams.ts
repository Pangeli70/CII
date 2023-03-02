/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */


import { Cad } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../src/interfaces/IApgCiiInstruction.ts";
import { eApgCiiTests } from "../src/enums/eApgCiiTests.ts";
import { IApgCiiTest } from "../src/interfaces/IApgCiiTest.ts";



function StructuralBeamSectionView(
    aname: string,
    aorigin: string,
    awidth: number,
    aheight: number,
    aipeOrHea: boolean,
) {
    const bwidth = (aipeOrHea) ? aheight / 10 : awidth / 10;
    const r: IApgCiiInstruction[] = [];
    r.push({
        type: eApgCiiInstructionTypes.NEW_GROUP,
        name: aname,
    });

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BL',
        origin: aorigin,
        w: 0,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BLHea',
        origin: aname + '_BL',
        w: bwidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BLIpe',
        origin: aname + '_BL',
        w: 0,
        h: bwidth
    });


    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BR',
        origin: aname + '_BL',
        w: awidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BRHea',
        origin: aname + '_BR',
        w: -bwidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_BRIpe',
        origin: aname + '_BR',
        w: 0,
        h: bwidth
    });


    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TR',
        origin: aname + '_BR',
        w: 0,
        h: aheight
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TRHea',
        origin: aname + '_TR',
        w: -bwidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TRIpe',
        origin: aname + '_TR',
        w: 0,
        h: -bwidth
    });



    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TL',
        origin: aname + '_TR',
        w: -awidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TLHea',
        origin: aname + '_TL',
        w: bwidth,
        h: 0
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_TLIpe',
        origin: aname + '_TL',
        w: 0,
        h: -bwidth
    });

    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_MBL',
        origin: aname + '_BL',
        w: (aipeOrHea) ? (awidth - bwidth) / 2 : bwidth,
        h: (aipeOrHea) ? bwidth : (aheight - bwidth) / 2,
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_MBR',
        origin: aname + '_BL',
        w: (aipeOrHea) ? (awidth + bwidth) / 2 : awidth - bwidth,
        h: (aipeOrHea) ? bwidth : (aheight - bwidth) / 2,
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_MTL',
        origin: aname + '_TL',
        w: (aipeOrHea) ? (awidth - bwidth) / 2 : bwidth,
        h: (aipeOrHea) ? -bwidth : -(aheight - bwidth) / 2,
    });
    r.push({
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
        name: aname + '_MTR',
        origin: aname + '_TL',
        w: (aipeOrHea) ? (awidth + bwidth) / 2 : awidth - bwidth,
        h: (aipeOrHea) ? -bwidth : -(aheight - bwidth) / 2,
    });

   
    r.push({
        type: eApgCiiInstructionTypes.DRAW_POLYGON,
        points: (aipeOrHea) ?
            [aname + '_BL', aname + '_BR', aname + '_BRIpe', aname + '_MBR', aname + '_MTR', aname + '_TRIpe', aname + '_TR', aname + '_TL', aname + '_TLIpe', aname + '_MTL', aname + '_MBL',  aname + '_BLIpe'] :
            [aname + '_BL', aname + '_BLHea', aname + '_MBL', aname + '_MBR', aname + '_BRHea', aname + '_BR', aname + '_TR', aname + '_TRHea', aname + '_MTR', aname + '_MTL', aname + '_TLHea',  aname + '_TL'] 
    });

    r.push({
        type: eApgCiiInstructionTypes.CLOSE_GROUP
    });
    return r;

}


export function ApgCiiTest_StructuralBeams() {
    const r: IApgCiiTest = {
    name: eApgCiiTests.TC_STRUCT_BEAMS,
    description: "Structural beams on side view 1",
    instructions: [
        {
            type: eApgCiiInstructionTypes.SET_NAME,
            name: 'TEST 05',
        },
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'ZERO',
            x: 0,
            y: 0
        },
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'IPE1_O',
            x: 200,
            y: 1200
        },
        ...StructuralBeamSectionView('IPE_1', "IPE1_O", 250, 300, true),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'IPE2_O',
            x: 2000,
            y: 1200
        },
        ...StructuralBeamSectionView('Door2', "IPE2_O", 300, 400, true),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'HEA1_O',
            x: 3400,
            y: 500
        },
        ...StructuralBeamSectionView('HEA1', "HEA1_O", 400, 300, false),
        {
            type: eApgCiiInstructionTypes.NEW_POINT,
            name: 'HEA2_O',
            x: 4500,
            y: 1500
        },
        ...StructuralBeamSectionView('HEA2', "HEA2_O", 200, 150, false),
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
return r;
}