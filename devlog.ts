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
            description: "Logger, Profiler, Validator, Partials ",
            activities: [
                "Profiler performance graph",
                "Move CII validator service to it's own deploy CIV microservice",
                "Optimize validator warmup time by compling AJV functions upon request"
            ]
        },
        {
            milestone: "VIEWER",
            description: "Interactive svg viewer",
            activities: [
                "Fullscreen button",
                "Enable mouse wheel zoom flag",
                "Register partials in TNG deploy"
            ]
        },
        {
            milestone: "PRIMITIVES",
            description: "Basic CAD primitives instructions",
            activities: [
                "@1 Instructions for new Pattern, Gradient, Block, Texture",
                "@3 Test all dimensions types",
                "Bevel as CAD primitive",
                "Bevel edge as primitive",
                "Bevel path as primitive"
            ]
        },
        {
            milestone: "SETUP",
            description: "Instructions for CAD setup",
            activities: [
                "Set grid",
                "Tester Randomizer",
            ]
        },
        {
            milestone: "DEBUG",
            description: "Improve code and remove bugs",
            activities: [
                "@1 Sliding system test",
                "@2 Logger for JSON circular stringification",
                "@2 Set viewbox",
                "@2 Set background",
                "@2 Set cartesians",
            ]
        },
        {
            milestone: "JSON",
            description: "Read instructions from JSON file",
            activities: [
                "... No further activity",
            ]
        },
        {
            milestone: "TC_MTOS",
            description: "Technical closures measures taken on site",
            activities: [
                "@4 Front inside view test",
                "@4 Top view test",
                "@4 Front outside and inside view test",
            ]
        },
        {
            milestone: "TC_SDSS",
            description: "Technical closures sectional doors sliding system",
            activities: [
                "Random curves",
                "Random full sliding system test",
            ]
        },
        {
            milestone: "TC_SECo",
            description: "Technical closures sectional doors coat",
            activities: [
                "Rib patterns test",
                "Block pattern test",
                "Rounded corners inspection window test",
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
                "Add descriptions and titles to JSON schema fields",
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
            version: "0.9.6",
            date: "20230315",
            milestone: "DEBUG",
            description: "Improve code and remove bugs",
            activities: [
                "Sliding curve with new path instructions",
                "Sliding system with new path instructions",
            ]
        },
        {
            version: "0.9.6",
            date: "20230314",
            milestone: "DEBUG",
            description: "Improve code and remove bugs",
            activities: [
                "Optimize and strengthen svg.path instructions",
                "Create Path cursor instruction",
            ]
        },
        {
            version: "0.9.6",
            date: "20230312",
            milestone: "SETUP",
            description: "Instructions for CAD setup",
            activities: [
                "Set viewbox",
                "Set background",
                "Set cartesians",
                "Tester Randomizer",
            ]
        },
        {
            version: "0.9.6",
            date: "20230312",
            milestone: "PRIMITIVES",
            description: "Basic CAD primitives instructions",
            activities: [
                "Test dimensions types",
            ]
        },
        {
            version: "0.9.6",
            date: "20230310",
            milestone: "TC_MTOS",
            description: "Technical closures measures taken on site",
            activities: [
                "Alpha for Top view test",
                "Alpha for Front outside and inside view test",
            ]
        },
        {
            version: "0.9.6",
            date: "20230308",
            milestone: "TC_MTOS",
            description: "Technical closures measures taken on site",
            activities: [
                "Investigate linear dimension bugs",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "JSON",
            description: "Read instructions from JSON file",
            activities: [
                "Completed migration to ApgJsv 0.9.6",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "TOOLS",
            description: "Logger, Profiler, Instructions, Cad Status ",
            activities: [
                "Added validation logger to main logger",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "JSON",
            description: "Read instructions from JSON file",
            activities: [
                "Started migration to ApgJsv 0.9.6",
            ]
        },
        {
            version: "0.9.5",
            date: "20230304",
            milestone: "DEVLOG",
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
            version: "0.9.5",
            date: "20230303",
            milestone: "TC_SECo",
            description: "Technical closures sectional doors coat",
            activities: [
                "Inspection windows",
                "Rotate svg element using pivot"
            ]
        },
        {
            version: "0.9.5",
            date: "20230302",
            milestone: "TC_SECo",
            description: "Technical closures sectional doors coat",
            activities: [
                "Path drawing strategy",
                "Panels with holes",
            ]
        },
        {
            version: "0.9.5",
            date: "20230220",
            milestone: "TC_SDSS",
            description: "Technical closures sectional doors sliding system",
            activities: [
                "Curves",
                "Sliding tracks",
            ]
        },
        {
            version: "0.9.5",
            date: "20230125",
            milestone: "JSON",
            description: "Read instructions form JSON file",
            activities: [
                "Load file",
                "Compile and interpret instructions to build SVG",
            ]
        },
        {
            version: "0.9.5",
            date: "20230120",
            milestone: "TC_MTOS",
            description: "Technical closures measures taken on site",
            activities: [
                "Dimensions on side view",
            ]
        },
        {
            version: "0.9.5",
            date: "20230118",
            milestone: "TOOLS",
            description: "Logger, Profiler, Instructions, Cad Status ",
            activities: [
                "Improved logger partial",
                "Improved Instructions partial",
                "Improved Cad Status partial"
            ]
        },
        {
            version: "0.9.5",
            date: "20230115",
            milestone: "VIEWER",
            description: "Interactive svg viewer",
            activities: [
                "Svg PanZomm Toolbar",
                "Layers dialog",
                "Settings dialog",
            ]
        },
        {
            version: "0.9.5",
            date: "20230110",
            milestone: "PRIMITIVES",
            description: "Basic CAD primitives instructions",
            activities: [
                "Basic shape instructions test",
                "Dimensions ad annotations test",
            ]
        },
    ]
}