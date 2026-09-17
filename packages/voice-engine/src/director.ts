export type VoiceMood =
    | "normal"
    | "fast"
    | "slow"
    | "dramatic";


export function getVoiceSettings(
    scene:any
){

    const text =
    `${scene.description ?? ""}`.toLowerCase();


    if(
        text.includes("gizem") ||
        text.includes("bilinmeyen") ||
        text.includes("sır")
    ){

        return {

            mood:"dramatic",

            speed:"0.90"

        };

    }


    if(
        text.includes("hız") ||
        text.includes("yarış") ||
        text.includes("spor")
    ){

        return {

            mood:"fast",

            speed:"1.10"

        };

    }



    return {

        mood:"normal",

        speed:"1.0"

    };


}
