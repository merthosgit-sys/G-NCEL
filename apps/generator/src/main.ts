import "dotenv/config";

import fs from "fs/promises";


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



interface ScriptScene {

    id:number;

    visualPrompt:string;

    narration:string;

    estimatedSeconds:number;

}



interface ShortData {

    title:string;

    hook:string;

    scenes:ScriptScene[];

    fullNarration:string;

}



const count =
Number(
    process.env.SHORTS_COUNT ?? "3"
);



const mainTopic =
process.env.SHORTS_TOPIC ??
"teknoloji";





async function generateVideo(
    topic:string,
    index:number
){


    console.log(
        "======================"
    );


    console.log(
        "VIDEO:",
        index
    );


    console.log(
        "TOPIC:",
        topic
    );



    const rawScript =
    await generateShortScript(
        topic
    );



    const data =
    JSON.parse(
        rawScript
    ) as ShortData;



    const folder =
    `output/work/${index}`;



    await fs.mkdir(
        folder,
        {
            recursive:true
        }
    );



    await fs.writeFile(
        `${folder}/script.json`,
        JSON.stringify(
            data,
            null,
            2
        ),
        "utf8"
    );



    console.log(
        "Downloading scenes..."
    );



    const clips =
    await fetchMultipleScenes(
        data.scenes,
        folder
    );



    const merged =
    `${folder}/merged.mp4`;



    await concatVideos(
        clips,
        merged
    );



    console.log(
        "Video merged:",
        merged
    );



    /*
        SCENE VOICES
    */


    const sceneAudios:string[] = [];



    for(
        const scene of data.scenes
    ){


        const sceneAudio =
        `${folder}/scene-${scene.id}.wav`;



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
                sceneAudio,

                style,

                sceneIndex:
                scene.id
            }
        );



        sceneAudios.push(
            sceneAudio
        );

    }




    /*
        TODO:
        Scene audio merge
        burada yapılacak.
        
        Şimdilik ilk çalışan
        pipeline için bütün narration
        fallback kullanıyoruz.
    */



    const rawAudio =
    `${folder}/voice-raw.wav`;



    const finalAudio =
    `${folder}/voice.wav`;



    const voiceStyle =
    selectVoiceStyle(
        {
            description:
            data.fullNarration
        }
    );



    await generateSceneVoice(
        {
            text:
            data.fullNarration,

            output:
            rawAudio,

            style:
            voiceStyle,

            sceneIndex:
            0
        }
    );



    await enhanceAudio(
        rawAudio,
        finalAudio
    );



    console.log(
        "Voice ready:",
        finalAudio
    );



    /*
        SUBTITLE
    */



    const subtitle =
    `${folder}/subtitle.srt`;



    await createSubtitle(
        finalAudio,
        subtitle
    );



    console.log(
        "Subtitle ready:",
        subtitle
    );



    /*
        FINAL RENDER
    */



    const finalVideo =
    `output/final/short-${index}.mp4`;



    await renderShort(
        merged,
        finalAudio,
        subtitle,
        finalVideo
    );



    console.log(
        "FINAL VIDEO:",
        finalVideo
    );



    return finalVideo;

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



    console.log(
        topics
    );



    for(
        let i=0;
        i<topics.length;
        i++
    ){


        try {


            await generateVideo(
                topics[i],
                i+1
            );


        }
        catch(error){


            console.error(
                `VIDEO ${i+1} ERROR`
            );


            console.error(
                error
            );

        }

    }



    console.log(
        "DONE"
    );

}





main()
.catch(
    error=>{

        console.error(
            error
        );


        process.exit(1);

    }
);
