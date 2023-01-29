/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/15] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_DrawLinearDim#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_LIN_DIM as string
        },
        name: {
            type: 'string'
        },
        points: {
            type: 'array',
            items: {
                type: 'string'
            },
            minItems: 2,
            maxItems: 2,
            uniqueItems: true
        },
        radious: {
            type: 'number'
        },
        text: {
            type: 'array',
            items: {
                type: 'string'
            },
            minItems: 2,
            maxItems: 2,
            uniqueItems: true
        },
        strokeStyle: {
            type: 'string'
        },
        payload: {
            type: 'object',
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'points', 'radious'
    ]

};

export const ApgCii_DrawLinearDimSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;