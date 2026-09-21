import {

    generateXTTSBatch

} from "./xtts.js";





export type VoiceStyle =

    | "excited"

    | "documentary"

    | "mysterious"

    | "neutral";







export interface GenerateSceneVoiceInput {


    text:string;


    output:string;


    style:VoiceStyle;


    sceneIndex:number;


}









export interface GenerateBatchVoiceInput {


    scenes:GenerateSceneVoiceInput[];


}









export async function generateSceneVoiceBatch(

    input:GenerateBatchVoiceInput

):Promise<string[]>{





    console.log(

        "Generating batch voices:",

        input.scenes.length

    );






    const texts =

    input.scenes.map(

        scene => scene.text

    );





    const outputs =

    input.scenes.map(

        scene => scene.output

    );








    const result =

    await generateXTTSBatch(

        texts,

        outputs

    );








    input.scenes.forEach(

        scene => {


            console.log(

                "Scene voice ready:",

                scene.sceneIndex

            );


        }

    );








    return result;


}









/*
 Eski sistem ile uyumluluk
*/

export async function generateSceneVoice(

    input:GenerateSceneVoiceInput

):Promise<string>{





    const result =

    await generateSceneVoiceBatch({

        scenes:[input]

    });






    return result[0];



}
