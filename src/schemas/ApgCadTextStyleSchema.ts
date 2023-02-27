/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCad_TextStyle#',
    type: 'object',
    properties: {
        font: {
            type: 'string'
        },
        size: {
            type: 'number'
        },
        aspectRatio: {
            type: 'number'
        },
        leading: {
            type: 'number'
        },
        anchor: {
            enum: ['start', 'middle', 'end']
        },
        italic: {
            type: 'boolean'
        },
        bold:{
            type: 'boolean'
        },
        fill: {
            type: 'string',
        },
        stroke: {
            type: 'string',
        },
        
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'font', 'size', 'aspectRatio', 'fill'
    ]

};

export const ApgCad_TextStyleSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;