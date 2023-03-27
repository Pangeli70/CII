/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/21]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCad_PATH_ARC_OPTIONS_SCHEMA_ID } from "./IApgCad_PATH_ARC_OPTIONS_SCHEMA.ts";

export const IApgCii_PATH_ARC_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_PathArc';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_PATH_ARC_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.PATH_ARC as string
        },
        origin: {
            type: 'string',
        },
        radious: {
            type: 'number'
        },
        angle: {
            type: 'number'
        },
        payload: {
            $ref: IApgCad_PATH_ARC_OPTIONS_SCHEMA_ID,
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'origin', 'radious'
    ]

};

export const IApgCii_PATH_ARC_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;