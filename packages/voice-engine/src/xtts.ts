import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";


const exec = promisify(execFile);


// Aynı anda birden fazla XTTS çalışmasını engeller
let xttsQueue = Promise.resolve();



async function runXTTS(
    text:string,
    output:string,
    style:string
){

    console.log("--------------------------------");
    console.log("XTTS START");
    console.log("Style:", style);
    console.log("Output:", output);
    console.log("Text length:", text.length);
    console.log("--------------------------------");


    await fs.mkdir(
        path.dirname(output),
        {
            recursive:true
        }
    );


    try {


        const result = await exec(

            "python",

            [
                "scripts/xtts_generate.py",

                "--text",
                text,

                "--output",
                output,

                "--style",
                style
            ],

            {

                // XTTS için uzun süre gerekiyor
                timeout:
                15 * 60 * 1000,


                // Büyük python çıktıları için
                maxBuffer:
                1024 * 1024 * 100

            }

        );



        if(result.stdout){

            console.log(
                "XTTS OUTPUT:"
            );

            console.log(
                result.stdout
            );

        }



        if(result.stderr){

            console.log(
                "XTTS INFO:"
            );

            console.log(
                result.stderr
            );

        }



        // Dosya gerçekten oluştu mu?
        try {


            await fs.access(
                output
            );


            console.log(
                "XTTS FILE READY:",
                output
            );


        }

        catch {


            throw new Error(
                "XTTS finished but output file was not created: "
                + output
            );

        }



        return output;



    }


    catch(error:any){


        console.error(
            "XTTS ERROR"
        );


        console.error(
            error.message
        );


        if(error.stdout){

            console.error(
                "STDOUT:",
                error.stdout
            );

        }


        if(error.stderr){

            console.error(
                "STDERR:",
                error.stderr
            );

        }


        throw error;

    }


}



export async function generateXTTS(

    text:string,

    output:string,

    style:string = "neutral"

){


    console.log(
        "Queueing XTTS voice:",
        style
    );



    /*
       XTTS ağır olduğu için
       sahneleri sırayla çalıştırır.
       Aynı anda 6 Python açılmaz.
    */


   xttsQueue =
    xttsQueue.then(

        async () => {

            await runXTTS(
                text,
                output,
                style
            );

        }

    );


await xttsQueue;



    return output;

}
