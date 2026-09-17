export type VoiceStyle =
    | "excited"
    | "documentary"
    | "mysterious"
    | "neutral";



export function selectVoiceStyle(
    scene:any
):VoiceStyle{


    const text =
    `${scene.description ?? ""}`.toLowerCase();



    if(
        text.includes("gizem") ||
        text.includes("bilinmeyen") ||
        text.includes("sır")
    ){

        return "mysterious";

    }



    if(
        text.includes("hız") ||
        text.includes("yarış") ||
        text.includes("rekor")
    ){

        return "excited";

    }



    if(
        text.includes("tarih") ||
        text.includes("geçmiş")
    ){

        return "documentary";

    }



    return "neutral";

}
