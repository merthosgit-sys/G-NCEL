import fs from "fs/promises";
import path from "path";



export interface MediaScene {

    id:number;

    visualPrompt:string;

    narration:string;

    estimatedSeconds:number;

}





const PEXELS_API_KEY =
process.env.PEXELS_API_KEY;





if(!PEXELS_API_KEY){

    throw new Error(
        "PEXELS_API_KEY missing"
    );

}






export async function fetchMultipleScenes(

    scenes:MediaScene[],

    outputFolder:string

):Promise<string[]>{



    const result:string[] = [];



    const videoFolder =
    path.join(
        outputFolder,
        "clips"
    );



    await fs.mkdir(
        videoFolder,
        {
            recursive:true
        }
    );



    for(
        const scene of scenes
    ){


        const file =

        await downloadSceneVideo(

            scene.visualPrompt,

            videoFolder,

            scene.id

        );



        result.push(
            file
        );


    }



    return result;

}







async function downloadSceneVideo(

    query:string,

    folder:string,

    id:number

):Promise<string>{



    const searchURL =

    `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=5`;





    const response =

    await fetch(

        searchURL,

        {

            headers:{

                Authorization:
                PEXELS_API_KEY

            }

        }

    );




    if(!response.ok){


        throw new Error(

            `Pexels search failed ${response.status}`

        );

    }





    const data:any =

    await response.json();





    const video =

    data.videos?.[0];





    if(!video){


        throw new Error(

            `No video found for ${query}`

        );

    }






    const source =

    video.video_files

    .sort(

        (a:any,b:any)=>

        b.width-a.width

    )[0];





    const videoURL =

    source.link;






    const output =

    path.join(

        folder,

        `scene-${id}.mp4`

    );





    const videoResponse =

    await fetch(

        videoURL

    );





    if(!videoResponse.ok){


        throw new Error(

            "Video download failed"

        );

    }





    const buffer =

    Buffer.from(

        await videoResponse.arrayBuffer()

    );





    await fs.writeFile(

        output,

        buffer

    );





    return output;


}
