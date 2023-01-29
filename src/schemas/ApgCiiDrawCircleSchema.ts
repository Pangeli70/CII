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
    $id: 'IApgCii_DrawCircle#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_CIRCLE as string
        },
        name: {
            type: 'string'
        },
        origin: {
            type: 'string',
        },
        radious: {
            type: 'number',
            minimum: 0.1,
        },
        strokeStyle: {
            type: 'string'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'origin', 'radious'
    ]

};

export const ApgCii_DrawCircleSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;