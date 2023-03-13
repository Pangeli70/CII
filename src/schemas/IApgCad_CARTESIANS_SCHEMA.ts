/**' -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCad_CARTESIAN_MODES_SCHEMA_ID_REF } from "./eApgCad_CARTESIAN_MODES_SCHEMA.ts";
import { IApgCad_STROKE_STYLE_SCHEMA_ID } from "./IApgCad_STROKE_STYLE_SCHEMA.ts";
import { IApgCad_TEXT_STYLE_SCHEMA_ID } from "./IApgCad_TEXT_STYLE_SCHEMA.ts";

enum FIELD_NAMES {
    mode = 'mode',
    axisStroke = 'axisStroke',
    drawTicks = 'drawTicks',
    tickStroke = 'tickStroke',
    ticksStep = 'ticksStep',
    ticksSize = 'ticksSize',
    drawBigTicks = 'drawBigTicks',
    bigTicksEvery = 'bigTicksEvery',
    bigTicksSize = 'bigTicksSize',
    drawBigTicksLables = 'drawBigTicksLables',
    labelsTextStyleName = 'labelsTextStyleName',
    labelsStyle = 'labelsStyle',
}
export const IApgCad_CARTESIANS_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_Cartesians';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_CARTESIANS_SCHEMA_ID,
    type: 'object',
    properties: {
        [FIELD_NAMES.mode]: {
            description: '',
            $ref: eApgCad_CARTESIAN_MODES_SCHEMA_ID_REF
        },
        [FIELD_NAMES.axisStroke]: {
            description: '',
            $ref: IApgCad_STROKE_STYLE_SCHEMA_ID
        }, 
        [FIELD_NAMES.drawTicks]: {
            description: '',
            type: 'boolean'
        },
        [FIELD_NAMES.tickStroke]: {
            description: '',
            $ref: IApgCad_STROKE_STYLE_SCHEMA_ID
        }, 
        [FIELD_NAMES.ticksStep]: {
            description: '',
            type: 'number'
        },
        [FIELD_NAMES.ticksSize]: {
            description: '',
            type: 'number'
        },
        [FIELD_NAMES.drawBigTicks]: {
            description: '',
            type: 'boolean'
        },
        [FIELD_NAMES.bigTicksEvery]: {
            description: '',
            type: 'number'
        },
        [FIELD_NAMES.bigTicksSize]: {
            description: '',
            type: 'number'
        },

        [FIELD_NAMES.drawBigTicksLables]: {
            description: '',
            type: 'boolean'
        },
        [FIELD_NAMES.labelsTextStyleName]: {
            description: '',
            type: 'string'
        },

        [FIELD_NAMES.labelsStyle]: { // optional
            description: '',
            $ref: IApgCad_TEXT_STYLE_SCHEMA_ID
        }, 
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        FIELD_NAMES.mode,
        FIELD_NAMES.axisStroke,
        FIELD_NAMES.drawTicks,
        FIELD_NAMES.tickStroke,
        FIELD_NAMES.ticksStep,
        FIELD_NAMES.ticksSize,
        FIELD_NAMES.drawBigTicks,
        FIELD_NAMES.drawBigTicksLables,
        FIELD_NAMES.bigTicksSize,
        FIELD_NAMES.bigTicksEvery,
        FIELD_NAMES.labelsTextStyleName,
    ]

};

export const IApgCad_CARTESIANS_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;