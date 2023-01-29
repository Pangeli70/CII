/** -----------------------------------------------------------------------
 * @module [CII/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/21] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts, Cad } from "../../deps.ts";

import { ApgCiiTester } from "../../test/src/classes/ApgCiiTester.ts";

import { eApgCiiTests } from "../../test/src/enums/eApgCiiTests.ts";


enum eResParams {

    pTEST = 'test',
    qBLACK = 'black',
    qGRID = 'grid',
    qCART = 'cartesian',
    qRANDOM = 'random',
    qDEBUG = 'debug'
}

export class ApgCiiTestViewerResource extends Drash.Resource {

    public override paths = [`/test/:${eResParams.pTEST}`];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const testName = request.pathParam(eResParams.pTEST);

        const rawBlackBack = request.queryParam(eResParams.qBLACK);
        const blackBack = Uts.ApgUtsIs.IsTrueish(rawBlackBack);

        const rawGridMode = request.queryParam(eResParams.qGRID) as Cad.Test.eApgCadTestGridMode;
        const gridMode = (Uts.ApgUtsEnum.StringContains(Cad.Test.eApgCadTestGridMode, rawGridMode)) ?
            rawGridMode :
            Cad.Test.eApgCadTestGridMode.LINES;

        const rawCartesianMode = request.queryParam(eResParams.qCART) as Cad.Test.eApgCadTestCartesianMode;
        const cartesianMode = (Uts.ApgUtsEnum.StringContains(Cad.Test.eApgCadTestCartesianMode, rawCartesianMode)) ?
            rawCartesianMode :
            Cad.Test.eApgCadTestCartesianMode.NORMAL;

        const rawRandom = request.queryParam(eResParams.qRANDOM);
        const random = Uts.ApgUtsIs.IsTrueish(rawRandom);

        const rawDebug = request.queryParam(eResParams.qDEBUG);
        const debug = Uts.ApgUtsIs.IsTrueish(rawDebug);

        let pageMenu: { href: string, caption: string }[] = []
        pageMenu = this.#buildMenu(testName, blackBack, gridMode, cartesianMode, random, debug, pageMenu);

        let svgContent = "";
        let testLogger: any = { hasErrors: false };


                    const { svg, logger } = ApgCiiTester.RunTest(testName as unknown as eApgCiiTests, blackBack, gridMode, debug);
                    svgContent = svg;
                    testLogger = logger;

        await Deno.writeTextFile(Deno.cwd() + "/test/output/" + testName + ".svg", svgContent);

        const templateData = {
            site: {
                name: "Apg-Cii",
                title: "Apg Cad Instructions Interpreter Tests"
            },
            page: {
                title: "Viewer",
                menu: pageMenu,
                toolbar: "",
                released: "2023/01/28"
            },
            menu: [
                {
                    href: "https://apg-cii.deno.dev/",
                    caption: "Cdn",
                    description: "A personal content delivery network on deno deploy with simple cache management."
                }
            ],
            svgContent,
            testLogger
        };

        const html = await Tng.ApgTngService.Render("/svg_viewer.html", templateData) as string;

        response.html(html);

    }



    #buildMenu(
        atestName: string | undefined,
        ablackBack: boolean,
        agridMode: Cad.Test.eApgCadTestGridMode,
        acartesianMode: Cad.Test.eApgCadTestCartesianMode,
        arandom: boolean,
        adebug: boolean,
        apageMenu: { href: string; caption: string; }[]
    ) {

        const root = `/test/${atestName}`;
        const blackFlag = `black=${ablackBack}`;
        const blackFlagInv = `black=${!ablackBack}`;
        const debugFlag = `debug=${adebug}`;
        const debugFlagInv = `debug=${!adebug}`;
        const randomFlag = `random=${arandom}`;
        const randomFlagInv = `random=${!arandom}`;
        const gridFlag = `grid=${agridMode}`;
        const gridFlagInv = `grid=${agridMode == Cad.Test.eApgCadTestGridMode.LINES ? Cad.Test.eApgCadTestGridMode.DOTS : Cad.Test.eApgCadTestGridMode.LINES}`;
        const cartesianFlag = `axis=${acartesianMode}`;
        const cartesianFlagInv = `axis=${acartesianMode == Cad.Test.eApgCadTestCartesianMode.NORMAL ? Cad.Test.eApgCadTestCartesianMode.NONE : Cad.Test.eApgCadTestCartesianMode.NORMAL}`;


        const r = [
            {
                href: `${root}?${blackFlagInv}&${gridFlag}&${cartesianFlag}&${randomFlag}&${debugFlag}`,
                caption: (ablackBack) ? "White" : "Black"
            },
            {
                href: `${root}?${blackFlag}&${gridFlagInv}&${cartesianFlag}&${randomFlag}&${debugFlag}`,
                caption: agridMode == Cad.Test.eApgCadTestGridMode.LINES ? Cad.Test.eApgCadTestGridMode.DOTS : Cad.Test.eApgCadTestGridMode.LINES
            },
            {
                href: `${root}?${blackFlag}&${gridFlagInv}&${cartesianFlag}&${randomFlag}&${debugFlag}`,
                caption: acartesianMode == Cad.Test.eApgCadTestCartesianMode.NORMAL ? Cad.Test.eApgCadTestCartesianMode.NONE : Cad.Test.eApgCadTestCartesianMode.NORMAL
            },
            {
                href: `${root}?${blackFlag}&${gridFlag}&${cartesianFlag}&${randomFlagInv}&${debugFlag}`,
                caption: (arandom) ? "Determ." : "Random"
            },
            {
                href: `${root}?${blackFlag}&${gridFlag}&${cartesianFlag}&${randomFlag}&${debugFlagInv}`,
                caption: (adebug) ? "Standard" : "Debug"
            }
        ];

       
        return apageMenu;
    }
}
