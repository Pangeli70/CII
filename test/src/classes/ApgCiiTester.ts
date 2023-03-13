/** -----------------------------------------------------------------------
 * @module [CII]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/28] Deno Deploy
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * @version 0.9.6 [APG 2023/03/12] Mesures on site top, inside, outside
 * -----------------------------------------------------------------------
*/

import { Lgr, Cad, StdPath } from "../../../deps.ts";
import { ApgCii } from "../../../src/classes/ApgCii.ts";

import { ApgCiiTest_Setup } from "../../data/ApgCiiTest_Setup.ts";
import { ApgCiiTest_DrawingPrimitives } from "../../data/ApgCiiTest_DrawingPrimitives.ts";
import { ApgCiiTest_DimsAndAnnots } from "../../data/ApgCiiTest_DimsAndAnnots.ts";
import { ApgCiiTest_MeasSideView } from "../../data/ApgCiiTest_MeasSideView.ts";
import { ApgCiiTest_MeasTopView } from "../../data/ApgCiiTest_MeasTopView.ts";
import { ApgCiiTest_MeasOutsideView } from "../../data/ApgCiiTest_MeasOutsideView.ts";
import { ApgCiiTest_MeasInsideView } from "../../data/ApgCiiTest_MeasInsideView.ts";
import { ApgCiiTest_PedestrianDoors } from "../../data/ApgCiiTest_PedestrianDoors.ts";
import { ApgCiiTest_StructuralBeams } from "../../data/ApgCiiTest_StructuralBeams.ts";
import { ApgCiiTest_SlidingCurves } from "../../data/ApgCiiTest_SlidingCurves.ts";
import { ApgCiiTest_SlidingSystem } from "../../data/ApgCiiTest_SlidingSystem.ts";
import { ApgCiiTest_PanelsWithHoles } from "../../data/ApgCiiTest_PanelsWithHoles.ts";
import { ApgCiiTest_Coats } from "../../data/ApgCiiTest_Coats.ts";
import { ApgCiiTest_InspectionWindows } from "../../data/ApgCiiTest_InspectionWindows.ts";
import { eApgCiiTests } from "../enums/eApgCiiTests.ts";

import { IApgCiiTest } from "../interfaces/IApgCiiTest.ts";
import { ApgCiiTesterRandomizer } from "./ApgCiiTesterRandomizer.ts";

type IApgCiiTestFn = (rndz: ApgCiiTesterRandomizer) => IApgCiiTest;

export class ApgCiiTester extends Cad.Test.ApgCadBaseTester {

    protected static _ready = false;
    protected static _tests: Map<string, IApgCiiTestFn> = new Map();

    protected static _randomizer = new ApgCiiTesterRandomizer();


    protected static init() {

        this._tests.set(eApgCiiTests.SETUP, ApgCiiTest_Setup);
        this._tests.set(eApgCiiTests.PRIMITIVES, ApgCiiTest_DrawingPrimitives);
        this._tests.set(eApgCiiTests.DIMS_AND_ANNOTS, ApgCiiTest_DimsAndAnnots);
        this._tests.set(eApgCiiTests.TC_MEAS_ON_SITE_SV, ApgCiiTest_MeasSideView);
        this._tests.set(eApgCiiTests.TC_MEAS_ON_SITE_TV, ApgCiiTest_MeasTopView);
        this._tests.set(eApgCiiTests.TC_MEAS_ON_SITE_OV, ApgCiiTest_MeasOutsideView);
        this._tests.set(eApgCiiTests.TC_MEAS_ON_SITE_IV, ApgCiiTest_MeasInsideView);
        this._tests.set(eApgCiiTests.TC_PED_DOORS, ApgCiiTest_PedestrianDoors);
        this._tests.set(eApgCiiTests.TC_STRUCT_BEAMS, ApgCiiTest_StructuralBeams);
        this._tests.set(eApgCiiTests.TC_SLIDING_CURVE, ApgCiiTest_SlidingCurves);
        this._tests.set(eApgCiiTests.TC_SLIDING_SYSTEM, ApgCiiTest_SlidingSystem);
        this._tests.set(eApgCiiTests.TC_HOLE_PANEL, ApgCiiTest_PanelsWithHoles);
        this._tests.set(eApgCiiTests.TC_COAT, ApgCiiTest_Coats);
        this._tests.set(eApgCiiTests.TC_INSP_WINDOW, ApgCiiTest_InspectionWindows);

        this._ready = true;
    }


    static async GetTest(atestName: string) {

        let r: IApgCiiTest;
        if (!this._ready) this.init();

        const fn = this._tests.get(atestName);
        if (fn) {
            r = fn(this._randomizer);
        }
        else {
            // TODO @2 move this const declaration outside from here -- APG 20230115
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
            let _r = insSet.set(test!.instructions);
            await insSet.build();

            this.DrawCartouche(cad);

            svg = cad.svg.render();
        }

        return { svg, logger, test }
    }


}