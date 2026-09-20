import {

    generateXTTS

}
from "./index.js";



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
        `Generating XTTS scene ${input.sceneIndex}`
    );



    await generateXTTS(

        input.text,

        input.output,

        input.style

    );



    console.log(

        `XTTS scene ${input.sceneIndex} OK`

    );



    return input.output;


}
