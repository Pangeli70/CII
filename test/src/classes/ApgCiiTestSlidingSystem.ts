import { A2D, Cad } from "../../../deps.ts";
import { eApgCiiInstructionTypes } from "../../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../../src/interfaces/IApgCiiInstruction.ts";


export class ApgCiiTestSlidingSystem {
    static readonly WIDTH = 55;
    static readonly TO_RAD = Math.PI / 180;


    static SlidingCurveSideView(
        aname: string,
        aorigin: string,
        aradious: number,
        afirstAngle: number,
        asecondAngle: number,
    ) {
        const firstSegment = 122;
        const totalLenght = 1000;

        const r: IApgCiiInstruction[] = [];
        r.push({
            type: eApgCiiInstructionTypes.NEW_GROUP,
            name: aname,
        });

        let angle = 90 - afirstAngle;
        let dx = Math.cos(angle * this.TO_RAD) * firstSegment;
        let dy = Math.sin(angle * this.TO_RAD) * firstSegment;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_1',
            origin: aorigin,
            w: dx,
            h: dy
        });

        angle = 360 - afirstAngle;
        dx = Math.cos(angle * this.TO_RAD) * aradious;
        dy = Math.sin(angle * this.TO_RAD) * aradious;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_Center',
            origin: aname + '_1',
            w: dx,
            h: dy
        });

        angle = 90 + asecondAngle;
        dx = Math.cos(angle * this.TO_RAD) * aradious;
        dy = Math.sin(angle * this.TO_RAD) * aradious;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_2',
            origin: aname + '_Center',
            w: dx,
            h: dy
        });

        const arcAngle = ((180 - afirstAngle) - (90 + asecondAngle));
        const arcSlice = arcAngle / 360;
        const arcPrimitiveRadious = aradious + this.WIDTH / 2;
        const arcPrimitiveLength = (2 * Math.PI * arcPrimitiveRadious) * arcSlice;
        const secondSegment = totalLenght - firstSegment - arcPrimitiveLength;

        angle = asecondAngle;
        dx = Math.cos(angle * this.TO_RAD) * secondSegment;
        dy = Math.sin(angle * this.TO_RAD) * secondSegment;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_3',
            origin: aname + '_2',
            w: dx,
            h: dy
        });

        angle = asecondAngle + 90;
        dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
        dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_4',
            origin: aname + '_3',
            w: dx,
            h: dy
        });

        angle = asecondAngle + 180;
        dx = Math.cos(angle * this.TO_RAD) * secondSegment;
        dy = Math.sin(angle * this.TO_RAD) * secondSegment;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_5',
            origin: aname + '_4',
            w: dx,
            h: dy
        });

        angle = 180 - afirstAngle;
        dx = Math.cos(angle * this.TO_RAD) * (this.WIDTH);
        dy = Math.sin(angle * this.TO_RAD) * (this.WIDTH);

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_6',
            origin: aname + '_1',
            w: dx,
            h: dy
        });

        angle = 270 - afirstAngle;
        dx = Math.cos(angle * this.TO_RAD) * firstSegment;
        dy = Math.sin(angle * this.TO_RAD) * firstSegment;

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_7',
            origin: aname + '_6',
            w: dx,
            h: dy
        });


        // r.push({
        //     type: eApgCiiInstructionTypes.DRAW_POLYGON,
        //     points: [aorigin, aname + '_1', aname + '_Center', aname + '_2', aname + '_3', aname + '_4', aname + '_5', aname + '_6', aname + '_7']

        // });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN,
            origin: aorigin,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: aorigin,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_1',
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_ARC,
            origin: aname + '_2',
            radious: aradious,
            angle: arcAngle,
            payload: {
                largeArc: false,
                clockwise: true
            }
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_3',
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_4',
        });



        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_5',
        });


        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_ARC,
            origin: aname + '_6',
            angle: arcAngle,
            radious: aradious + this.WIDTH,
            payload: {
                largeArc: false,
                clockwise: false
            }
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_7',
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_END
        });

        r.push({
            type: eApgCiiInstructionTypes.CLOSE_GROUP
        });
        return r;

    }

    static SlidingTrackSideView(
        aname: string,
        aorigin: string,
        alenght: number,
        aangle: number,
        atrimLenght = 0
    ) {
        let cx = 0, cy = 0;
        const bottomLeftP = new A2D.Apg2DPoint(cx, cy);

        const r: IApgCiiInstruction[] = [];
        r.push({
            type: eApgCiiInstructionTypes.NEW_GROUP,
            name: aname,
        });
        

        let angle = 90 - aangle;
        let dx = Math.cos(angle * this.TO_RAD) * alenght;
        let dy = Math.sin(angle * this.TO_RAD) * alenght;
        cx += dx;
        cy += dy;
        const _topLeftP = new A2D.Apg2DPoint(cx, cy);


        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_1',
            origin: aorigin,
            w: dx,
            h: dy
        });

        angle = 360 - aangle;
        dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
        dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;
        cx += dx;
        cy += dy;
        const topRightP = new A2D.Apg2DPoint(cx, cy);

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_2',
            origin: aname + '_1',
            w: dx,
            h: dy
        });

        angle = 270 - aangle;
        dx = Math.cos(angle * this.TO_RAD) * (alenght - atrimLenght);
        dy = Math.sin(angle * this.TO_RAD) * (alenght - atrimLenght);
        cx += dx;
        cy += dy;
        const bottomRightTrimmedP = new A2D.Apg2DPoint(cx, cy);

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: aname + '_3',
            origin: aname + '_2',
            w: dx,
            h: dy
        });

        if (atrimLenght > 0) {

            angle = 360 - aangle;
            dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
            dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;
            const bottomRightP = new A2D.Apg2DPoint(dx, dy);
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_3V',
                origin: aname + '_2',
                w: dx,
                h: dy
            });

            angle = 179;
            dx = Math.cos(angle * this.TO_RAD) * (atrimLenght);
            dy = Math.sin(angle * this.TO_RAD) * (atrimLenght);
            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_4V',
                origin: aname + '_3',
                w: dx,
                h: dy
            });

            cx = bottomRightTrimmedP.x + dx;
            cy = bottomRightTrimmedP.y + dy;
            const rotatedTrimP = new A2D.Apg2DPoint(cx, cy);

            const l1 = new A2D.Apg2DLine(bottomLeftP, bottomRightP);
            const l2 = new A2D.Apg2DLine(bottomRightTrimmedP, rotatedTrimP);
            const intermediateBottomP = l1.intersection(l2);

            r.push({
                type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                name: aname + '_4',
                origin: aorigin,
                w: intermediateBottomP!.x,
                h: intermediateBottomP!.y
            });
        }

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN,
            origin: aorigin,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_MOVE,
            origin: aorigin,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_1',
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_2',
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
            origin: aname + '_3',
        });

        if (atrimLenght > 0) {

            r.push({
                type: eApgCiiInstructionTypes.DRAW_PATH_LINE,
                origin: aname + '_4',
            });
        }

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.DRAW_PATH_END
        });
        r.push({
            type: eApgCiiInstructionTypes.CLOSE_GROUP
        });

        if (atrimLenght > 0) { 
            r.push({
                type: eApgCiiInstructionTypes.PUSH_LAYER,
                name: Cad.eApgCadDftLayers.DEBUG
            });
            // r.push({
            //     type: eApgCiiInstructionTypes.DRAW_LINE,
            //     points: [aorigin, aname + '_4']
            // });
            // r.push({
            //     type: eApgCiiInstructionTypes.DRAW_LINE,
            //     points: [aname + '_4', aname + '_4']
            // });

            r.push({
                type: eApgCiiInstructionTypes.POP_LAYER,
            });
        }


        return r;

    }
}