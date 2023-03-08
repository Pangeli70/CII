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
import { eApgCiiInstructionTypes } from "../enums/eApgCiiInstructionTypes.ts";

export const eApgCii_TYPES_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "eApgCii_Types";

export const eApgCii_TYPES_SCHEMA_ID_REF =
    eApgCii_TYPES_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: Jsv.IApgJsvEnum = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: eApgCii_TYPES_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "string",
            enum: Uts.ApgUtsEnum.StringValues(eApgCiiInstructionTypes)
        },
    }
}

export const eApgCii_TYPES_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvEnum;