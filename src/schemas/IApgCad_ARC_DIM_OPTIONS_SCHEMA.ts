/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/03/04]
 * @version 0.9.6 [APG 2023/03/06] Updated to JSV 0.9.6
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'
import { eApgCad_ARC_DIMENSION_TYPES_SCHEMA_ID_REF } from "./eApgCad_ARC_DIMENSION_TYPES_SCHEMA.ts";

export const IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_ArcDimOptions';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_ARC_DIM_OPTIONS_SCHEMA_ID,
    type: 'object',
    properties: {
        type: {
            $ref: eApgCad_ARC_DIMENSION_TYPES_SCHEMA_ID_REF
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'type'
    ]
};

export const IApgCad_ARC_DIM_OPTIONS_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;