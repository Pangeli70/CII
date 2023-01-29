/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_NewGroup#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.NEW_GROUP as string
        },
        name: {
            type: 'string',
        },
        strokeStyle: {
            type: 'string'
        },
        fillStyle: {
            type: 'string'
        },
        textStyle: {
            type: 'string'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'name'
    ]

};

export const ApgCii_NewGroupSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;