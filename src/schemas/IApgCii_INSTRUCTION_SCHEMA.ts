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


// TODO @1 Move this to its own file -- APG 20230319
export enum eApgCiiInstructionFieldsNames {
    type = 'type',
    name = 'name',
    x = 'x',
    y = 'y',
    w = 'w',
    h = 'h',
    n = 'n',
    origin = 'origin',
    radious = 'radious',
    pivot = 'pivot',
    angle = 'angle',
    points = 'points',
    text = 'text',
    strokeStyle = 'strokeStyle',
    fillStyle = 'fillStyle',
    textStyle = 'textStyle',
    payload = 'payload',

}

export const IApgCii_INSTRUCTION_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "IApgCii_Instruction";

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCii_INSTRUCTION_SCHEMA_ID,
    title: 'Defines all the possible properties for preliminary CAD instruction validation',
    type: 'object',
    properties: {
        [eApgCiiInstructionFieldsNames.type]: {
            description: 'Type of the Cad instruction',
            $ref: eApgCii_TYPES_SCHEMA_ID_REF
        },

        [eApgCiiInstructionFieldsNames.name]: {
            description: 'Name given to the entity (e.g. point) or shape defined by the instruction ',
            type: 'string'
        },

        [eApgCiiInstructionFieldsNames.x]: {
            description: 'Ordinate or X value coordinate',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.y]: {
            description: 'Abscissa or Y value coordinate',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.w]: {
            description: 'Width or Delta X value',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.h]: {
            description: 'Height or Delta Y value',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.n]: {
            description: 'Number of items or repetitions',
            type: 'integer'
        },

        [eApgCiiInstructionFieldsNames.origin]: {
            description: 'Name of the point that will be used as reference for positioning the shape that has to be drawn by this instruction',
            type: 'string'
        },

        [eApgCiiInstructionFieldsNames.radious]: {
            description: 'Radious of the arc/circle/curve',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.pivot]: {
            description: 'Name of the point that will be used as reference for the rotation specified by [angle]',
            type: 'string'
        },

        [eApgCiiInstructionFieldsNames.angle]: {
            description: 'A rotation angle. Will be applied from [origin], or from [pivot] if specified',
            type: 'number'
        },

        [eApgCiiInstructionFieldsNames.points]: {
            description: 'An array of point names',
            type: 'array',
            items: {
                type: 'string'
            }
        },

        [eApgCiiInstructionFieldsNames.text]: {
            description: 'An array of paragraphs that has to be drawn',
            type: 'array',
            items: {
                type: 'string'
            }
        },

        [eApgCiiInstructionFieldsNames.strokeStyle]: {
            description: 'Name of the stroke style that will be used to draw the shape',
            type: 'string'
        },
        
        [eApgCiiInstructionFieldsNames.fillStyle]: {
            description: 'Name of the fill style that will be used to draw the shape',
            type: 'string'
        },

        [eApgCiiInstructionFieldsNames.textStyle]: {
            description: 'Name of the text style that will be used to draw the text defined by this instruction',
            type: 'string'
        },
        // TODO @2 Rename this to Options
        [eApgCiiInstructionFieldsNames.payload]: {
            description: 'Additional options object that will be used to specify further parameters',
            type: 'object'
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        eApgCiiInstructionFieldsNames.type
    ]
}



export const IApgCii_INSTRUCTION_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;