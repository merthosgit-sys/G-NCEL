import {

    convertToShortsFormat

}

from "./ffmpeg.js";


import {

    applyEffect,

    selectEffect

}

from "./effects.js";


import fs from "fs/promises";

import path from "path";





export async function concatVideos(

    clips:string[],

    output:string

):Promise<void>{



    if(clips.length === 0){

        throw new Error(

            "No clips to merge"

        );

    }





    const listFile =

    "output/video-list.txt";





    await fs.writeFile(

        listFile,

        clips

        .map(

            clip =>

            `file '${path.resolve(clip)}'`

        )

        .join("\n"),

        "utf8"

    );







    const {

        execFile

    } = await import(

        "child_process"

    );





    const {

        promisify

    } = await import(

        "util"

    );





    await promisify(execFile)(

        "ffmpeg",

        [

            "-y",

            "-f",

            "concat",

            "-safe",

            "0",

            "-i",

            listFile,

            "-c",

            "copy",

            output

        ]

    );


}









export async function createSubtitle(

    audio:string,

    output:string

):Promise<void>{



    const content =

`1

00:00:00,000 --> 00:00:05,000

Bilinmeyen gerçekler keşfediliyor



`;





    await fs.writeFile(

        output,

        content,

        "utf8"

    );



}









export async function renderShort(

    video:string,

    audio:string,

    subtitle:string,

    output:string

):Promise<void>{



    console.log(

        "Rendering:",

        output

    );





    const formatted =

    output.replace(

        ".mp4",

        "-format.mp4"

    );







    await convertToShortsFormat(

        video,

        formatted

    );







    await applyEffect(

        formatted,

        output,

        selectEffect(

            "cinematic zoom"

        )

    );







}
