/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCad_StrokeStyle#',
    type: 'object',
    properties: {
        color: {
            type: 'string'
        },
        width: {
            type: "integer",
            minimum: 1,
            maximum: 20,
        },
        opacity: {
            type: "number",
            minimum: 0,
            maximum: 1,
        },
        dashPattern: {
            type: "array",
            items: {
                type: "number"
            }
        },
        dashOffset: {
            type: "number"
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'color', 'width'
    ]

};

export const ApgCad_StrokeStyleSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;