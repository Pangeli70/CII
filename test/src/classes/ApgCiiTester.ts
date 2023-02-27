/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
*/

import { Lgr, Cad, StdPath } from "../../../deps.ts";
import { ApgCii } from "../../../src/classes/ApgCii.ts";

import { ApgCiiTest_01 } from "../../data/ApgCiiTest_01.ts";
import { ApgCiiTest_02 } from "../../data/ApgCiiTest_02.ts";
import { ApgCiiTest_03 } from "../../data/ApgCiiTest_03.ts";
import { ApgCiiTest_04 } from "../../data/ApgCiiTest_04.ts";
import { ApgCiiTest_05 } from "../../data/ApgCiiTest_05.ts";
import { ApgCiiTest_06 } from "../../data/ApgCiiTest_06.ts";
import { ApgCiiTest_07 } from "../../data/ApgCiiTest_07.ts";
import { ApgCiiTest_08 } from "../../data/ApgCiiTest_08.ts";
import { eApgCiiTests } from "../enums/eApgCiiTests.ts";

import { IApgCiiTest } from "../interfaces/IApgCiiTest.ts";

type IApgCiiTestFn = () => IApgCiiTest;
export class ApgCiiTester extends Cad.Test.ApgCadBaseTester {

    protected static _ready = false;
    protected static _tests: Map<string, IApgCiiTestFn> = new Map();


    protected static init() {

        this._tests.set(eApgCiiTests.BASIC, ApgCiiTest_01);
        this._tests.set(eApgCiiTests.DIMS_AND_ANNOTS, ApgCiiTest_02);
        this._tests.set(eApgCiiTests.TC_MEAS_ON_SITE_1, ApgCiiTest_03);
        this._tests.set(eApgCiiTests.TC_PED_DOORS_1, ApgCiiTest_04);
        this._tests.set(eApgCiiTests.STRUCT_BEAMS, ApgCiiTest_05);
        this._tests.set(eApgCiiTests.SLIDING_CURVE, ApgCiiTest_06);
        this._tests.set(eApgCiiTests.SLIDING_SYSTEM, ApgCiiTest_07);
        this._tests.set(eApgCiiTests.HOLE_PANEL, ApgCiiTest_08);

        this._ready = true;
    }


    static async GetTest(atestName: string) {

        let r: IApgCiiTest;
        if (!this._ready) this.init();

        let fn = this._tests.get(atestName);
        if (fn) {
            r = fn();
        }
        else {
            // TODO @2 move this const declaration outside from here
            const JSON_INSTRUCTIONS_PATH = StdPath.resolve('./test/data/json');
            const file = StdPath.normalize(JSON_INSTRUCTIONS_PATH + "/" + atestName);
            const fileContent = await Deno.readTextFile(file);
            try {
                r = JSON.parse(fileContent) as IApgCiiTest;
            }
            catch (_error) {
                r = {
                    name: atestName,
                    description: 'Error parsing instructions',
                    instructions: []
                };
            }
        }

        return r;
    }


    static async RunTest(
        cad: Cad.ApgCadSvg,
        aname: string
    ) {

        cad.svg.title = aname;
        cad.svg.description = "Apg Svg Cad Instr. Interp.";

        const logger = new Lgr.ApgLgr('Instructions set');
        const test = await this.GetTest(aname);

        let svg = "";

        if (test) {

            const insSet = new ApgCii(logger, cad)
            let r = insSet.set(test!.instructions);
            insSet.build();

            this.DrawCartouche(cad);

            svg = cad.svg.render();
        }

        return { svg, logger, test }
    }


}