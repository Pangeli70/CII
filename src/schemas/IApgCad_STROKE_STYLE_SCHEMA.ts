/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

export const IApgCad_STROKE_STYLE_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_StrokeStyle';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_STROKE_STYLE_SCHEMA_ID,
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

export const IApgCad_STROKE_STYLE_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;