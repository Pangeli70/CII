/** -----------------------------------------------------------------------
 * @module [CII/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/28 Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts, StdPath } from "../../deps.ts";

import { eApgCiiTests } from "../../test/src/enums/eApgCiiTests.ts";


type Enum = { [key: number | string]: string | number };

const JSON_INSTRUCTIONS_PATH = StdPath.resolve('./test/data/json');

interface IApgMultilevelMenu {
    title: string;
    links: {
        href: string;
        caption: string;
    }[];
}


export class ApgCiiHomeResource extends Drash.Resource {

    public override paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {


        const menu: IApgMultilevelMenu[] = [];

        const homeMenu = this.#getHomeMenu();
        menu.push(homeMenu);
        
        const instructionsTsMenu = this.#getMenuFromEnum(eApgCiiTests);
        menu.push(instructionsTsMenu);

        const instructionsJsonMenu = await this.#getMenuFromJson();
        menu.push(instructionsJsonMenu);

        const templateData = {
            site: {
                name: "Apg-Cii",
                title: "Apg Cad Instructions Interpreter"
            },
            page: {
                title: "Home",
                toolbar: "",
                released: "2023/01/28"
            },
            menu
        };

        const html = await Tng.ApgTngService.Render("/home.html", templateData) as string;

        response.html(html);

    }

    #getHomeMenu() {

        const r: IApgMultilevelMenu =
        {
            title: 'Main menu',
            links: []
        }
        r.links.push({
            href: "/devlog",
            caption: 'Development log'
        });
        r.links.push({
            href: "https://apg-dir.deno.dev/",
            caption: 'Apg Deno Deploy Dir'
        });
        return r;
    }

    #getMenuFromEnum(aenum: Enum) {
        const r: IApgMultilevelMenu =
        {
            title: 'Typescript instructions tests',
            links: []
        }
        const svgTests = Uts.ApgUtsEnum.StringValues(aenum);

        for (const test of svgTests) {
            r.links.push({
                href: "/test/" + test,
                caption: test
            });
        }
        return r;
    }

    async #getMenuFromJson() {
        const r: IApgMultilevelMenu =
        {
            title: 'Json instructions tests',
            links: []
        }
        for await (const dirEntry of Deno.readDir(JSON_INSTRUCTIONS_PATH)) {
            if (dirEntry.isFile) {

                if (dirEntry.name.endsWith('.json')) {
                    const file = StdPath.normalize(JSON_INSTRUCTIONS_PATH + "/" + dirEntry.name);
                    const fileContent = await Deno.readTextFile(file);
                    try {
                        const test = JSON.parse(fileContent);
                        r.links.push({
                            href: "/test/" + dirEntry.name,
                            caption: test.description
                        });
                    }
                    catch (error) {
                        throw error
                    }
                }

            }
        }
        return r;
    }
}