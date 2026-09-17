export type VoiceProfile = {
    name:string;
    model:string;
};


export const VOICES:VoiceProfile[] = [

    {
        name:"turkish-default",
        model:"voices/tr_TR-dfki-medium.onnx"
    }

];



export function pickVoice(
    index:number
){

    return VOICES[0];

}
