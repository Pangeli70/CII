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
    BASIC = "Basic",
    DIMS_AND_ANNOTS = "Dims as annotations",
    TC_MEAS_ON_SITE_1 = "Measures taken on site side view",
    TC_PED_DOORS_1 = "Doors on side view",
    STRUCT_BEAMS = "Structural beams",
    SLIDING_CURVE = "Sliding curve",
    SLIDING_SYSTEM = "Sliding system",
    HOLE_PANEL = "Hole panel"
}