export type VoiceProfile = {
    name: string;
    model: string;
};


export const VOICES: VoiceProfile[] = [

    {
        name: "documentary",
        model: "voices/tr_TR-dfki-medium.onnx"
    },

    {
        name: "story",
        model: "voices/tr_TR-fettah-medium.onnx"
    }

];



export function pickVoice(
    index:number
){

    return VOICES[
        index % VOICES.length
    ];

}
