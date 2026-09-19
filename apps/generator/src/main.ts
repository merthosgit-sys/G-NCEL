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

    duration:number;

    narration:string;

    visualPrompt:string;

    searchQueries:string[];

    cameraStyle:string;

    mood:string;

}





interface ShortScript {

    title:string;

    hook:string;

    contentType:string;

    style:{

        visual:string;

        tone:string;

    };

    scenes:Scene[];

    fullNarration:string;

}



interface ShortScript {

    title:string;

    hook:string;

    scenes:Scene[];

    fullNarration:string;

}






const count =
Number(
    process.env.SHORTS_COUNT ?? "1"
);



const mainTopic =
process.env.SHORTS_TOPIC ?? "teknoloji";







async function prepareFolders(){

    const folders = [

        "output",

        "output/final",

        "output/work",

        "output/audio"

    ];



    for(
        const folder of folders
    ){

        await fs.mkdir(
            folder,
            {
                recursive:true
            }
        );

    }

}








async function mergeAudioFiles(

    files:string[],

    output:string

):Promise<void>{



    if(files.length === 0){

        throw new Error(
            "Audio list empty"
        );

    }



    const listPath =
    "output/audio-list.txt";



    const content =
    files
    .map(
        file =>
        `file '${path.resolve(file)}'`
    )
    .join("\n");



    await fs.writeFile(

        listPath,

        content,

        "utf8"

    );





    const {

        execFile

    } = await import(
        "child_process"
    );



    const {

        promisify

    } = await import(
        "util"
    );



    const exec =
    promisify(execFile);





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

            "-c:a",

            "pcm_s16le",

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



    console.log(
        "SCRIPT GENERATED"
    );





    const script =

    JSON.parse(
        scriptText
    ) as ShortScript;





    if(
        !Array.isArray(script.scenes) ||
        script.scenes.length === 0
    ){

        throw new Error(
            "No scenes returned from Gemini"
        );

    }







    const folder =

    path.join(

        "output",

        "work",

        String(index)

    );





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
        "FETCHING MEDIA"
    );





    const clips =

    await fetchMultipleScenes(

        script.scenes,

        folder

    );





    if(clips.length === 0){

        throw new Error(
            "No media clips created"
        );

    }







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
        "MEDIA READY"
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
        "VOICE READY"
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







    const finalVideo =

    path.join(

        "output",

        "final",

        `short-${index}.mp4`

    );





    await renderShort(

        mergedVideo,

        finalAudio,

        subtitle,

        finalVideo

    );






    console.log(

        "CREATED",

        finalVideo

    );





    return finalVideo;

}









async function main(){



    await prepareFolders();





    console.log(

        "===== SHORTS FACTORY V4 ====="

    );





    const topics =

    await createTopics(

        mainTopic,

        count

    );





    console.log(

        "TOPICS",

        topics

    );





    if(

        topics.length === 0

    ){

        throw new Error(
            "Planner returned no topics"
        );

    }






    const results:string[] = [];





    for(

        let i = 0;

        i < topics.length;

        i++

    ){



        const result =

        await generateVideo(

            topics[i],

            i + 1

        );



        results.push(

            result

        );


    }





    console.log(

        "GENERATED FILES",

        results

    );



    console.log(

        "ALL DONE"

    );


}







main()

.catch(

    error => {

        console.error(

            "PIPELINE FAILED"

        );


        console.error(

            error

        );


        process.exit(

            1

        );

    }

);
