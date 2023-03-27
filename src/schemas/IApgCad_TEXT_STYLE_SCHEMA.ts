/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'


export const IApgCad_TEXT_STYLE_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_TextStyle';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_TEXT_STYLE_SCHEMA_ID,
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
        lineHeight: {
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

export const IApgCad_TEXT_STYLE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;