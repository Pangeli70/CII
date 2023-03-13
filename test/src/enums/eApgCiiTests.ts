/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

/**
 * Groups of instructions for testing
 */
export enum eApgCiiTests { 
    SETUP = "Setup of the CAD evironment",
    PRIMITIVES = "Primitive shapes",
    DIMS_AND_ANNOTS = "Dims as annotations",
    TC_MEAS_ON_SITE_SV = "Measures taken on site side view",
    TC_MEAS_ON_SITE_TV = "Measures taken on site top view",
    TC_MEAS_ON_SITE_OV = "Measures taken on site outside view",
    TC_MEAS_ON_SITE_IV = "Measures taken on site inside view",
    TC_PED_DOORS = "Doors on side view",
    TC_STRUCT_BEAMS = "Structural beams",
    TC_SLIDING_CURVE = "Sliding curve",
    TC_SLIDING_SYSTEM = "Sliding system",
    TC_HOLE_PANEL = "Panel with holes",
    TC_COAT = "Panels and gaskets",
    TC_INSP_WINDOW = "Inspection windows"
}