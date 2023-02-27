/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

import { eApgCii_TypesSchema } from "../schemas/eApgCiiTypesSchema.ts";
import { ApgCii_GenericSchema } from "../schemas/ApgCiiGenericSchema.ts";

import { ApgCad_FillStyleSchema } from "../schemas/ApgCadFillStyleSchema.ts";
import { ApgCad_StrokeStyleSchema } from "../schemas/ApgCadStrokeStyleSchema.ts";
import { ApgCad_TextStyleSchema } from "../schemas/ApgCadTextStyleSchema.ts";

import { ApgCii_NewFillStyleSchema } from "../schemas/ApgCiiNewFillStyleSchema.ts";
import { ApgCii_NewStrokeStyleSchema } from "../schemas/ApgCiiNewStrokeStyleSchema.ts";
import { ApgCii_NewTextStyleSchema } from "../schemas/ApgCiiNewTextStyleSchema.ts";


import { ApgCii_SetNameSchema } from "../schemas/ApgCiiSetNameSchema.ts";
import { ApgCii_PopLayerSchema } from "../schemas/ApgCiiPopLayerSchema.ts";
import { ApgCii_PushLayerSchema } from "../schemas/ApgCiiPushLayerSchema.ts";

import { ApgCii_NewPointSchema } from "../schemas/ApgCiiNewPointSchema.ts";
import { ApgCii_NewPointDeltaSchema } from "../schemas/ApgCiiNewPointDeltaSchema.ts";
import { ApgCii_MovePointDeltaSchema } from "../schemas/ApgCiiMovePointDeltaSchema.ts";

import { ApgCii_NewGroupSchema } from "../schemas/ApgCiiNewGroupSchema.ts";
import { ApgCii_NoGroupSchema } from "../schemas/ApgCiiNoGroupSchema.ts";

import { ApgCii_DrawAllPointsSchema } from "../schemas/ApgCiiDrawAllPointsSchema.ts";

import { ApgCii_DrawPointsSchema } from "../schemas/ApgCiiDrawPointsSchema.ts";
import { ApgCii_DrawLineSchema } from "../schemas/ApgCiiDrawLineSchema.ts";
import { ApgCii_DrawPolylineSchema } from "../schemas/ApgCiiDrawPolylineSchema.ts";
import { ApgCii_DrawCircleSchema } from "../schemas/ApgCiiDrawCircleSchema.ts";
import { ApgCii_DrawGroupSchema } from "../schemas/ApgCiiDrawGroupSchema.ts";
import { ApgCii_DrawArcSchema } from "../schemas/ApgCiiDrawArcSchema.ts";
import { ApgCii_DrawRectanglePointsSchema } from "../schemas/ApgCiiDrawRectanglePointsSchema.ts";
import { ApgCii_DrawRectangleSizesSchema } from "../schemas/ApgCiiDrawRectangleSizesSchema.ts";
import { ApgCii_DrawRegularPolygonSchema } from "../schemas/ApgCiiDrawRegularPolygonSchema.ts";
import { ApgCii_DrawPolygonSchema } from "../schemas/ApgCiiDrawPolygonSchema.ts";

import { ApgCii_DrawPathBeginSchema } from "../schemas/ApgCiiDrawPathBeginSchema.ts";
import { ApgCii_DrawPathMoveSchema } from "../schemas/ApgCiiDrawPathMoveSchema.ts";
import { ApgCii_DrawPathLineSchema } from "../schemas/ApgCiiDrawPathLineSchema.ts";
import { ApgCii_DrawPathArcSchema } from "../schemas/ApgCiiDrawPathArcSchema.ts";
import { ApgCii_DrawPathCloseSchema } from "../schemas/ApgCiiDrawPathCloseSchema.ts";
import { ApgCii_DrawPathEndSchema } from "../schemas/ApgCiiDrawPathEndSchema.ts";


import { ApgCii_DrawLinearDimSchema } from "../schemas/ApgCiiDrawLinearDimSchema.ts";
import { ApgCii_DrawArcDimSchema } from "../schemas/ApgCiiDrawArcDimSchema.ts";
import { ApgCii_DrawAnnotationSchema } from "../schemas/ApgCiiDrawAnnotationSchema.ts";





export const ApgCiiValidators = [
    {
        type: eApgCiiInstructionTypes.TYPES, // Ok 2023/01/04
        jsonSchema: eApgCii_TypesSchema,
    },
    {
        type: eApgCiiInstructionTypes.GENERIC, // Ok 2023/01/04
        jsonSchema: ApgCii_GenericSchema,
        dependencies: ['eApgCii_Types']
    },
    {
        type: eApgCiiInstructionTypes.CAD_FILL_STYLE,
        jsonSchema: ApgCad_FillStyleSchema,
    },
    {
        type: eApgCiiInstructionTypes.CAD_STROKE_STYLE,
        jsonSchema: ApgCad_StrokeStyleSchema,
    },
    {
        type: eApgCiiInstructionTypes.CAD_TEXT_STYLE,
        jsonSchema: ApgCad_TextStyleSchema,
    },
    {
        type: eApgCiiInstructionTypes.SET_NAME,
        jsonSchema: ApgCii_SetNameSchema,
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
        jsonSchema: ApgCii_NewFillStyleSchema,
        dependencies: ['IApgCad_FillStyle']
    },
    {
        type: eApgCiiInstructionTypes.NEW_STROKE_STYLE, // Ok 2023/01/21
        jsonSchema: ApgCii_NewStrokeStyleSchema,
        dependencies: ['IApgCad_StrokeStyle']
    },
    {
        type: eApgCiiInstructionTypes.NEW_TEXT_STYLE, // Ok 2023/01/21
        jsonSchema: ApgCii_NewTextStyleSchema,
        dependencies: ['IApgCad_TextStyle']
    },
    {
        type: eApgCiiInstructionTypes.PUSH_LAYER, // Ok 2023/01/21
        jsonSchema: ApgCii_PushLayerSchema,
    },
    {
        type: eApgCiiInstructionTypes.POP_LAYER, // Ok 2023/01/21
        jsonSchema: ApgCii_PopLayerSchema,
    },
    {
        type: eApgCiiInstructionTypes.NEW_GROUP, // Ok 2023/01/21
        jsonSchema: ApgCii_NewGroupSchema,
    },
    {
        type: eApgCiiInstructionTypes.NO_GROUP, // Ok 2023/01/21
        jsonSchema: ApgCii_NoGroupSchema,
    },
    {
        type: eApgCiiInstructionTypes.NEW_POINT, // Ok 2023/01/04
        jsonSchema: ApgCii_NewPointSchema,
    },
    {
        type: eApgCiiInstructionTypes.NEW_POINT_DELTA, // Ok 2023/01/04
        jsonSchema: ApgCii_NewPointDeltaSchema,
    },
    {
        type: eApgCiiInstructionTypes.MOVE_POINT_DELTA, // Ok 2023/02/26
        jsonSchema: ApgCii_MovePointDeltaSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POINTS,  // Ok 2023/01/06
        jsonSchema: ApgCii_DrawPointsSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ALL_POINTS, // Ok 2023/01/04
        jsonSchema: ApgCii_DrawAllPointsSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ARC, // Ok 2023/01/15
        jsonSchema: ApgCii_DrawArcSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_CIRCLE, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawCircleSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_LINE, // Ok 2023/01/04
        jsonSchema: ApgCii_DrawLineSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POLYLINE, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawPolylineSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_POLYGON, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawPolygonSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_REGULAR_POLYGON, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawRegularPolygonSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_RECTANGLE_POINTS, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawRectanglePointsSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_RECTANGLE_SIZES, // Ok 2023/01/06
        jsonSchema: ApgCii_DrawRectangleSizesSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_BEGIN, // 
        jsonSchema: ApgCii_DrawPathBeginSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_MOVE, // 
        jsonSchema: ApgCii_DrawPathMoveSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_LINE, // 
        jsonSchema: ApgCii_DrawPathLineSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_ARC, // 
        jsonSchema: ApgCii_DrawPathArcSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_CLOSE, // 
        jsonSchema: ApgCii_DrawPathCloseSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_PATH_END, // 
        jsonSchema: ApgCii_DrawPathEndSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_GROUP,
        jsonSchema: ApgCii_DrawGroupSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_LIN_DIM, // Ok 2023/01/15
        jsonSchema: ApgCii_DrawLinearDimSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ARC_DIM, // Ok 2023/01/15
        jsonSchema: ApgCii_DrawArcDimSchema,
    },
    {
        type: eApgCiiInstructionTypes.DRAW_ANNOTATION, // Ok 2023/01/15
        jsonSchema: ApgCii_DrawAnnotationSchema,
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
