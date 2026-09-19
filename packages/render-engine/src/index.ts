import {

    convertToShortsFormat

}

from "./ffmpeg.js";


import {

    applyEffect,

    selectEffect

}

from "./effects.js";






export async function renderShort(

    video:string,

    audio:string,

    subtitle:string,

    output:string

):Promise<void>{



    console.log(

        "Rendering short:",

        output

    );





    const formattedVideo =

    output.replace(

        ".mp4",

        "-formatted.mp4"

    );






    await convertToShortsFormat(

        video,

        formattedVideo

    );







    const effect =

    selectEffect(

        "cinematic zoom"

    );







    await applyEffect(

        formattedVideo,

        output,

        effect

    );







    console.log(

        "Render complete"

    );

}
