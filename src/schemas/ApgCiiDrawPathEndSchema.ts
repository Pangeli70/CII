/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/21]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCii_DrawPathEnd#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_PATH_END as string
        },
        angle: {
            type: 'number'
        },
        pivot: {
            type: 'string'
        },
        strokeStyle: {
            type: 'string'
        },
        fillStyle: {
            type: 'string'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type'
    ]

};

export const ApgCii_DrawPathEndSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;