import {
    spawn,
    ChildProcessWithoutNullStreams
}
from "child_process";


import readline from "readline";


import fs from "fs/promises";



let pythonProcess:
ChildProcessWithoutNullStreams | null = null;



let ready=false;



const pending =
new Map<string,()=>void>();




function startXTTS(){


    if(pythonProcess)
        return;



    pythonProcess =
    spawn(
        "python",
        [
            "scripts/xtts_server.py"
        ],
        {
            stdio:"pipe"
        }
    );



    const rl =
    readline.createInterface({

        input:
        pythonProcess.stdout

    });



    rl.on(
        "line",
        (line:string)=>{


            console.log(
                "XTTS:",
                line
            );


            try{


                const data =
                JSON.parse(line);



                if(
                    data.status==="XTTS MODEL READY"
                ){

                    ready=true;

                }



                if(
                    data.status==="file"
                ){

                    const cb =
                    pending.get(
                        data.output
                    );


                    if(cb){

                        cb();

                        pending.delete(
                            data.output
                        );

                    }

                }


            }
            catch{}

        }
    );



    pythonProcess.stderr.on(
        "data",
        (data:Buffer)=>{

            console.error(
                data.toString()
            );

        }
    );

}



export async function generateXTTSBatch(

    texts:string[],

    outputs:string[]

):Promise<string[]>{



    startXTTS();



    while(!ready){

        await new Promise(
            r=>setTimeout(r,500)
        );

    }



    await fs.mkdir(
        "output/audio",
        {
            recursive:true
        }
    );



    const promises =
    outputs.map(

        output=>


        new Promise<void>(resolve=>{

            pending.set(
                output,
                resolve
            );

        })

    );



    pythonProcess!.stdin.write(

        JSON.stringify({

            texts,

            outputs

        })

        +"\n"

    );



    await Promise.all(
        promises
    );


    return outputs;

}
