/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/15] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID } from "./IApgCad_ARC_DIM_OPTIONS_SCHEMA.ts";

export const IApgCii_DRAW_ARC_DIM_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_DrawArcDim'

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_DRAW_ARC_DIM_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_ARC_DIM as string
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
            $ref: IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'points', 'radious'
    ]

};

export const IApgCii_DRAW_ARC_DIM_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;