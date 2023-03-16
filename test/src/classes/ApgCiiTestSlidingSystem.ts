import { A2D, Cad } from "../../../deps.ts";
import { eApgCiiInstructionTypes } from "../../../src/enums/eApgCiiInstructionTypes.ts";
import { IApgCiiInstruction } from "../../../src/interfaces/IApgCiiInstruction.ts";


export class ApgCiiTestSlidingSystem {
    static readonly WIDTH = 54;
    static readonly NEUTRAL_FIBER_RATIO = 0.5;
    static readonly TO_RAD = Math.PI / 180;


    static SlidingCurveSideView(
        aname: string,
        aorigin: string,
        aradious: number,
        afirstAngle: number,
        asecondAngle: number,
        adebug = false
    ) {
        const firstSegment = 122;
        const totalLenght = 1000;


        const r: IApgCiiInstruction[] = [];

        const vectors: A2D.Apg2DPoint[] = [];

        // first point vector from origin [0]
        let angle = 90 - afirstAngle;
        let dx = Math.cos(angle * this.TO_RAD) * firstSegment;
        let dy = Math.sin(angle * this.TO_RAD) * firstSegment;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aorigin, "_P1", dx, dy);

        // first center point vector from first point [1]
        angle = 360 - afirstAngle;
        dx = Math.cos(angle * this.TO_RAD) * aradious;
        dy = Math.sin(angle * this.TO_RAD) * aradious;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P1", "_c1", dx, dy);

        // second point vector from first center point [2]
        angle = 90 + asecondAngle;
        dx = Math.cos(angle * this.TO_RAD) * aradious;
        dy = Math.sin(angle * this.TO_RAD) * aradious;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_c1", "_P2", dx, dy);

        // second point vector from first point [3]
        dx = vectors[2].x + vectors[1].x;
        dy = vectors[2].y + vectors[1].y;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P1", "_X1", dx, dy);

        // arc angle
        const arcAngle = ((180 - afirstAngle) - (90 + asecondAngle));

        // Third point vector from second point [4]
        const circumferencePortion = arcAngle / 360;
        const arcPrimitiveRadious = aradious + this.WIDTH * this.NEUTRAL_FIBER_RATIO;
        const arcPrimitiveLength = (2 * Math.PI * arcPrimitiveRadious) * circumferencePortion;
        const secondSegment = totalLenght - firstSegment - arcPrimitiveLength;

        angle = asecondAngle;
        dx = Math.cos(angle * this.TO_RAD) * secondSegment;
        dy = Math.sin(angle * this.TO_RAD) * secondSegment;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P2", "_P3", dx, dy);

        // 4th point vector from 3rd point [5]
        angle = asecondAngle + 90;
        dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
        dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P3", "_P4", dx, dy);

        // 5th point vector from 4th point [6]
        angle = asecondAngle + 180;
        dx = Math.cos(angle * this.TO_RAD) * secondSegment;
        dy = Math.sin(angle * this.TO_RAD) * secondSegment;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P4", "_P5", dx, dy);

        // 2nd center point vector from 5th point [7]
        angle = asecondAngle + 270;
        dx = Math.cos(angle * this.TO_RAD) * (aradious + this.WIDTH);
        dy = Math.sin(angle * this.TO_RAD) * (aradious + this.WIDTH);
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P5", "_C2", dx, dy);

        // 6th point vector from 2nd center point [8]
        angle = (180 - afirstAngle);
        dx = Math.cos(angle * this.TO_RAD) * (aradious + this.WIDTH);
        dy = Math.sin(angle * this.TO_RAD) * (aradious + this.WIDTH);
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_C2", "_P6", dx, dy);

        // 6th point vector from 5th point [9]
        dx = vectors[8].x + vectors[7].x;
        dy = vectors[8].y + vectors[7].y;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P5", "_X2", dx, dy);

        // 7th point vector from 6th point [10]
        angle = 270 - afirstAngle;
        dx = Math.cos(angle * this.TO_RAD) * firstSegment;
        dy = Math.sin(angle * this.TO_RAD) * firstSegment;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        debugPoint(aname + "_P6", "_P7", dx, dy);

        const cursor = aname + '_c';

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: cursor,
            origin: aorigin,
            w: 0,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.GROUP_BEGIN,
            name: aname,
        });




        r.push({
            type: eApgCiiInstructionTypes.PATH_BEGIN,
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_MOVE,
            origin: aorigin,
            w: 0,
            h: 0
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[0].x,
            h: vectors[0].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_CURSOR,
            origin: cursor,
            pivot: cursor,
            w: vectors[3].x,
            h: vectors[3].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_ARC,
            origin: cursor,
            radious: aradious,
            angle: arcAngle,
            payload: {
                largeArc: false,
                clockwise: true
            }
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[4].x,
            h: vectors[4].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[5].x,
            h: vectors[5].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[6].x,
            h: vectors[6].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_CURSOR,
            origin: cursor,
            pivot: cursor,
            w: vectors[9].x,
            h: vectors[9].y
        });


        r.push({
            type: eApgCiiInstructionTypes.PATH_ARC,
            origin: cursor,
            angle: arcAngle,
            radious: aradious + this.WIDTH,
            payload: {
                largeArc: false,
                clockwise: false
            }
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[10].x,
            h: vectors[10].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_END
        });

        r.push({
            type: eApgCiiInstructionTypes.GROUP_END
        });
        return r;


        function debugPoint(aorigin: string, apname: string, adx: number, ady: number) {
            if (adebug) {

                r.push({
                    type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
                    name: aname + apname,
                    origin: aorigin,
                    w: adx,
                    h: ady
                });
            }
        }
    }

    static SlidingTrackSideView(
        aname: string,
        aorigin: string,
        alenght: number,
        aangle: number,
        atrimLenght = 0
    ) {
        let cx = 0, cy = 0;
        const pts: A2D.Apg2DPoint[] = [];
        // P[0]
        pts.push(new A2D.Apg2DPoint(cx, cy));

        const r: IApgCiiInstruction[] = [];
        const vectors: A2D.Apg2DPoint[] = [];

        // V[0], P[1]
        let angle = 90 - aangle;
        let dx = Math.cos(angle * this.TO_RAD) * alenght;
        let dy = Math.sin(angle * this.TO_RAD) * alenght;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        cx += dx;
        cy += dy;
        pts.push(new A2D.Apg2DPoint(cx, cy));

        // V[1], P[2]
        angle = 360 - aangle;
        dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
        dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        cx += dx;
        cy += dy;
        pts.push(new A2D.Apg2DPoint(cx, cy));

        // V[2], P[3]
        angle = 270 - aangle;
        dx = Math.cos(angle * this.TO_RAD) * (alenght - atrimLenght);
        dy = Math.sin(angle * this.TO_RAD) * (alenght - atrimLenght);
        vectors.push(new A2D.Apg2DPoint(dx, dy));
        cx += dx;
        cy += dy;
        pts.push(new A2D.Apg2DPoint(cx, cy));

        if (atrimLenght > 0) {

            // V[3], P[3]
            angle = 360 - aangle;
            dx = Math.cos(angle * this.TO_RAD) * this.WIDTH;
            dy = Math.sin(angle * this.TO_RAD) * this.WIDTH;
            vectors.push(new A2D.Apg2DPoint(dx, dy));
            cx += dx;
            cy += dy;
            pts.push(new A2D.Apg2DPoint(cx, cy));
            angle = 179;

            // V[4], P[4]
            dx = Math.cos(angle * this.TO_RAD) * (atrimLenght);
            dy = Math.sin(angle * this.TO_RAD) * (atrimLenght);
            vectors.push(new A2D.Apg2DPoint(dx, dy));
            cx += dx;
            cy += dy;
            pts.push(new A2D.Apg2DPoint(cx, cy));

            // P[5]
            cx = pts[4].x + dx;
            cy = pts[4].y + dy;
            pts.push(new A2D.Apg2DPoint(cx, cy));

            // P[6], V[5]
            const l1 = new A2D.Apg2DLine(pts[0], pts[1]);
            const l2 = new A2D.Apg2DLine(pts[4], pts[5]);
            pts.push(l1.intersection(l2)!);
            dx = pts[5].x - pts[3].x;
            dy = pts[5].y - pts[3].y;
            vectors.push(new A2D.Apg2DPoint(dx, dy));

        }

        const cursor = aname + '_c';

        r.push({
            type: eApgCiiInstructionTypes.NEW_POINT_DELTA,
            name: cursor,
            origin: aorigin,
            w: 0,
            h: 0
        });
        r.push({
            type: eApgCiiInstructionTypes.GROUP_BEGIN,
            name: aname,
        });
        r.push({
            type: eApgCiiInstructionTypes.PATH_BEGIN,
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
            w: vectors[0].x,
            h: vectors[0].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[1].x,
            h: vectors[1].y
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_LINE,
            origin: cursor,
            w: vectors[2].x,
            h: vectors[2].y
        });

        if (atrimLenght > 0) {

            r.push({
                type: eApgCiiInstructionTypes.PATH_LINE,
                origin: cursor,
                w: vectors[4].x,
                h: vectors[4].y
            });
        }

        r.push({
            type: eApgCiiInstructionTypes.PATH_CLOSE,
        });

        r.push({
            type: eApgCiiInstructionTypes.PATH_END
        });
        r.push({
            type: eApgCiiInstructionTypes.GROUP_END
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