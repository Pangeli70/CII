/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/26] Github Beta
 * @version 0.9.4 [APG 2023/01/07] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
* -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

const rawSchema: Jsv.IApgJsvEnum = {
    $schema: "http://json-schema.org/schema#",
    $id: "eApgCii_Types#",
    definitions: {
        enumType: {
            type: "string",
            enum: Uts.ApgUtsEnum.StringValues(eApgCiiInstructionTypes)
        },
    }
}


export const eApgCii_TypesSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvEnum;