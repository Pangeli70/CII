import { A2D, Cad } from "../../../deps.ts";
import { eApgCiiInstructionTypes } from "../../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../../src/interfaces/IApgCiiInstruction.ts";


export class ApgCiiTestPanel {
    static readonly WIDTH = 55;
    static readonly TO_RAD = Math.PI / 180;


    static PanelFront(
        aname: string,
        aorigin: string,
        awidth: number,
        aheight: number,
        afillStyleName: string,
        astrokeStyleNames: string[] = [],
        aholes: A2D.Apg2DPoint[] = []
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
            w: 0,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: cursor,
        });

        r.push({
            type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
            origin: cursor,
            w: awidth / 2,
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

        if (
            aholes
            && Array.isArray(aholes)
            && aholes.length > 0
            && aholes.length % 2 == 0
        ) {
            const holesCursor = aname + '_hc';
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: holesCursor,
                origin: aorigin,
                w: 0,
                h: 0
            });

            for (let i = 0; i < aholes.length; i += 2) {

                r.push({
                    type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
                    origin: holesCursor,
                    w: aholes[i].x,
                    h: aholes[i].y
                });
                r.push({
                    type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
                    origin: holesCursor,
                });
                r.push({
                    type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
                    origin: holesCursor,
                    w: 0,
                    h: aholes[i + 1].y,
                });
                r.push({
                    type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
                    origin: holesCursor,
                });
                r.push({
                    type: eApgCiiInstructionTypes.MOVE_POINT_DELTA,
                    origin: holesCursor,
                    w: aholes[i + 1].x,
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
                    h: -aholes[i + 1].y
                });
                r.push({
                    type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
                    origin: holesCursor,
                });
                r.push({
                    type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
                });
            }
        }

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_END,
            fillStyle: afillStyleName
        });

        if (astrokeStyleNames
            && Array.isArray(astrokeStyleNames)
            && astrokeStyleNames.length == 2
        ) {
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_TS1a',
                origin: aorigin,
                w: -awidth / 2,
                h: aheight - 2
            });
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_TS1b',
                origin: aorigin,
                w: awidth / 2,
                h: aheight - 2
            });
            r.push({
                type: eApgCiiInstructionTypes.DRAW_LINE,
                points: [aname + '_TS1a', aname + '_TS1b'],
                strokeStyle: astrokeStyleNames[0]
            });
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_TR1a',
                origin: aorigin,
                w: -awidth / 2,
                h: aheight - 17
            });
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_TR1b',
                origin: aorigin,
                w: awidth / 2,
                h: aheight - 17
            });
            r.push({
                type: eApgCiiInstructionTypes.DRAW_LINE,
                points: [aname + '_TR1a', aname + '_TR1b'],
                strokeStyle: astrokeStyleNames[1]
            });
        }

        r.push({
            type: eApgCiiInstructionTypes.CLOSE_GROUP
        });


        return r;

    }


}