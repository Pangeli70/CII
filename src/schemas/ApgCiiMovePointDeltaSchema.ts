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
    $id: 'IApgCii_MovePointDelta#',
    type: 'object',
    properties: {

        type: {
            const: eApgCiiInstructionTypes.MOVE_POINT_DELTA as string
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

export const ApgCii_MovePointDeltaSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;