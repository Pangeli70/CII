import { A2D, Cad } from "../../../deps.ts";
import { eApgCiiInstructionTypes } from "../../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../../src/interfaces/IApgCiiInstruction.ts";


export class ApgCiiTestInspectionWindow {
    static readonly WIDTH = 50;
    static readonly TO_RAD = Math.PI / 180;


    static BevelFront(
        aname: string,
        aorigin: string,
        awidth: number,
        aheight: number,
        afillStyleName: string,
        abevelFillStyleNames: string[] = []
    ) {
        const cursor = aname + '_c';
        const r: IApgCiiInstruction[] = [];
        r.push({
            type: eApgCiiInstructionTypes.GROUP_BEGIN,
            name: aname,
        });

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: cursor,
            origin: aorigin,
            w: -awidth / 2,
            h: -aheight / 2
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_BEGIN
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_MOVE,
            origin: cursor,
            w: 0,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: awidth,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: 0,
            h: aheight
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: -awidth,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: 0,
            h: -aheight
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_CURSOR,
            origin: cursor,
            pivot: aorigin,
            w: -awidth / 2 + this.WIDTH,
            h: -aheight / 2 + this.WIDTH
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_MOVE,
            origin: cursor,
            w: 0,
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: 0,
            h: aheight - (2 * this.WIDTH),
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: awidth - (2 * this.WIDTH),
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: 0,
            h: -aheight + (2 * this.WIDTH)
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_END,
            fillStyle: afillStyleName
        });


        if (
            abevelFillStyleNames
            && Array.isArray(abevelFillStyleNames)
            && abevelFillStyleNames.length == 2
        ) {

            const bevelSize = this.WIDTH / 3;

            const bevelName1 = aname + '_bc1';
            r.push(...ApgCiiTestInspectionWindow.TopRightBevel(
                bevelName1,
                aorigin,
                awidth,
                aheight,
                bevelSize,
                abevelFillStyleNames[0]
            ));

            const bevelName2 = aname + '_bc2';
            r.push(...ApgCiiTestInspectionWindow.TopRightBevel(
                bevelName2,
                aorigin,
                awidth - (bevelSize * 2 * 2),
                aheight - (bevelSize * 2 * 2),
                bevelSize,
                abevelFillStyleNames[1]
            ));

            const bevelName3 = aname + '_bc3';
            r.push(...ApgCiiTestInspectionWindow.TopRightBevel(
                bevelName3,
                aorigin,
                awidth,
                aheight,
                bevelSize,
                abevelFillStyleNames[1],
                180
            ));

            const bevelName4 = aname + '_bc4';
            r.push(...ApgCiiTestInspectionWindow.TopRightBevel(
                bevelName4,
                aorigin,
                awidth - (bevelSize * 2 * 2),
                aheight - (bevelSize * 2 * 2),
                bevelSize,
                abevelFillStyleNames[0],
                180
            ));

        }


        r.push({
            type: eApgCiiInstructionTypes.GROUP_END
        });


        return r;

    }



    private static TopRightBevel(
        apathCursor: string,
        aorigin: string,
        awidth: number,
        aheight: number,
        asize: number,
        afillStyleName: string,
        arotation = 0
    ) {

        const r: IApgCiiInstruction[] = [];
        const halfW = awidth / 2;
        const halfH = aheight / 2;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: apathCursor,
            origin: aorigin,
            w: halfW,
            h: halfH
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_BEGIN,
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_MOVE,
            origin: apathCursor,
            w: 0,
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: apathCursor,
            w: 0,
            h: -aheight
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: apathCursor,
            w: -asize,
            h: asize
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: apathCursor,
            w: 0,
            h: aheight - (asize * 2)
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: apathCursor,
            w: -awidth + (asize * 2),
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: apathCursor,
            w: -asize,
            h: asize
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_CLOSE,
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_END,
            fillStyle: afillStyleName,
            pivot: aorigin,
            angle: arotation
        });

        return r;
    }


}