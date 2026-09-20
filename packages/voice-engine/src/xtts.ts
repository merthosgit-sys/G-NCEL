import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";


const exec = promisify(execFile);



let xttsReady = false;



export async function loadXTTS(){

    if(xttsReady){
        return;
    }


    console.log(
        "XTTS model ready"
    );


    xttsReady = true;

}





export async function generateXTTS(

    text:string,

    output:string,

    style:string="neutral"

):Promise<string>{



    await loadXTTS();



    await fs.mkdir(

        "output/audio",

        {
            recursive:true
        }

    );



    console.log("--------------------------------");
    console.log(
        "XTTS START"
    );

    console.log(
        "Output:",
        output
    );

    console.log(
        "Text:",
        text.length
    );

    console.log("--------------------------------");



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
