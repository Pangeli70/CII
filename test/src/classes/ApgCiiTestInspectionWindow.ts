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
        abevelStyleNames: string[] = []
    ) {
        const cursor = aname + '_c';
        const r: IApgCiiInstruction[] = [];
        r.push({
            type: eApgCiiInstructionTypes.NEW_GROUP,
            name: aname,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN,
            origin: aorigin,
        });

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: cursor,
            origin: aorigin,
            w: -awidth / 2,
            h: -aheight / 2
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: cursor,
            w: awidth,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: cursor,
            w: 0,
            h: aheight
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: cursor,
            w: -awidth,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: cursor,
            w: 0,
            h: -aheight
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
        });


        const holesCursor = aname + '_hc';
        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: holesCursor,
            origin: aorigin,
            w: -awidth / 2 + this.WIDTH,
            h: -aheight / 2 + this.WIDTH
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: holesCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: holesCursor,
            w: 0,
            h: aheight - (2 * this.WIDTH),
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: holesCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: holesCursor,
            w: awidth - (2 * this.WIDTH),
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: holesCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: holesCursor,
            w: 0,
            h: -aheight + (2 * this.WIDTH)
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: holesCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_END,
            fillStyle: afillStyleName
        });


        if (
            abevelStyleNames
            && Array.isArray(abevelStyleNames)
            && abevelStyleNames.length == 2
        ) {
            const bevelCursor1 = aname + '_bc1';

            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: bevelCursor1,
                origin: aorigin,
                w: -awidth / 2,
                h: +aheight / 2
            });
            ApgCiiTestInspectionWindow.TopLeftBevel(r, aorigin, bevelCursor1, awidth, aheight, abevelStyleNames[0]);

            const bevelCursor2 = aname + '_bc2';
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: bevelCursor2,
                origin: aorigin,
                w: -awidth / 2 + this.WIDTH / 3 * 2,
                h: +aheight / 2 - this.WIDTH / 3 * 2
            });
            ApgCiiTestInspectionWindow.TopLeftBevel(r, aorigin, bevelCursor2, awidth - this.WIDTH / 3 * 2 * 2, aheight - this.WIDTH / 3 * 2 * 2, abevelStyleNames[1]);

        }


        r.push({
            type: eApgCiiInstructionTypes.CLOSE_GROUP
        });


        return r;

    }



    private static TopLeftBevel(r: IApgCiiInstruction[], aorigin: string, bevelCursor: string, awidth: number, aheight: number, abevelStyleName: string) {
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN,
            origin: aorigin,
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: bevelCursor,
            w: awidth,
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: bevelCursor,
            w: 0,
            h: -aheight
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: bevelCursor,
            w: -this.WIDTH / 3,
            h: +this.WIDTH / 3
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: bevelCursor,
            w: 0,
            h: aheight - (this.WIDTH / 3) * 2
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: bevelCursor,
            w: -awidth + (this.WIDTH / 3) * 2,
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: bevelCursor,
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
        });
        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_END,
            fillStyle: abevelStyleName
        });
    }
}