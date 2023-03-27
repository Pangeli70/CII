/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/03/04]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv, Cad } from '../../deps.ts'

export const eApgCad_DIMENSION_POSITIONS_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + "eApgCad_DimensionPositions";

export const eApgCad_DIMENSION_POSITIONS_SCHEMA_ID_REF =
    eApgCad_DIMENSION_POSITIONS_SCHEMA_ID + "#/$defs/enumType";

const rawSchema: Jsv.IApgJsvEnum = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: eApgCad_DIMENSION_POSITIONS_SCHEMA_ID,
    $defs: {
        enumType: {
            type: "integer",
            enum: Uts.ApgUtsEnum.NumericValues(Cad.eApgCadDimensionPositions)
        },
    }
}

export const eApgCad_DIMENSION_POSITIONS_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvEnum;