/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { IApgCad_VIEWBOX_SCHEMA_ID } from "./IApgCad_VIEWBOX_SCHEMA.ts";

export const IApgCii_SET_VIEWBOX_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_SetViewBox'


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_SET_VIEWBOX_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.SET_VIEWBOX as string
        },
        payload: {
            $ref: IApgCad_VIEWBOX_SCHEMA_ID
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'payload'
    ]

};

export const IApgCii_SET_VIEWBOX_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;