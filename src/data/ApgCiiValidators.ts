/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */

import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

import { eApgCii_TYPES_SCHEMA, eApgCii_TYPES_SCHEMA_ID } from "../schemas/eApgCii_TYPES_SCHEMA.ts";
import { IApgCii_INSTRUCTION_SCHEMA } from "../schemas/IApgCii_INSTRUCTION_SCHEMA.ts";

import { IApgCad_FILL_STYLE_SCHEMA, IApgCad_FILL_STYLE_SCHEMA_ID } from "../schemas/IApgCad_FILL_STYLE_SCHEMA.ts";
import { IApgCad_STROKE_STYLE_SCHEMA, IApgCad_STROKE_STYLE_SCHEMA_ID } from "../schemas/IApgCad_STROKE_STYLE_SCHEMA.ts";
import { IApgCad_TEXT_STYLE_SCHEMA, IApgCad_TEXT_STYLE_SCHEMA_ID } from "../schemas/IApgCad_TEXT_STYLE_SCHEMA.ts";

import { eApgCad_ARC_DIMENSION_TYPES_SCHEMA, eApgCad_ARC_DIMENSION_TYPES_SCHEMA_ID } from "../schemas/eApgCad_ARC_DIMENSION_TYPES_SCHEMA.ts";
import { eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA, eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA_ID } from "../schemas/eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA.ts";
import { IApgCad_ARC_DIM_OPTIONS_SCHEMA, IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID } from "../schemas/IApgCad_ARC_DIM_OPTIONS_SCHEMA.ts";
import { IApgCad_LINEAR_DIM_OPTIONS_SCHEMA, IApgCad_LINEAR_DIM_OPTIONS_SCHEMA_ID } from "../schemas/IApgCad_LINEAR_DIM_OPTIONS_SCHEMA.ts";

import { IApgCii_NEW_FILL_STYLE_SCHEMA } from "../schemas/IApgCii_NEW_FILL_STYLE_SCHEMA.ts";
import { IApgCii_NEW_STROKE_STYLE_SCHEMA } from "../schemas/IApgCii_NEW_STROKE_STYLE_SCHEMA.ts";
import { IApgCii_NEW_TEXT_STYLE_SCHEMA } from "../schemas/IApgCii_NEW_TEXT_STYLE_SCHEMA.ts";


import { IApgCii_SET_NAME_SCHEMA } from "../schemas/IApgCii_SET_NAME_SCHEMA.ts";
import { IApgCii_POP_LAYER_SCHEMA } from "../schemas/IApgCii_POP_LAYER_SCHEMA.ts";
import { IApgCii_PUSH_LAYER_SCHEMA } from "../schemas/IApgCii_PUSH_LAYER_SCHEMA.ts";

import { IApgCii_NEW_POINT_SCHEMA } from "../schemas/IApgCii_NEW_POINT_SCHEMA.ts";
import { IApgCii_NEW_POINT_DELTA_SCHEMA } from "../schemas/IApgCii_NEW_POINT_DELTA_SCHEMA.ts";
import { IApgCii_MOVE_POINT_DELTA_SCHEMA } from "../schemas/IApgCii_MOVE_POINT_DELTA_SCHEMA.ts";

import { IApgCii_GROUP_BEGIN_SCHEMA } from "../schemas/IApgCii_GROUP_BEGIN_SCHEMA.ts";
import { IApgCii_GROUP_END_SCHEMA } from "../schemas/IApgCii_GROUP_END_SCHEMA.ts";

import { IApgCii_DRAW_ALL_POINTS_SCHEMA } from "../schemas/IApgCii_DRAW_ALL_POINTS_SCHEMA.ts";

import { IApgCii_DRAW_POINTS_SCHEMA } from "../schemas/IApgCii_DRAW_POINTS_SCHEMA.ts";
import { IApgCii_DRAW_LINE_SCHEMA } from "../schemas/IApgCii_DRAW_LINE_SCHEMA.ts";
import { IApgCii_DRAW_POLYLINE_SCHEMA } from "../schemas/IApgCii_DRAW_POLYLINE_SCHEMA.ts";
import { IApgCii_DRAW_CIRCLE_SCHEMA } from "../schemas/IApgCii_DRAW_CIRCLE_SCHEMA.ts";
import { IApgCii_DRAW_GROUP_SCHEMA } from "../schemas/IApgCii_DRAW_GROUP_SCHEMA.ts";
import { IApgCii_DRAW_ARC_SCHEMA } from "../schemas/IApgCii_DRAW_ARC_SCHEMA.ts";
import { IApgCii_DRAW_RECTANGLE_POINTS_SCHEMA } from "../schemas/IApgCii_DRAW_RECTANGLE_POINTS_SCHEMA.ts";
import { IApgCii_DRAW_RECTANGLE_SIZES_SCHEMA } from "../schemas/IApgCii_DRAW_RECTANGLE_SIZES_SCHEMA.ts";
import { IApgCii_DRAW_REGULAR_POLIGON_SCHEMA } from "../schemas/IApgCii_DRAW_REGULAR_POLIGON_SCHEMA.ts";
import { IApgCii_DRAW_POLYGON_SCHEMA } from "../schemas/IApgCii_DRAW_POLYGON_SCHEMA.ts";

import { IApgCii_DRAW_PATH_BEGIN_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_BEGIN_SCHEMA.ts";
import { IApgCii_DRAW_PATH_MOVE_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_MOVE_SCHEMA.ts";
import { IApgCii_DRAW_PATH_LINE_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_LINE_SCHEMA.ts";
import { IApgCii_DRAW_PATH_ARC_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_ARC_SCHEMA.ts";
import { IApgCii_DRAW_PATH_CLOSE_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_CLOSE_SCHEMA.ts";
import { IApgCii_DRAW_PATH_END_SCHEMA } from "../schemas/IApgCii_DRAW_PATH_END_SCHEMA.ts";

import { IApgCii_DRAW_LINEAR_DIM_SCHEMA } from "../schemas/IApgCii_DRAW_LINEAR_DIM_SCHEMA.ts";
import { IApgCii_DRAW_ARC_DIM_SCHEMA } from "../schemas/IApgCii_DRAW_ARC_DIM_SCHEMA.ts";
import { IApgCii_DRAW_ANNOTATION_SCHEMA } from "../schemas/IApgCii_DRAW_ANNOTATION_SCHEMA.ts";


export const ApgCiiValidators = [
    {
        type: eApgCiiInstructionTypes.TYPES, // Ok 2023/01/04
        jsonSchema: eApgCii_TYPES_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.INSTRUCTION, // Ok 2023/01/04
        jsonSchema: IApgCii_INSTRUCTION_SCHEMA,
        dependencies: [eApgCii_TYPES_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.CAD_FILL_STYLE, // Ok 2023/02/27
        jsonSchema: IApgCad_FILL_STYLE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.CAD_STROKE_STYLE, // Ok 2023/02/27
        jsonSchema: IApgCad_STROKE_STYLE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.CAD_TEXT_STYLE,
        jsonSchema: IApgCad_TEXT_STYLE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.CAD_LIN_DIM_TYPES, // Ok 2023/03/04
        jsonSchema: eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.CAD_ARC_DIM_TYPES, // Ok 2023/03/04
        jsonSchema: eApgCad_ARC_DIMENSION_TYPES_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.CAD_LIN_DIM_OPTIONS, // Ok 2023/03/04
        jsonSchema: IApgCad_LINEAR_DIM_OPTIONS_SCHEMA,
        dependencies: [eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.CAD_ARC_DIM_OPTIONS, // Ok 2023/03/04
        jsonSchema: IApgCad_ARC_DIM_OPTIONS_SCHEMA,
        dependencies: [eApgCad_ARC_DIMENSION_TYPES_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.SET_NAME,
        jsonSchema: IApgCii_SET_NAME_SCHEMA,
    },
    // {
    //   type: eApgCadInstructionTypes.SET_VIEWBOX,
    //   schema: 'IApgCadSvgInsSetViewbox'
    // }, {
    //   type: eApgCadInstructionTypes.SET_AXIS,
    //   schema: 'IApgCadSvgInsSetAxis'
    // }, {
    //   type: eApgCadInstructionTypes.SET_BACKGROUND,
    //   schema: 'IApgCadSvgInsSetBackground'
    // },
    {
        type: eApgCiiInstructionTypes.NEW_FILL_STYLE, // Ok 2023/01/21
        jsonSchema: IApgCii_NEW_FILL_STYLE_SCHEMA,
        dependencies: [IApgCad_FILL_STYLE_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.NEW_STROKE_STYLE, // Ok 2023/01/21
        jsonSchema: IApgCii_NEW_STROKE_STYLE_SCHEMA,
        dependencies: [IApgCad_STROKE_STYLE_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.NEW_TEXT_STYLE, // Ok 2023/01/21
        jsonSchema: IApgCii_NEW_TEXT_STYLE_SCHEMA,
        dependencies: [IApgCad_TEXT_STYLE_SCHEMA_ID]
    },
    {
        type: eApgCiiInstructionTypes.PUSH_LAYER, // Ok 2023/01/21
        jsonSchema: IApgCii_PUSH_LAYER_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.POP_LAYER, // Ok 2023/01/21
        jsonSchema: IApgCii_POP_LAYER_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.GROUP_BEGIN, // Ok 2023/01/21
        jsonSchema: IApgCii_GROUP_BEGIN_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.GROUP_END, // Ok 2023/01/21
        jsonSchema: IApgCii_GROUP_END_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.NEW_POINT, // Ok 2023/01/04
        jsonSchema: IApgCii_NEW_POINT_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA, // Ok 2023/01/04
        jsonSchema: IApgCii_NEW_POINT_DELTA_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.MOVE_POINT_DELTA, // Ok 2023/02/26
        jsonSchema: IApgCii_MOVE_POINT_DELTA_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POINTS,  // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_POINTS_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ALL_POINTS, // Ok 2023/01/04
        jsonSchema: IApgCii_DRAW_ALL_POINTS_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ARC, // Ok 2023/01/15
        jsonSchema: IApgCii_DRAW_ARC_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_CIRCLE, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_CIRCLE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_LINE, // Ok 2023/01/04
        jsonSchema: IApgCii_DRAW_LINE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POLYLINE, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_POLYLINE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POLYGON, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_POLYGON_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_REGULAR_POLYGON, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_REGULAR_POLIGON_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_RECTANGLE_POINTS, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_RECTANGLE_POINTS_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES, // Ok 2023/01/06
        jsonSchema: IApgCii_DRAW_RECTANGLE_SIZES_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN, // 
        jsonSchema: IApgCii_DRAW_PATH_BEGIN_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_MOVE, // 
        jsonSchema: IApgCii_DRAW_PATH_MOVE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_LINE, // 
        jsonSchema: IApgCii_DRAW_PATH_LINE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_ARC, // 
        jsonSchema: IApgCii_DRAW_PATH_ARC_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE, // 
        jsonSchema: IApgCii_DRAW_PATH_CLOSE_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_END, // 
        jsonSchema: IApgCii_DRAW_PATH_END_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_GROUP,
        jsonSchema: IApgCii_DRAW_GROUP_SCHEMA,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_LIN_DIM, // Ok 2023/01/15
        jsonSchema: IApgCii_DRAW_LINEAR_DIM_SCHEMA,
        dependencies: [
            eApgCad_LINEAR_DIMENSION_TYPES_SCHEMA_ID,
            IApgCad_LINEAR_DIM_OPTIONS_SCHEMA_ID,
        ]
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ARC_DIM, // Ok 2023/01/15
        jsonSchema: IApgCii_DRAW_ARC_DIM_SCHEMA,
        dependencies: [
            eApgCad_ARC_DIMENSION_TYPES_SCHEMA_ID,
            IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID,
        ]
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ANNOTATION, // Ok 2023/01/15
        jsonSchema: IApgCii_DRAW_ANNOTATION_SCHEMA,
    },
    //{
    //   type: eApgCadInstructionTypes.DRAW_TEXT,
    //   schema: 'IApgCadSvgInsDrawText'
    // },
    //{
    //   type: eApgCadInstructionTypes.DRAW_NAME,
    //   schema: 'IApgCadSvgInsDrawName'
    //}
];
