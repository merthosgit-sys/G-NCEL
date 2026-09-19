import fs from "fs/promises";

import axios from "axios";





export interface MediaVideo {


    id:number;


    width:number;


    height:number;


    duration:number;


    title:string;


    url:string;


    videoUrl:string;


}









export async function downloadVideo(

    media:MediaVideo,

    output:string

):Promise<string>{



    console.log(

        "Downloading:",

        media.title

    );





    if(

        !media.videoUrl

    ){

        throw new Error(

            "Missing video URL"

        );

    }







    const response =

    await axios.get(

        media.videoUrl,

        {

            responseType:

            "arraybuffer"

        }

    );







    await fs.writeFile(

        output,

        Buffer.from(

            response.data

        )

    );







    console.log(

        "Saved:",

        output

    );







    return output;

}
