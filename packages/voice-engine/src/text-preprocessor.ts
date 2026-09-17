export function prepareSpeechText(
    text:string
){

    return text

    // emoji temizle
    .replace(
        /[^\p{L}\p{N}\s.,!?]/gu,
        ""
    )

    // kısa duraklama
    .replace(
        /,/g,
        ",..."
    )

    // nokta sonrası nefes
    .replace(
        /\./g,
        "..."
    )

    // fazla boşluk
    .replace(
        /\s+/g,
        " "
    )

    .trim();

}
