import { spawn } from "child_process";
import readline from "readline";
import fs from "fs/promises";



let pythonProcess:any = null;


let ready = false;



const queue:any[] = [];



function startXTTS(){


    if(pythonProcess){

        return;

    }



    pythonProcess = spawn(

        "python",

        [

            "scripts/xtts_server.py"

        ]

    );



    const rl = readline.createInterface({

        input:

        pythonProcess.stdout

    });



    rl.on(

        "line",

        line => {


            console.log(

                "XTTS:",
                line

            );



            if(line.includes(

                "XTTS MODEL READY"

            )){


                ready = true;

            }


        }

    );



    pythonProcess.stderr.on(

        "data",

        data=>{


            console.error(

                data.toString()

            );


        }

    );



}





export async function generateXTTS(

    text:string,

    output:string,

    style:string="neutral"

):Promise<string>{



    startXTTS();



    while(!ready){


        await new Promise(

            r=>setTimeout(r,1000)

        );

    }



    await fs.mkdir(

        "output/audio",

        {
            recursive:true
        }

    );



    return new Promise(

        resolve=>{


            const request = JSON.stringify({

                text,

                output,

                style

            });



            pythonProcess.stdin.write(

                request+"\n"

            );



            const check = setInterval(()=>{


                fs.access(output)

                .then(()=>{


                    clearInterval(check);

                    resolve(output);


                })

                .catch(()=>{});


            },1000);



        }

    );


}
