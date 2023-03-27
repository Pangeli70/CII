/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/18]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv, Cad } from '../../deps.ts'

export const eApgCad_GRID_MODES_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "eApgCad_GridModes";

export const eApgCad_GRID_MODES_SCHEMA_ID_REF =
    eApgCad_GRID_MODES_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: Jsv.IApgJsvEnum = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: eApgCad_GRID_MODES_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "string",
            enum: Uts.ApgUtsEnum.StringValues(Cad.eApgCadGridMode)
        },
    }
}

export const eApgCad_GRID_MODES_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvEnum;