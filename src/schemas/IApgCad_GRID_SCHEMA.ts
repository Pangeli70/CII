/**' -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/18]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCad_GRID_MODES_SCHEMA_ID_REF } from "./eApgCad_GRID_MODES_SCHEMA.ts";
import { IApgCad_STROKE_STYLE_SCHEMA_ID } from "./IApgCad_STROKE_STYLE_SCHEMA.ts";

enum FIELD_NAMES {
    mode = 'mode',
    gridStep = 'gridStep',
    gridStroke = 'gridStroke',
    drawMajors = 'drawMajors',
    majorEvery = 'majorEvery',
    majorGridStroke = 'majorGridStroke',
    
}
export const IApgCad_GRID_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_Grid';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_GRID_SCHEMA_ID,
    type: 'object',
    properties: {
        [FIELD_NAMES.mode]: {
            description: 'Defines the grid mode',
            $ref: eApgCad_GRID_MODES_SCHEMA_ID_REF
        },
        [FIELD_NAMES.gridStep]: {
            description: 'Distance between the grid lines',
            type: 'number'
        },
        [FIELD_NAMES.gridStroke]: {
            description: 'Stroke style of the grid lines',
            $ref: IApgCad_STROKE_STYLE_SCHEMA_ID
        }, 
        [FIELD_NAMES.drawMajors]: {
            description: 'Flag that enables the major grid lines',
            type: 'boolean'
        },
        [FIELD_NAMES.majorEvery]: {
            description: 'Defines the number of grid lines that identifies a major line',
            type: 'number'
        },
        [FIELD_NAMES.majorGridStroke]: {
            description: 'Stroke style of the major grid lines',
            $ref: IApgCad_STROKE_STYLE_SCHEMA_ID
        }, 
        
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        FIELD_NAMES.mode,
        FIELD_NAMES.gridStep,
        FIELD_NAMES.gridStroke,
        FIELD_NAMES.drawMajors,
        FIELD_NAMES.majorEvery,
        FIELD_NAMES.majorGridStroke,
    ]

};

export const IApgCad_GRID_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;