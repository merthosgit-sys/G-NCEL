import {
    generateXTTS,
    generatePiperVoice
} from "./index.js";


export async function generateSceneVoice(
    text:string,
    output:string,
    style:string
){

    try {

        await generateXTTS(
            text,
            output,
            style
        );

    } catch {

        await generatePiperVoice(
            text,
            output,
            0
        );

    }

    return output;
}
