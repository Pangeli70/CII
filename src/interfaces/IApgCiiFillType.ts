/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/26] 
 * -----------------------------------------------------------------------
*/
import { eApgCiiFillTypes } from "../enums/eApgCiiFillTypes.ts";


/** Data structure to manage different fill styles */
export interface IApgCiiFillType {
    /** Type */
    type: eApgCiiFillTypes;
    name: string;
}