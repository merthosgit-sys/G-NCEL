import {

    generateXTTS,

    generatePiperVoice

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



    try {


        await generateXTTS(

            input.text,

            input.output,

            input.style

        );



        console.log(

            `XTTS scene ${input.sceneIndex} OK`

        );



    }


    catch(error){



        console.error(

            `XTTS scene ${input.sceneIndex} failed`

        );



        await generatePiperVoice(

            input.text,

            input.output,

            input.sceneIndex

        );



    }



    return input.output;


}
