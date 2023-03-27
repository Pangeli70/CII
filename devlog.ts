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
                "Log and profile since the Drash request",
                "Optimize validator warmup time by compling AJV functions upon request"
            ]
        },
        {
            milestone: "VIEWER",
            description: "Interactive svg viewer",
            activities: [
                "Rebuild button if test supports random",
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
                "@2 implement dimension position",
                "Bevel as CAD primitive",
                "Bevel edge as primitive",
                "Bevel path as primitive"
            ]
        },
        {
            milestone: "SETUP",
            description: "Instructions for CAD setup",
            activities: [
                "... No further activity",
            ]
        },
        {
            milestone: "DEBUG",
            description: "Improve code and remove bugs",
            activities: [
                "... No further activity",
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
                "@4 Front outside and inside view test",
            ]
        },
        {
            milestone: "TC_SDSS",
            description: "Technical closures sectional doors sliding system",
            activities: [
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
                "Create a graph view similar to the github commit history one"
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
            date: "20230326",
            milestone: "TC_MTOS",
            activities: [
                "Left view test and pattern fill",
                "Top view test and pattern fill",
                "Front outside view test implementation",
            ]
        },
        {
            version: "0.9.6",
            date: "20230326",
            milestone: "PRIMITIVES",
            activities: [
                "Fill style for Pattern, Gradient, and Texture",
            ]
        },
        {
            version: "0.9.6",
            date: "20230323",
            milestone: "TC_SDSS",
            activities: [
                "Random curves",
            ]
        },
        {
            version: "0.9.6",
            date: "20230323",
            milestone: "SETUP",
            activities: [
                "Tests can accept canvas width and ratio to eventually adapt to browser orientation and size",
                "Improved draw cartouche to get bounding box resized upon title width",
                "Corrected Set viewbox",
                "Corrected Set Cartesians",
                "Corrected Set Grid",
                "Implemented Set Background"
            ]
        },
        {
            version: "0.9.6",
            date: "20230319",
            hours: 3,
            milestone: "DEBUG",
            activities: [
                "Improved Set viewbox",
                "Improved Set cartesians",
                "Improved Set grid"
            ]
        },
        {
            version: "0.9.6",
            date: "20230319",
            milestone: "SETUP",
            activities: [
                "Set cartesians using patterns",
                "Started decoupling setup instructions from init"
            ]
        },
        {
            version: "0.9.6",
            date: "20230319",
            milestone: "PRIMITIVES",
            activities: [
                "Instruction for text",
            ]
        },
        {
            version: "0.9.6",
            date: "20230318",
            milestone: "SETUP",

            activities: [
                "Implemented Set grid",
                "Started tests of set cartesians and set grid",
                "Moved Tester Randomizer to CAD",
            ]
        },
        {
            version: "0.9.6",
            date: "20230318",
            milestone: "DEBUG",
            activities: [
                "Logger for JSON circular stringification",
            ]
        },
        {
            version: "0.9.6",
            date: "20230315",
            milestone: "DEBUG",
            activities: [
                "Sliding curve with new path instructions",
                "Sliding system with new path instructions",
            ]
        },
        {
            version: "0.9.6",
            date: "20230314",
            milestone: "DEBUG",
            activities: [
                "Optimize and strengthen svg.path instructions",
                "Create Path cursor instruction",
            ]
        },
        {
            version: "0.9.6",
            date: "20230312",
            milestone: "SETUP",
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
            activities: [
                "Test dimensions types",
            ]
        },
        {
            version: "0.9.6",
            date: "20230310",
            milestone: "TC_MTOS",
            activities: [
                "Alpha for Top view test",
                "Alpha for Front outside and inside view test",
            ]
        },
        {
            version: "0.9.6",
            date: "20230308",
            milestone: "TC_MTOS",
            activities: [
                "Investigate linear dimension bugs",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "JSON",
            activities: [
                "Completed migration to ApgJsv 0.9.6",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "TOOLS",
            activities: [
                "Added validation logger to main logger",
            ]
        },
        {
            version: "0.9.6",
            date: "20230306",
            milestone: "JSON",
            activities: [
                "Started migration to ApgJsv 0.9.6",
            ]
        },
        {
            version: "0.9.5",
            date: "20230304",
            milestone: "DEVLOG",
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
            activities: [
                "Inspection windows",
                "Rotate svg element using pivot"
            ]
        },
        {
            version: "0.9.5",
            date: "20230302",
            milestone: "TC_SECo",
            activities: [
                "Path drawing strategy",
                "Panels with holes",
            ]
        },
        {
            version: "0.9.5",
            date: "20230220",
            milestone: "TC_SDSS",
            activities: [
                "Curves",
                "Sliding tracks",
            ]
        },
        {
            version: "0.9.5",
            date: "20230125",
            milestone: "JSON",
            activities: [
                "Load file",
                "Compile and interpret instructions to build SVG",
            ]
        },
        {
            version: "0.9.5",
            date: "20230120",
            milestone: "TC_MTOS",
            activities: [
                "Dimensions on side view",
            ]
        },
        {
            version: "0.9.5",
            date: "20230118",
            milestone: "TOOLS",
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
            activities: [
                "Basic shape instructions test",
                "Dimensions ad annotations test",
            ]
        },
    ]
}