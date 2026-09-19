import {
    spawn
}
from "child_process";

import {
    promisify
}
from "util";

import fs from "fs/promises";





export async function generatePiperVoice(

    text:string,

    output:string,

    index:number

):Promise<string>{



    await fs.mkdir(

        "output/audio",

        {
            recursive:true
        }

    );





    return new Promise(

        (

            resolve,

            reject

        )=>{



            const process =

            spawn(

                "piper",

                [

                    "--model",

                    "voices/tr_TR-dfki-medium.onnx",

                    "--output_file",

                    output

                ]

            );





            process.stdin.write(

                text

            );



            process.stdin.end();





            process.on(

                "close",

                code=>{


                    if(code !== 0){


                        reject(

                            new Error(

                                `Piper failed ${code}`

                            )

                        );


                        return;

                    }





                    resolve(

                        output

                    );


                }

            );





        }

    );


}



export const generateVoice =
generatePiperVoice;
