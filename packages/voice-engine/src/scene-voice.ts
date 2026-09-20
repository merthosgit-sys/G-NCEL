import {

    generateXTTS

}

from "./xtts.js";



import {

    generatePiperVoice

}

from "./piper.js";





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

        "Queueing XTTS scene:",
        input.sceneIndex

    );



    try{



        const result = await generateXTTS(

            input.text,

            input.output,

            input.style

        );



        console.log(

            "XTTS scene success:",
            input.sceneIndex

        );



        return result;



    }

    catch(error){



        console.error(

            "XTTS failed scene:",
            input.sceneIndex,

            error

        );



        // fallback tamamen kapalı değil
        // ama hata gizlemiyoruz

        console.log(
            "Using Piper fallback"
        );



        return await generatePiperVoice(

            input.text,

            input.output,

            input.sceneIndex

        );

    }



}
