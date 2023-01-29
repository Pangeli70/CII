/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */

import { IApgCiiInstruction } from "../../../src/interfaces/IApgCiiInstruction.ts";
import { eApgCiiTests } from "../enums/eApgCiiTests.ts";

export interface IApgCiiTest { 
    name: eApgCiiTests;
    description: string;
    instructions: IApgCiiInstruction[]
}