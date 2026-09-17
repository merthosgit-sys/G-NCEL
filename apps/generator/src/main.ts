import "dotenv/config";

import fs from "fs/promises";


import {
    createTopics
} from "../../../packages/ai-engine/src/planner.js";


import {
    generateShortScript
} from "../../../packages/ai-engine/src/gemini.js";


import {
    fetchMultipleScenes
} from "../../../packages/media-engine/src/index.js";


import {
    concatVideos
} from "../../../packages/render-engine/src/index.js";



const count =
Number(
    process.env.SHORTS_COUNT ?? "3"
);



const mainTopic =
process.env.SHORTS_TOPIC ??
"teknoloji tarihi";



async function generateVideo(
    topic:string,
    index:number
){


    console.log(
        "\n========================"
    );


    console.log(
        `VIDEO ${index} START`
    );


    console.log(
        "TOPIC:",
        topic
    );



    const rawScript =
    await generateShortScript(
        topic
    );



    console.log(
        "SCRIPT GENERATED"
    );



    let data:any;



    try {


        data =
        JSON.parse(
            rawScript
        );


    } catch {


        console.error(
            "Invalid AI JSON:"
        );


        console.log(
            rawScript
        );


        throw new Error(
            "AI response JSON invalid"
        );

    }



    if(
        !data.scenes ||
        !Array.isArray(data.scenes)
    ){

        throw new Error(
            "No scenes found"
        );

    }



    console.log(
        "SCENES:",
        data.scenes.length
    );



    const workDir =
    `output/work/${index}`;



    await fs.mkdir(
        workDir,
        {
            recursive:true
        }
    );



    await fs.writeFile(

        `${workDir}/script.json`,

        JSON.stringify(
            data,
            null,
            2
        ),

        "utf-8"

    );



    const clips =
    await fetchMultipleScenes(
        data.scenes,
        workDir
    );



    console.log(
        "DOWNLOADED CLIPS:"
    );


    console.log(
        clips
    );



    const mergedVideo =
    `${workDir}/merged.mp4`;



    await concatVideos(
        clips,
        mergedVideo
    );



    console.log(
        "MERGED VIDEO:"
    );


    console.log(
        mergedVideo
    );



    return mergedVideo;

}





async function main(){


    console.log(
        "===== SHORTS FACTORY V3 ====="
    );


    console.log(
        "MAIN TOPIC:",
        mainTopic
    );


    console.log(
        "COUNT:",
        count
    );



    const topics =
    await createTopics(
        mainTopic,
        count
    );



    console.log(
        "GENERATED TOPICS:"
    );


    console.log(
        topics
    );



    const results:string[] = [];



    for(
        let i = 0;
        i < topics.length;
        i++
    ){


        try {


            const video =
            await generateVideo(
                topics[i],
                i + 1
            );


            results.push(
                video
            );



        } catch(error){


            console.error(
                `VIDEO ${i+1} FAILED`
            );


            console.error(
                error
            );


        }


    }



    console.log(
        "\n===== COMPLETE ====="
    );


    console.log(
        results
    );



}



main()
.catch(
    error => {

        console.error(
            error
        );

        process.exit(1);

    }
);
