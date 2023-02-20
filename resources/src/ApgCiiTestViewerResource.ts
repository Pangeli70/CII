/** -----------------------------------------------------------------------
 * @module [Cad/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/04] Deno Deploy Beta
 * @version 0.9.5 [APG 2023/02/12] Improving Beta
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts, StdCookie, Cad, Lgr, Rst } from "../../deps.ts";

import { IApgCiiInstruction } from "../../src/interfaces/IApgCiiInstruction.ts";
import { ApgCiiTester } from "../../test/src/classes/ApgCiiTester.ts";
import { eApgCiiTests } from "../../test/src/enums/eApgCiiTests.ts";

enum eResParams {
    PATH_TEST = 'test',
    QUERY_BLACK = 'black',
    QUERY_GRID = 'grid',
    QUERY_CART = 'cart',
    QUERY_RANDOM = 'random',
    QUERY_DEBUG = 'debug',
    COOKIE = 'params'
}



export class ApgCiiTestViewerResource extends Drash.Resource {

    public override paths = [`/test/:${eResParams.PATH_TEST}`];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const params = this.#getParameters(request);

        const options: Cad.IApgCadSvgOptions = {
            name: params.name,
            blackBack: params.blackBack,
            gridMode: params.gridMode,
            cartesiansMode: params.cartesianMode,
            debug: params.debug
        }

        const cad = await Cad.ApgCadSvg.New(options);

        let svgContent = "";
        let loggerResult: Rst.IApgRst = { ok: true };
        let instructions: IApgCiiInstruction[] = [];
        let cadState: any = {};
        const { svg, logger, test } = await ApgCiiTester.RunTest(cad, params.name as unknown as eApgCiiTests);
        svgContent = svg;
        loggerResult = this.#loggerResult(logger);
        instructions = test!.instructions;
        cadState = cad.getState();

        await this.#saveSvgIfNotIsDeploy(params, svgContent);

        const templateData = {
            site: {
                name: "Apg-Cii",
                title: "Apg Cad Instructions Interpreter Tests"
            },
            page: {
                title: "Viewer",
                menu: [],
                toolbar: "",
                released: "2023/01/28"
            },
            svgContent,
            cadState,
            params,
            loggerResult,
            loggerEvents: loggerResult.payload!.data,
            instructions
        };

        const html = await Tng.ApgTngService.Render("/svg_viewer.html", templateData, false, false) as string;

        const cookie: StdCookie = {
            name: eResParams.COOKIE,
            value: this.#encodeCookieObject(params),
            path: '/'
        };

        response.setCookie(cookie);
        response.html(html);

    }


    #encodeCookieObject(aobject: unknown) {
        const json = JSON.stringify(aobject)

        const r = json
            .replaceAll('"', "'")
            .replaceAll(' ', "SPC")
            .replaceAll(',', "CMM")
            .replaceAll(';', "SMC")
            .replaceAll('/', "SLH")
        return r;
    }

    #decodeCookieObject(aencoded: string) {

        const json = aencoded
            .replaceAll("'", '"')
            .replaceAll("SPC", ' ')
            .replaceAll("CMM", ',')
            .replaceAll("SMC", ';')
            .replaceAll("SLH", '/')
        try {
            const r = JSON.parse(json)
            return r;
        }
        catch (err) {
            return err;
        }
    }

    async #getCadTestResult(params: Cad.Test.IApgCadTestParameters) {

        let cad: Cad.ApgCadSvg | undefined;

        switch (params.type) {

        }
        return cad;
    }

    async #saveSvgIfNotIsDeploy(params: Cad.Test.IApgCadTestParameters, svgContent: string) {
        const isDenoDeploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
        if (!isDenoDeploy) {
            await Deno.writeTextFile(Deno.cwd() + "/test/output/" + params.type + "_" + params.name + ".svg", svgContent);
        }
    }

    #getParameters(request: Drash.Request) {

        let paramsCookie = {} as Cad.Test.IApgCadTestParameters;
        const rawParamsCookie = request.getCookie(eResParams.COOKIE);
        if (rawParamsCookie) {
            paramsCookie = this.#decodeCookieObject(rawParamsCookie) as Cad.Test.IApgCadTestParameters
            console.log(paramsCookie);
        }

        const rawTestName = request.pathParam(eResParams.PATH_TEST)!;

        const rawBlackBack = request.queryParam(eResParams.QUERY_BLACK);
        let blackBack = false;
        if (rawBlackBack == undefined) {
            if (paramsCookie.blackBack != undefined) {
                blackBack = paramsCookie.blackBack;
            }
        }
        else {
            blackBack = Uts.ApgUtsIs.IsTrueish(rawBlackBack)
        }

        const rawRandom = request.queryParam(eResParams.QUERY_RANDOM);
        let random = false;
        if (rawRandom == undefined) {
            if (paramsCookie.random != undefined) {
                random = paramsCookie.random;
            }
        }
        else {
            random = Uts.ApgUtsIs.IsTrueish(rawRandom)
        }

        const rawDebug = request.queryParam(eResParams.QUERY_DEBUG);
        let debug = false;
        if (rawDebug == undefined) {
            if (paramsCookie.debug != undefined) {
                debug = paramsCookie.debug;
            }
        }
        else {
            debug = Uts.ApgUtsIs.IsTrueish(rawDebug)
        }

        const rawGridMode = request.queryParam(eResParams.QUERY_GRID) as Cad.eApgCadGridMode;
        let gridMode = Cad.eApgCadGridMode.LINES;
        if (rawGridMode == undefined) {
            if (paramsCookie.gridMode != undefined) {
                gridMode = paramsCookie.gridMode;
            }
        }
        else {
            if (Uts.ApgUtsEnum.StringContains(Cad.eApgCadGridMode, rawGridMode)) {
                gridMode = rawGridMode
            }
        }

        const rawCartesianMode = request.queryParam(eResParams.QUERY_CART) as Cad.eApgCadCartesianMode;
        let cartesianMode = Cad.eApgCadCartesianMode.NORMAL;
        if (rawCartesianMode == undefined) {
            if (paramsCookie.gridMode != undefined) {
                cartesianMode = paramsCookie.cartesianMode;
            }
        }
        else {
            if (Uts.ApgUtsEnum.StringContains(Cad.eApgCadCartesianMode, rawCartesianMode)) {
                cartesianMode = rawCartesianMode
            }
        }

        const r: Cad.Test.IApgCadTestParameters = {
            type: "Cii",
            name: rawTestName,
            blackBack,
            random,
            debug,
            gridMode,
            cartesianMode
        };
        console.log(r);
        return r;
    }


    #loggerResult(alogger: Lgr.ApgLgr) {

        const r: Rst.IApgRst = { ok: true };
        const p: string[] = [];

        let hrtDelta = 0;
        let hrtFirst = 0;
        let hrtElapsed = 0;
        let delta = "0.00000";
        let elapsed = "0.00000"
        for (let i = 0; i < alogger.events.length; i++) {
            let logBegin = false;
            let message = "";
            const event = alogger.events[i];

            // timers
            if (i == 0) {
                hrtFirst = event.hrt;
            }
            else {
                hrtDelta = (event.hrt - alogger.events[i - 1].hrt) / 1000;
                delta = hrtDelta.toFixed(5).padStart(6, '0');
                hrtElapsed = (event.hrt - hrtFirst) / 1000;
                elapsed = hrtElapsed.toFixed(5).padStart(6, '0');
            }

            // Detect errors
            if (event.result) {
                if (event.result.message) { 
                    message = event.result.message;
                }
                if (!event.result.ok) {
                    r.ok = false;
                }
                if (message.includes("{")) { 
                    logBegin = true;
                }
            }

            // Develop payload
            let payloadData = "";
            if (
                event.result &&
                event.result.payload &&
                event.result.payload.data
            ) {
                if (
                    typeof (event.result.payload.data) == 'object' ||
                    Array.isArray(event.result.payload.data)
                ) {
                    payloadData = '<br/>' + JSON.stringify(event.result.payload.data);
                }
                else {
                    payloadData = `${event.result.payload.data}`;
                }

            }
            const padding = "  ".repeat(event.depth * 2);
            const depth = event.depth.toString().padStart(3);
     
            const currMethod = (logBegin) ? `${event.className}.${event.method}` : "";
            const index = i.toString().padStart(4, '0');
            const currRow = `${index} ${elapsed} ${delta} ${depth}${padding}${currMethod}${message} ${payloadData}`;
            p.push(currRow);

            if (
                event.result &&
                !event.result.ok &&
                event.result.message
            ) {
                p.push(`<br><span style="color: red;">`);

                const message = Rst.ApgRst.InterpolateMessage(event.result);
                console.log(message);
                p.push(`${padding}${message}`);

                if (
                    event.result.payload &&
                    event.result.payload.data &&
                    (event.result.payload.data as any).errors
                ) {
                    p.push(`<br>`);
                    const dataErrors = JSON.stringify((event.result.payload.data as any).errors);
                    p.push(`${padding}${dataErrors}`);
                }
                p.push(`</span>`);
            }
        }
        r.payload = { signature: 'string[]', data: p }

        return r;
    }
}
