/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
*/

import { Lgr, Cad } from "../../../deps.ts";
import { ApgCii } from "../../../src/classes/ApgCii.ts";

import { ApgCiiTest_01 } from "../../data/ApgCiiTest_01.ts";
import { ApgCiiTest_02 } from "../../data/ApgCiiTest_02.ts";
import { ApgCiiTest_03 } from "../../data/ApgCiiTest_03.ts";
import { ApgCiiTest_04 } from "../../data/ApgCiiTest_04.ts";
import { ApgCiiTest_05 } from "../../data/ApgCiiTest_05.ts";

import { IApgCiiTest } from "../interfaces/IApgCiiTest.ts";

export class ApgCiiTester extends Cad.Test.ApgCadBaseTester {

    protected static _ready = false;
    protected static _tests: Map<string, IApgCiiTest> = new Map();

    protected static init() {

        this._tests.set(ApgCiiTest_01.name, ApgCiiTest_01);
        this._tests.set(ApgCiiTest_02.name, ApgCiiTest_02);
        this._tests.set(ApgCiiTest_03.name, ApgCiiTest_03);
        this._tests.set(ApgCiiTest_04.name, ApgCiiTest_04);
        this._tests.set(ApgCiiTest_05.name, ApgCiiTest_05);
        this._ready = true;
    }


    static GetTest(atestName: string) {

        if (!this._ready) this.init();

        return this._tests.get(atestName);
    }


    static RunTest(
        aname: string,
        isBlackBack = false,
        agridMode = Cad.Test.eApgCadTestGridMode.LINES,
        aisDebug = false,
    ) {

        if (!this._ready) this.init();

        const isDotGrid = agridMode == Cad.Test.eApgCadTestGridMode.DOTS;
        const cad = new Cad.ApgCadSvg(isBlackBack, isDotGrid, aisDebug);
        cad.svg.title = `Test instructions set`;
        cad.svg.description = "Apg Svg Cad";

        const logger = new Lgr.ApgLgr('Instructions set');
        const test = this.GetTest(aname);
        // TODO @4 APG 20221228 Test here for undefined
        const insSet = new ApgCii(logger, cad, test!.instructions);
        insSet.build();
        this.DrawCartouche(cad);
        this.Gui(cad);

        const svg = cad.svg.render();
        return { svg, logger }
    }


}