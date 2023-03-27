/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/12]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv, Cad } from '../../deps.ts'

export const eApgCad_CARTESIAN_MODES_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "eApgCad_CartesianModes";

export const eApgCad_CARTESIAN_MODES_SCHEMA_ID_REF =
    eApgCad_CARTESIAN_MODES_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: Jsv.IApgJsvEnum = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: eApgCad_CARTESIAN_MODES_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "string",
            enum: Uts.ApgUtsEnum.StringValues(Cad.eApgCadCartesianMode)
        },
    }
}

export const eApgCad_CARTESIAN_MODES_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvEnum;