/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


//TODO @1 What is this for? -- APG 20230304

export const IApgCii_DRAW_GROUP_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_DrawGroup';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_DRAW_GROUP_SCHEMA_ID,
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

export const IApgCii_DRAW_GROUP_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;