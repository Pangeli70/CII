/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.6 [APG 2023/03/18]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'


export const IApgCad_PATH_ARC_OPTIONS_SCHEMA_ID =
    Jsv.ApgJsv_DOMAIN + 'IApgCad_PathArcOptions';

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: Jsv.ApgJsv_DIALECT,
    $id: IApgCad_PATH_ARC_OPTIONS_SCHEMA_ID,
    type: 'object',
    properties: {
        largeArc: {
            type: "boolean"
        },
        clockwise: {
            type: "boolean"
        },
    },
    additionalProperties: false,
    allErrors: true,
    required: []
};

export const IApgCad_PATH_ARC_OPTIONS_SCHEMA = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;