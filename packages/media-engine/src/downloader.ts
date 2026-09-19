import fs from "fs/promises";
import axios from "axios";







interface MediaVideo {


    videoUrl:string;


    id:number;


}









export async function downloadVideo(

    media:MediaVideo,

    output:string

):Promise<string>{



    console.log(

        "Downloading video:",

        media.id

    );





    if(!media.videoUrl){

        throw new Error(

            "Video URL missing"

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
