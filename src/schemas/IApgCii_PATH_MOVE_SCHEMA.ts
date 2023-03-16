/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/21]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";
import { eApgCiiInstructionFieldsNames } from "./IApgCii_INSTRUCTION_SCHEMA.ts";


export const IApgCii_PATH_MOVE_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_PathMove';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_PATH_MOVE_SCHEMA_ID,
    type: 'object',
    properties: {
        [eApgCiiInstructionFieldsNames.type]: {
            const: eApgCiiInstructionTypes.PATH_MOVE as string
        },
        [eApgCiiInstructionFieldsNames.origin]: {
            type: 'string',
        },
        [eApgCiiInstructionFieldsNames.w]: {
            type: 'number'
        },
        [eApgCiiInstructionFieldsNames.h]: {
            type: 'number'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        eApgCiiInstructionFieldsNames.type,
        eApgCiiInstructionFieldsNames.origin,
        eApgCiiInstructionFieldsNames.w,
        eApgCiiInstructionFieldsNames.h
    ]

};

export const IApgCii_PATH_MOVE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;