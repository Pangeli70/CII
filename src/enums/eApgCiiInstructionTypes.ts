/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.0.1 [APG 2017/10/27]
 * @version 0.5.0 [APG 2018/11/25]
 * @version 0.8.0 [APG 2022/05/21] Porting to Deno
 * @version 0.9.2 [APG 2022/11/30] Github beta
 * @version 0.9.3 [APG 2022/12/18] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

/** Apg Cad Istruction Names */
export enum eApgCiiInstructionTypes {

  TYPES = "TYPES",
  GENERIC = "GENERIC",

  CAD_FILL_STYLE = "CAD_FILL_STYLE",
  CAD_STROKE_STYLE = "CAD_STROKE_STYLE",
  CAD_TEXT_STYLE = "CAD_TEXT_STYLE",

  SET_NAME = "SET_NAME", // S : Schema ok + I: Implementation Ok
  SET_VIEWBOX = "SET_VIEWBOX",
  SET_CARTESIAN = "SET_AXIS",
  SET_BACKGROUND = "SET_BACKGROUND",

  NEW_STROKE_STYLE = "NEW_STROKE_STYLE", // S
  NEW_FILL_STYLE = "NEW_FILL_STYLE", // S
  NEW_TEXT_STYLE = "NEW_TEXT_STYLE",  // S
  NEW_PATTERN = "NEW_PATTERN",  
  NEW_GRADIENT = "NEW_GRADIENT", 
  NEW_TEXTURE = "NEW_TEXTURE", 

  NEW_LAYER = "NEW_LAYER", // unused
  PUSH_LAYER = "PUSH_LAYER",  // S + I
  POP_LAYER = "POP_LAYER",  // S + I
  NEW_GROUP = "NEW_GROUP", // S + I
  // SET_GROUP = "SET_GROUP", // S
  CLOSE_GROUP = "CLOSE_GROUP", // S + I

  NEW_POINT = "NEW_POINT", // S + I
  NEW_POINT_DELTA = "NEW_POINT_DELTA", // S + I
  MOVE_POINT_DELTA = "MOVE_POINT_DELTA", 

  DRAW_POINTS = "DRAW_POINTS", // S + I
  DRAW_ALL_POINTS = "DRAW_ALL_POINTS", // S + I
  DRAW_LINE = "DRAW_LINE", // S + I
  DRAW_POLYLINE = "DRAW_POLYLINE", // S + I
  DRAW_POLYGON = "DRAW_POLYGON", // S + I
  DRAW_REGULAR_POLYGON = "DRAW_REGULAR_POLYGON", // S + I
  DRAW_RECTANGLE_POINTS = "DRAW_RECTANGLE_POINTS", // S + I
  DRAW_RECTANGLE_SIZES = "DRAW_RECTANGLE_SIZE", // S + I
  DRAW_CIRCLE = "DRAW_CIRCLE", // S + I
  DRAW_ARC = "DRAW_ARC", // S + I // TODO test

  DRAW_PATH_BEGIN = "DRAW_PATH_BEGIN",// S + I
  DRAW_PATH_MOVE = "DRAW_PATH_MOVE",// S + I
  DRAW_PATH_LINE = "DRAW_PATH_LINE",// S + I
  DRAW_PATH_ARC = "DRAW_PATH_ARC",// S + I
  DRAW_PATH_CLOSE = "DRAW_PATH_CLOSE",// S + I
  DRAW_PATH_END = "DRAW_PATH_END",// S + I

  DRAW_TEXT = "DRAW_TEXT",
  DRAW_NAME = "DRAW_NAME",
  DRAW_IMAGE = "DRAW_IMAGE",

  DRAW_ANNOTATION = "DRAW_ANNOTATION", // S + I 
  DRAW_LIN_DIM = "DRAW_LIN_DIM", // S + I // TODO test
  DRAW_ARC_DIM = "DRAW_ARC_DIM",
  DRAW_ANG_DIM = "DRAW_ANG_DIM",


  BUILD_BLOCK = "BUILD_BLOCK",
  DRAW_GROUP = "DRAW_GROUP", // S // TODO remove? Change in draw Block?
  DRAW_ARRAY = "DRAW_ARRAY",
}
