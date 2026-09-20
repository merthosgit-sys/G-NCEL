import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import readline from "readline";
import fs from "fs/promises";



let pythonProcess: ChildProcessWithoutNullStreams | null = null;


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





    const rl = readline.createInterface({


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

                "XTTS ERROR:",

                data.toString()

            );


        }


    );







    pythonProcess.on(


        "close",


        (code:number)=>{


            console.log(

                "XTTS server closed:",

                code

            );



            pythonProcess = null;

            ready = false;


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

                        "XTTS process not running"

                    )

                );


                return;

            }







            const request = JSON.stringify({


                text,


                output,


                style


            });








            pythonProcess.stdin.write(


                request + "\n"


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
