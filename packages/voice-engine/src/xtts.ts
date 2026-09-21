import { 
    spawn, 
    ChildProcessWithoutNullStreams 
} from "child_process";

import readline from "readline";

import fs from "fs/promises";




let pythonProcess: ChildProcessWithoutNullStreams | null = null;


let ready = false;


let startupError:string | null = null;





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






            if(

                line.includes(

                    "startup_error"

                )

            ){


                startupError = line;


            }


        }

    );









    pythonProcess.stderr.on(


        "data",


        (data:Buffer)=>{


            const message =

            data.toString();





            // pytorch warninglerini gizle

            if(

                !message.includes(

                    "FutureWarning"

                )

            ){

                console.error(

                    "XTTS STDERR:",

                    message

                );

            }


        }

    );








    pythonProcess.on(

        "close",

        (code:number)=>{


            console.log(

                "XTTS closed:",

                code

            );



            pythonProcess = null;

            ready = false;


        }

    );



}








async function waitForReady(){



    let seconds = 0;



    while(!ready){



        if(startupError){


            throw new Error(

                startupError

            );

        }





        seconds++;





        if(seconds > 300){


            throw new Error(

                "XTTS startup timeout"

            );


        }






        await new Promise(

            resolve =>

            setTimeout(

                resolve,

                1000

            )

        );



    }



}










export async function generateXTTS(


    text:string,


    output:string,


    style:string="neutral"


):Promise<string>{





    startXTTS();





    await waitForReady();







    await fs.mkdir(


        "output/audio",


        {


            recursive:true

        }


    );








    if(!pythonProcess){


        throw new Error(

            "XTTS process unavailable"

        );


    }








    return new Promise(


        (resolve,reject)=>{






            const request = JSON.stringify({


                text,


                output,


                style


            });









            pythonProcess!.stdin.write(

                request + "\n"

            );








            const timer = setInterval(()=>{





                fs.access(output)

                .then(()=>{



                    clearInterval(timer);



                    console.log(

                        "XTTS FILE READY:",

                        output

                    );



                    resolve(output);



                })

                .catch(()=>{});





            },1000);







            setTimeout(()=>{


                clearInterval(timer);


                reject(

                    new Error(

                        "XTTS generation timeout"

                    )

                );


            },300000);



        }

    );



}
