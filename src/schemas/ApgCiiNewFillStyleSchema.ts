/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_NewFillStyle#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.NEW_FILL_STYLE as string
        },
        name: {
            type: 'string',
        },
        payload: {
            type: 'object'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'name', 'payload'
    ]

};

export const ApgCii_NewFillStyleSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;