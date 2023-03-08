/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCad_STROKE_STYLE_SCHEMA_ID } from "./IApgCad_STROKE_STYLE_SCHEMA.ts";

export const IApgCii_NEW_STROKE_STYLE_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_NewStrokeStyle';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_NEW_STROKE_STYLE_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.NEW_STROKE_STYLE as string
        },
        name: {
            type: 'string',
        },
        payload: {
            $ref: IApgCad_STROKE_STYLE_SCHEMA_ID
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'name', 'payload'
    ]

};

export const IApgCii_NEW_STROKE_STYLE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;