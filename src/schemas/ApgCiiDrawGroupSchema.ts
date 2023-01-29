/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_DrawGroup#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_GROUP as string
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
        payload: {
            type: 'object'
        },

    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'name', 'origin', 'w', 'h', 'payload'
    ]

};

export const ApgCii_DrawGroupSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;