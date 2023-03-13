/**' -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

enum FIELD_NAMES {
    canvasWidth = 'canvasWidth',
    canvasHeight = 'canvasHeight',
    viewPortWidth = 'viewPortWidth',
    viewPortHeight = 'viewPortHeight',
    originXDisp = 'originXDisp',
    originYDisp = 'originYDisp'
}
export const IApgCad_VIEWBOX_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_ViewBox';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_VIEWBOX_SCHEMA_ID,
    type: 'object',
    properties: {
        [FIELD_NAMES.canvasWidth]: {
            description: ' Canvas Width in pixels ',
            type: 'number'
        },
        [FIELD_NAMES.canvasHeight]: {
            description: ' Canvas Height in pixels ',
            type: 'number'
        },
        [FIELD_NAMES.viewPortWidth]: {
            description: ' ViewPort Width in pixels ',
            type: 'number'
        },
        [FIELD_NAMES.viewPortHeight]: {
            description: ' ViewPort Height in pixels ',
            type: 'number'
        },
        [FIELD_NAMES.originXDisp]: {
            description: ' Origin x displacement ',
            type: 'number'
        },
        [FIELD_NAMES.originYDisp]: {
            description: ' Origin y displacement ',
            type: 'number'
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        FIELD_NAMES.canvasWidth,
        FIELD_NAMES.canvasHeight,
        FIELD_NAMES.viewPortWidth,
        FIELD_NAMES.viewPortHeight,
        FIELD_NAMES.originXDisp,
        FIELD_NAMES.originYDisp
    ]

};

export const IApgCad_VIEWBOX_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;