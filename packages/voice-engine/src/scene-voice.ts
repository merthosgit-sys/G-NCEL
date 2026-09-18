import {
    generateXTTS,
    generatePiperVoice
} from "./index.js";


export type SceneVoiceStyle =
    | "excited"
    | "documentary"
    | "mysterious"
    | "neutral";


export interface SceneVoiceOptions {

    text: string;

    output: string;

    style?: SceneVoiceStyle;

    sceneIndex: number;
}



export async function generateSceneVoice(
    options: SceneVoiceOptions
): Promise<string> {


    const {
        text,
        output,
        style = "neutral",
        sceneIndex
    } = options;


    console.log(
        `[VOICE] Scene ${sceneIndex} generating`
    );


    try {


        await generateXTTS(
            text,
            output,
            style
        );


        console.log(
            `[VOICE] Scene ${sceneIndex} XTTS success`
        );


    } catch(error) {


        console.error(
            `[VOICE] Scene ${sceneIndex} XTTS failed, using Piper fallback`
        );


        await generatePiperVoice(
            text,
            output,
            sceneIndex
        );


        console.log(
            `[VOICE] Scene ${sceneIndex} Piper success`
        );

    }


    return output;

}
