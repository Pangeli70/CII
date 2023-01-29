/** -----------------------------------------------------------------------
 * @module [CII/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.4 [APG 2023/01/28 Deno Deploy Beta
 * @version 0.9.5 [APG 2023/01/28] Moved from CAD to CII
 * -----------------------------------------------------------------------
 */
import { Drash, Tng, Uts } from "../../deps.ts";

import { eApgCiiTests } from "../../test/src/enums/eApgCiiTests.ts";


type Enum = { [key: number | string]: string | number };

export class ApgCiiHomeResource extends Drash.Resource {

    public override paths = ["/"];

    public async GET(_request: Drash.Request, response: Drash.Response) {


        const menu: any[] = [];
        const insSetGroupsMenu = this.getMenuFromEnum(eApgCiiTests);
        menu.push(insSetGroupsMenu);


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
            title: 'Instructions Sets',
            links: []
        }
        const svgTests = Uts.ApgUtsEnum.StringValues(aenum);

        for (const test of svgTests) {
            svgMenu.links.push({
                href: "/test/" +  test,
                caption: test
            });
        }
        return svgMenu;
    }
}
