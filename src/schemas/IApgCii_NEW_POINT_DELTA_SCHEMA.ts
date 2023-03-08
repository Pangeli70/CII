/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

export const IApgCii_NEW_POINT_DELTA_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_NewPointDelta';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_NEW_POINT_DELTA_SCHEMA_ID,
    type: 'object',
    properties: {

        type: {
            const: eApgCiiInstructionTypes.NEW_POINT_DELTA as string
        },
        name: {
            type: 'string',
        },
        origin: {
            type: 'string',
        },
        w: {
            type: 'number'
        },
        h: {
            type: 'number'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'origin', 'w', 'h'
    ]

};

export const IApgCii_NEW_POINT_DELTA_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;