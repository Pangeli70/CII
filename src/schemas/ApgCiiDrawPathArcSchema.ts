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
    $id: 'IApgCii_DrawPathArc#',
    type: 'object',
    properties: {
        type: {
            const: eApgCiiInstructionTypes.DRAW_PATH_ARC as string
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
        // TODO @1 Implement JSV to define sub objects or use external schema
        payload: {
            type: 'object'
            // largeArc : 'boolean'
            // clockwise: 'boolean'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type', 'origin', 'radious'
    ]

};

export const ApgCii_DrawPathArcSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;