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
