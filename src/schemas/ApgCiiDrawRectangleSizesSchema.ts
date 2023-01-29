/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_DrawRectangleSizes#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES as string
        },
        name: {
            type: 'string'
        },
        origin: {
            type: 'string'
        },
        w: {
            type: 'number'
        },
        h: {
            type: 'number'
        },
        angle: {
            type: 'number'
        },
        pivot: {
            type: 'string'
        },
        strokeStyle: {
            type: 'string'
        },
        fillStyle: {
            type: 'string'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type','origin', 'w', 'h'
    ]

};

export const ApgCii_DrawRectangleSizesSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;