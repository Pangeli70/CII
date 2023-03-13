/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/13]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

export const IApgCii_SETUP_BEGIN_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCii_SetupBegin';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_SETUP_BEGIN_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.SETUP_BEGIN as string
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type'
    ]

};

export const IApgCii_SETUP_BEGIN_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;