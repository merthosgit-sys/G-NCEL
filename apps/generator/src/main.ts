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




const count = Number(
    process.env.SHORTS_COUNT ?? "1"
);



const mainTopic =
process.env.SHORTS_TOPIC ?? "teknoloji";





async function ensureFolders(){

    await fs.mkdir(
        "output/final",
        {
            recursive:true
        }
    );


    await fs.mkdir(
        "output/work",
        {
            recursive:true
        }
    );


    await fs.mkdir(
        "output/audio",
        {
            recursive:true
        }
    );

}







async function mergeAudioFiles(

    files:string[],

    output:string

){

    if(files.length === 0){

        throw new Error(
            "No audio files generated"
        );

    }


    const listPath =
    "output/audio-list.txt";


    await fs.writeFile(

        listPath,

        files
        .map(
            file =>
            `file '${file}'`
        )
        .join("\n"),

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


    await promisify(execFile)(

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

){

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
        !script.scenes ||
        script.scenes.length === 0
    ){

        throw new Error(
            "Gemini returned no scenes"
        );

    }



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
        "DOWNLOADING VIDEOS"
    );



    const clips =
    await fetchMultipleScenes(
        script.scenes,
        folder
    );



    if(clips.length === 0){

        throw new Error(
            "No video clips downloaded"
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
        "VIDEOS MERGED"
    );



    const audios:string[] = [];



    for(
        const scene of script.scenes
    ){

        const audio =
        path.join(
            folder,
            `scene-${scene.id}.wav`
        );


        await generateSceneVoice(
            {

                text:
                scene.narration,

                output:
                audio,

                style:
                selectVoiceStyle(
                    {
                        description:
                        scene.narration
                    }
                ),

                sceneIndex:
                scene.id

            }
        );


        audios.push(
            audio
        );

    }



    const rawAudio =
    path.join(
        folder,
        "voice-raw.wav"
    );



    await mergeAudioFiles(
        audios,
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
        "FINAL CREATED",
        output
    );


    return output;

}








async function main(){


    await ensureFolders();



    console.log(
        "===== SHORTS FACTORY V4 ====="
    );



    const topics =
    await createTopics(
        mainTopic,
        count
    );



    console.log(
        "TOPICS:",
        topics
    );



    if(topics.length === 0){

        throw new Error(
            "No topics generated"
        );

    }



    for(
        let i=0;
        i<topics.length;
        i++
    ){

        await generateVideo(
            topics[i],
            i+1
        );

    }



    console.log(
        "ALL DONE"
    );

}



main()
.catch(
    error => {

        console.error(
            "GENERATION FAILED"
        );


        console.error(
            error
        );


        process.exit(1);

    }
);
