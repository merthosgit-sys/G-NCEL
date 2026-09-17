import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";


const exec = promisify(execFile);



export async function generateXTTS(
    text:string,
    output:string,
    style:string = "neutral"
){

    console.log(
        "Generating XTTS voice:",
        style
    );


    await fs.mkdir(
        "output/audio",
        {
            recursive:true
        }
    );


    await exec(
        "python",
        [
            "scripts/xtts_generate.py",

            "--text",
            text,

            "--output",
            output,

            "--style",
            style
        ]
    );


    return output;

}
