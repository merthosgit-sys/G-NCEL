import fs from "fs/promises";
import path from "path";


import {
    findBestMedia
}
from "./media-search.js";


import {
    downloadVideo
}
from "./downloader.js";







interface Scene {


    id:number;


    visualPrompt:string;


    searchQueries:string[];


    narration:string;


}









export async function fetchMultipleScenes(

    scenes:Scene[],

    folder:string

):Promise<string[]>{



    const clips:string[] = [];





    await fs.mkdir(

        folder,

        {

            recursive:true

        }

    );






    for(

        const scene of scenes

    ){



        console.log(

            "SEARCHING SCENE",

            scene.id

        );





        const media =

        await findBestMedia(

            scene,

            folder

        );





        if(!media){

            throw new Error(

                `No media found scene ${scene.id}`

            );

        }







        const output =

        path.join(

            folder,

            `scene-${scene.id}.mp4`

        );





        await downloadVideo(

            media,

            output

        );





        clips.push(

            output

        );



    }





    return clips;

}
