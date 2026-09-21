import {

    spawn,

    ChildProcessWithoutNullStreams

}

from "child_process";


import readline from "readline";

import fs from "fs/promises";





let pythonProcess:

ChildProcessWithoutNullStreams | null = null;




let ready = false;







function startXTTS(){


    if(pythonProcess){

        return;

    }






    pythonProcess = spawn(

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




            if(

                line.includes(

                    "XTTS MODEL READY"

                )

            ){

                ready = true;

            }



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









export async function generateXTTS(

    text:string,

    output:string

):Promise<string>{



    startXTTS();





    while(!ready){


        await new Promise(

            resolve =>

            setTimeout(

                resolve,

                1000

            )

        );


    }






    await fs.mkdir(

        "output/audio",

        {

            recursive:true

        }

    );







    return new Promise(

        (resolve,reject)=>{



            if(!pythonProcess){


                reject(

                    new Error(

                        "XTTS unavailable"

                    )

                );


                return;

            }






            pythonProcess.stdin.write(

                JSON.stringify({

                    text,

                    output

                })

                +

                "\n"

            );







            const timer =

            setInterval(()=>{



                fs.access(output)

                .then(()=>{


                    clearInterval(timer);

                    resolve(output);


                })

                .catch(()=>{});



            },1000);



        }

    );


}
