/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/19]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { eApgCiiInstructionFieldsNames } from "./IApgCii_INSTRUCTION_SCHEMA.ts";

export const IApgCii_DRAW_TEXT_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_DrawText';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_DRAW_TEXT_SCHEMA_ID,
    type: 'object',
    properties: {
        [eApgCiiInstructionFieldsNames.type]: {
            const: eApgCiiInstructionTypes.DRAW_TEXT as string
        },
        [eApgCiiInstructionFieldsNames.name]: {
            type: 'string'
        },
        [eApgCiiInstructionFieldsNames.origin]: {
            type: 'string',
        },
        [eApgCiiInstructionFieldsNames.angle]: {
            type: 'number'
        },
        [eApgCiiInstructionFieldsNames.pivot]: {
            type: 'string'
        },
        [eApgCiiInstructionFieldsNames.text]: {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        [eApgCiiInstructionFieldsNames.textStyle]: {
            type: 'string'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        eApgCiiInstructionFieldsNames.type,
        eApgCiiInstructionFieldsNames.origin,
        eApgCiiInstructionFieldsNames.text
    ]

};

export const IApgCii_DRAW_TEXT_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;