/**' -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

enum FIELD_NAMES {
    draw = 'draw',
    strokeWidth = 'strokeWidth',
    strokeColor = 'strokeColor',
    fillColor = 'fillColor',

}
export const IApgCad_BACKGROUND_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_Background';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_BACKGROUND_SCHEMA_ID,
    type: 'object',
    properties: {
        [FIELD_NAMES.draw]: {
            description: 'Flag that controls if the background has to be drawn',
            type: 'boolean'
        },
        [FIELD_NAMES.strokeColor]: {
            description: 'Color of the border of the background',
            type: 'string'
        },
        [FIELD_NAMES.strokeWidth]: {
            description: 'Width of the border of the background in pixels',
            type: 'number',
            minimum: 1,
            maximum: 20,
        },
        [FIELD_NAMES.fillColor]: {
            description: 'Color of the background',
            type: 'string'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        FIELD_NAMES.draw,
        FIELD_NAMES.strokeColor,
        FIELD_NAMES.strokeWidth,
        FIELD_NAMES.fillColor,
    ]

};

export const IApgCad_BACKGROUND_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;