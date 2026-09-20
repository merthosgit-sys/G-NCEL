import {

    generateXTTS

}

from "./xtts.js";





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





export async function generateSceneVoice(

input:GenerateSceneVoiceInput

):Promise<string>{



    console.log(

        "Generating scene:",

        input.sceneIndex

    );



    const result = await generateXTTS(

        input.text,

        input.output,

        input.style

    );



    console.log(

        "Scene voice ready:",

        input.sceneIndex

    );



    return result;


}
