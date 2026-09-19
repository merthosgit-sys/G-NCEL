import {

    runFFmpeg

}

from "./ffmpeg.js";








export type CameraEffect =

    | "zoom_in"

    | "zoom_out"

    | "slow_pan"

    | "none";









export function selectEffect(

    cameraStyle:string

):CameraEffect{



    const style =

    cameraStyle.toLowerCase();





    if(

        style.includes("zoom")

    ){

        return "zoom_in";

    }





    if(

        style.includes("tracking")

    ){

        return "slow_pan";

    }





    if(

        style.includes("close")

    ){

        return "zoom_in";

    }





    return "none";

}









export async function applyEffect(

    input:string,

    output:string,

    effect:CameraEffect

):Promise<void>{





    let filter = "";





    switch(effect){



        case "zoom_in":



            filter =

            "zoompan=z='min(zoom+0.0015,1.12)':d=125";

            break;





        case "zoom_out":



            filter =

            "zoompan=z='if(lte(zoom,1.0),1.12,max(1.001,zoom-0.0015))':d=125";

            break;





        case "slow_pan":



            filter =

            "zoompan=x='iw/2-(iw/zoom/2)+sin(on/20)*10':d=125";

            break;





        default:



            filter =

            "null";

            break;


    }







    if(effect === "none"){



        await runFFmpeg([

            "-i",

            input,

            "-c",

            "copy",

            output

        ]);



        return;

    }







    await runFFmpeg([



        "-i",

        input,



        "-vf",

        filter,



        "-c:v",

        "libx264",



        "-preset",

        "medium",



        "-crf",

        "20",



        "-c:a",

        "copy",



        output



    ]);



}
