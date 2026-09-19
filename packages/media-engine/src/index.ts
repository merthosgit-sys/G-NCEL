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







export async function fetchMultipleScenes(

    scenes:any[],

    folder:string

):Promise<string[]>{



    await fs.mkdir(

        folder,

        {

            recursive:true

        }

    );





    const clips:string[] = [];






    for(

        const scene of scenes

    ){



        console.log(

            "Processing scene",

            scene.id

        );





        const media =

        await findBestMedia(

            scene,

            folder

        );





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
