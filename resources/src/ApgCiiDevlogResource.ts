/** -----------------------------------------------------------------------
 * @module [CII/Resources]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/03/04]
 * -----------------------------------------------------------------------
 */
import { Drash, Tng } from "../../deps.ts";
import { ApgCiiDevLog } from "../../devlog.ts";


export class ApgCiiDevlogResource extends Drash.Resource {

    public override paths = ["/devlog"];

    public async GET(_request: Drash.Request, response: Drash.Response) {

        const templateData = {
            site: {
                name: "Apg-Cii",
                title: "Apg Cad Instructions Interpreter"
            },
            page: {
                title: "Development log",
                toolbar: "",
                released: "2023/03/04"
            },
            devlog:  ApgCiiDevLog
        };

        const html = await Tng.ApgTngService.Render("/devlog.html", templateData) as string;

        response.html(html);

    }

}