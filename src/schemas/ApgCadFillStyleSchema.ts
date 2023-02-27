/** -----------------------------------------------------------------------
 * @module [CII+JSV]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/02/26]
 * -----------------------------------------------------------------------
 */
import { Uts, Jsv } from '../../deps.ts'

const rawSchema: Jsv.IApgJsvInterface = {
    $schema: 'http://json-schema.org/schema#',
    $id: 'IApgCad_FillStyle#',
    type: 'object',
    properties: {
        color: {
            type: 'string'
        },
        opacity: {
            type: "number",
            minimum: 0,
            maximum: 1,
        }
    },
    additionalProperties: false,
    allErrors: true,
    required: [
        'color', 'opacity'
    ]

};

export const ApgCad_FillStyleSchema = Uts.ApgUtsObj.DeepFreeze(rawSchema) as Jsv.IApgJsvInterface;