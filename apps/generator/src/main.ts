import "dotenv/config";

import fs from "fs/promises";
import path from "path";


import {
    createTopics
}
from "../../../packages/ai-engine/src/planner.js";


import {
    generateShortScript
}
from "../../../packages/ai-engine/src/gemini.js";


import {
    fetchMultipleScenes
}
from "../../../packages/media-engine/src/index.js";


import {

    concatVideos,

    createSubtitle,

    renderShort

}
from "../../../packages/render-engine/src/index.js";


import {

    generateSceneVoice,

    selectVoiceStyle,

    enhanceAudio

}
from "../../../packages/voice-engine/src/index.js";



interface Scene {


    id:number;


    visualPrompt:string;


    narration:string;


    estimatedSeconds:number;

}



interface ShortScript {


    title:string;


    hook:string;


    scenes:Scene[];


    fullNarration:string;

}





const count =

Number(

    process.env.SHORTS_COUNT ?? "3"

);





const mainTopic =

process.env.SHORTS_TOPIC ??

"teknoloji";









async function mergeAudioFiles(

    files:string[],

    output:string

):Promise<void>{



    const list =

    files

    .map(

        file =>

        `file '${file}'`

    )

    .join("\n");



    const listPath =

    "output/audio-list.txt";



    await fs.writeFile(

        listPath,

        list,

        "utf8"

    );




    const { execFile } =

    await import(
        "child_process"
    );



    const { promisify } =

    await import(
        "util"
    );



    const exec =

    promisify(
        execFile
    );





    await exec(

        "ffmpeg",

        [

            "-y",

            "-f",

            "concat",

            "-safe",

            "0",

            "-i",

            listPath,

            "-c",

            "copy",

            output

        ]

    );



}









async function generateVideo(

    topic:string,

    index:number

):Promise<string>{



    console.log(

        "===================="

    );



    console.log(

        "VIDEO",

        index

    );



    console.log(

        "TOPIC",

        topic

    );





    const scriptText =

    await generateShortScript(

        topic

    );





    const script =

    JSON.parse(

        scriptText

    ) as ShortScript;





    const folder =

    `output/work/${index}`;





    await fs.mkdir(

        folder,

        {

            recursive:true

        }

    );





    await fs.writeFile(

        path.join(

            folder,

            "script.json"

        ),

        JSON.stringify(

            script,

            null,

            2

        ),

        "utf8"

    );





    console.log(

        "Downloading videos"

    );





    const clips =

    await fetchMultipleScenes(

        script.scenes,

        folder

    );





    const mergedVideo =

    path.join(

        folder,

        "merged.mp4"

    );





    await concatVideos(

        clips,

        mergedVideo

    );






    console.log(

        "Generating scene voices"

    );





    const sceneAudios:string[] = [];





    for(

        const scene of script.scenes

    ){



        const audio =

        path.join(

            folder,

            `scene-${scene.id}.wav`

        );





        const style =

        selectVoiceStyle(

            {

                description:

                scene.narration

            }

        );





        await generateSceneVoice(

            {

                text:

                scene.narration,


                output:

                audio,


                style,


                sceneIndex:

                scene.id

            }

        );





        sceneAudios.push(

            audio

        );


    }







    const rawAudio =

    path.join(

        folder,

        "voice-raw.wav"

    );





    await mergeAudioFiles(

        sceneAudios,

        rawAudio

    );





    const finalAudio =

    path.join(

        folder,

        "voice.wav"

    );





    await enhanceAudio(

        rawAudio,

        finalAudio

    );





    console.log(

        "Audio ready"

    );





    const subtitle =

    path.join(

        folder,

        "subtitle.srt"

    );





    await createSubtitle(

        finalAudio,

        subtitle

    );





    const output =

    `output/final/short-${index}.mp4`;





    await renderShort(

        mergedVideo,

        finalAudio,

        subtitle,

        output

    );





    console.log(

        "FINAL",

        output

    );





    return output;


}









async function main(){



    console.log(

        "===== SHORTS FACTORY V4 ====="

    );





    const topics =

    await createTopics(

        mainTopic,

        count

    );





    for(

        let i=0;

        i<topics.length;

        i++

    ){



        try{


            await generateVideo(

                topics[i],

                i+1

            );


        }

        catch(error){



            console.error(

                "VIDEO FAILED",

                i+1

            );



            console.error(

                error

            );


        }


    }





    console.log(

        "ALL DONE"

    );


}







main()

.catch(

    error => {


        console.error(

            error

        );


        process.exit(

            1

        );


    }

);
