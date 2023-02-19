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

export class ApgCiiHomeResource extends Drash.Resource {

    public override paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {


        const menu: any[] = [];
        const instructionsTsMenu = this.getMenuFromEnum(eApgCiiTests);
        menu.push(instructionsTsMenu);
        const instructionsJsonMenu = await this.getMenuFromJson();
        menu.push(instructionsJsonMenu);

        const templateData = {
            site: {
                name: "Apg-Cii",
                title: "Directory of the Apg Cad Instructions Interpreter Tests"
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



    private getMenuFromEnum(aenum: Enum) {
        const svgMenu: { title: string, links: { href: string; caption: string; }[] } =
        {
            title: 'TS instructions',
            links: []
        }
        const svgTests = Uts.ApgUtsEnum.StringValues(aenum);

        for (const test of svgTests) {
            svgMenu.links.push({
                href: "/test/" + test,
                caption: test
            });
        }
        return svgMenu;
    }

    private async getMenuFromJson() {
        const svgMenu: { title: string, links: { href: string; caption: string; }[] } =
        {
            title: 'Json instructions',
            links: []
        }
        for await (const dirEntry of Deno.readDir(JSON_INSTRUCTIONS_PATH)) {
            if (dirEntry.isFile) {

                if (dirEntry.name.endsWith('.json')) {
                    const file = StdPath.normalize(JSON_INSTRUCTIONS_PATH + "/" + dirEntry.name);
                    const fileContent = await Deno.readTextFile(file);
                    try {
                        const test = JSON.parse(fileContent);
                        svgMenu.links.push({
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
        return svgMenu;
    }
}