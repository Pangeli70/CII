/** -----------------------------------------------------------------------
 * @module [CII] Cad Instruction Interpreter
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.5 [APG 2023/03/04]
 * @version 0.9.6 [APG 2023/03/06]
 * ------------------------------------------------------------------------
 */
import { Uts } from "./deps.ts";


export const ApgCiiDevLog: Uts.IApgUtsDevlog = {
    todo: [
        {
            milestone: "TOOLS",
            description: "Logger, Profiler, Instructions, Cad Status ",
            activities: [
                "Profiler performance graph",
                "Debug logger for JSON circular stringification"
            ]
        },
        {
            milestone: "VIEWER",
            description: "Interactive svg viewer",
            activities: [
                "Fullscreen button",
                "Register partials in TNG deploy"
            ]
        },
        {
            milestone: "PRIMITIVES",
            description: "Basic CAD primitives instructions",
            activities: [
                "Further test all dimensions types",
            ]
        },
        {
            milestone: "JSON",
            description: "Read instructions from JSON file",
            activities: [
                "@1 Migrate to ApgJsv 0.9.6",
            ]
        },
        {
            milestone: "TC_MTOS",
            description: "Technical closures measures taken on site",
            activities: [
                "CAD setup to define viewport",
                "Investigate aligned linear dimension bug",
                "Dimensions on front inside view test",
                "Dimensions on top view test",
                "Dimensions on front outside view test",
            ]
        },
        {
            milestone: "TC_SDSS",
            description: "Technical closures sectional doors sliding system",
            activities: [
                "Full sliding system test",
            ]
        },
        {
            milestone: "TC_SECo",
            description: "Technical closures sectional doors coat",
            activities: [
                "Rib patterns test",
                "Block pattern test",
                "Rouded corners inspection window test",
                "Panel grayscale textures for embossing test",
                "Panel textures test",
                "Full coat with gaskets"
            ]
        },
        {
            milestone: "DEVLOG",
            description: "Development log",
            activities: [
                "Create an alternative view todo/done per milestone instead than done per date",
            ]
        },
        {
            milestone: "HELP",
            description: "Use instructions JSON schemas to create interactive help",
            activities: [
                "Add descriptions to JSON schema fields",
                "TNG page to list instructions",
                "Drash resource for page with list of instructions",
                "TNG partials to display schema data",
                "TNG page to display schema partial",
                "Drash page for instruction details",
            ]
        },
        {
            milestone: "GUI",
            description: "Use instructions JSON schemas to create interactive UI",
            activities: [
                "TNG page to list create and edit  instructions based on json schemas",
                "Drash resource to compile instructions",
                "TNG partials for instruction edit Dialog",
            ]
        },
    ],


    done: [
        {
            date: "20230306",
            milestone: "TOOLS",
            version: "0.9.6",
            description: "Logger, Profiler, Instructions, Cad Status ",
            activities: [
                "Added validation logger to main logger",
            ]
        },
        {
            date: "20230306",
            milestone: "JSON",
            version: "0.9.6",
            description: "Read instructions from JSON file",
            activities: [
                "Started migration to ApgJsv 0.9.6",
            ]
        },
        {
            date: "20230304",
            milestone: "DEVLOG",
            version: "0.9.5",
            description: "Develompment log",
            activities: [
                "Interfaces for things to do and things done",
                "Added interfaces to UTS module",
                "Data file for CII module",
                "TNG partials to display devlog data",
                "TNG page and Drash resource to display data",
                "New Homepage Drash resource with updated menu"
            ]
        },
        {
            date: "20230303",
            milestone: "TC_SECo",
            version: "0.9.5",
            description: "Technical closures sectional doors coat",
            activities: [
                "Inspection windows",
                "Rotate svg element using pivot"
            ]
        },
        {
            date: "20230302",
            milestone: "TC_SECo",
            version: "0.9.5",
            description: "Technical closures sectional doors coat",
            activities: [
                "Path drawing strategy",
                "Panels with holes",
            ]
        },
        {
            date: "20230220",
            milestone: "TC_SDSS",
            version: "0.9.5",
            description: "Technical closures sectional doors sliding system",
            activities: [
                "Curves",
                "Sliding tracks",
            ]
        },
        {
            date: "20230125",
            milestone: "JSON",
            version: "0.9.5",
            description: "Read instructions form JSON file",
            activities: [
                "Load file",
                "Compile and interpret instructions to build SVG",
            ]
        },
        {
            date: "20230120",
            milestone: "TC_MTOS",
            version: "0.9.5",
            description: "Technical closures measures taken on site",
            activities: [
                "Dimensions on side view",
            ]
        },
        {
            date: "20230118",
            milestone: "TOOLS",
            version: "0.9.5",
            description: "Logger, Profiler, Instructions, Cad Status ",
            activities: [
                "Improved logger partial",
                "Improved Instructions partial",
                "Improved Cad Status partial"
            ]
        },
        {
            date: "20230115",
            milestone: "VIEWER",
            version: "0.9.5",
            description: "Interactive svg viewer",
            activities: [
                "Svg PanZomm Toolbar",
                "Layers dialog",
                "Settings dialog",
            ]
        },

        {
            date: "20230110",
            milestone: "PRIMITIVES",
            version: "0.9.5",
            description: "Basic CAD primitives instructions",
            activities: [
                "Basic shape instructions test",
                "Dimensions ad annotations test",
            ]
        },
    ]
}