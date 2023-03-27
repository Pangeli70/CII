/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/18] Moved to its own file
 * -----------------------------------------------------------------------
 */

import { Jsv } from "../../deps.ts";
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";


/** Interface for Cad Entity and Cad Instruction  */
export interface IApgCiiValidator {
    // TODO @2 Make type optional: only for CII instructions not for CAD schemas
    type: eApgCiiInstructionTypes;
    jsonSchema: Jsv.IApgJsvEnum | Jsv.IApgJsvInterface;
    dependencies?: string[];
}