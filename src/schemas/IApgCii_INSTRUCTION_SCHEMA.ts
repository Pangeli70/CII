/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCii_TYPES_SCHEMA_ID_REF } from "./eApgCii_TYPES_SCHEMA.ts";

export const IApgCii_INSTRUCTION_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "IApgCii_Instruction";

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_INSTRUCTION_SCHEMA_ID,
    title: 'Defines all the possible properties for preliminary CAD instruction validation',
    type: 'object',
    properties: {
        type: {
            description: '',
            $ref: eApgCii_TYPES_SCHEMA_ID_REF
        },

        name: {
            description:'',
            type: 'string'
        },

        x: {
            description: '',
            type: 'number'
        },

        y: {
            description: '',
            type: 'number'
        },

        w: {
            description: '',
            type: 'number'
        },

        h: {
            description: '',
            type: 'number'
        },

        n: {
            description: '',
            type: 'integer'
        },

        origin: {
            description: '',
            type: 'string'
        },

        radious: {
            description: '',
            type: 'number'
        },

        pivot: {
            description: '',
            type: 'string'
        },

        angle: {
            description: '',
            type: 'number'
        },

        points: {
            description: '',
            type: 'array',
            items: {
                type: 'string'
            }
        },

        text: {
            description: '',
            type: 'array',
            items: {
                type: 'string'
            }
        },

        strokeStyle: {
            description: '',
            type: 'string'
        },
        fillStyle: {
            description: '',
            type: 'string'
        },

        textStyle: {
            type: 'string'
        },

        payload: {
            description: '',
            type: 'object'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type'
    ]
}



export const IApgCii_INSTRUCTION_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;