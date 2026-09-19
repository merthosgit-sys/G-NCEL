import fs from "fs/promises";

import {
    execFile
}
from "child_process";

import {
    promisify
}
from "util";


const exec =
promisify(execFile);





export async function concatVideos(

    clips:string[],

    output:string

):Promise<void>{



    const listFile =
    "output/video-list.txt";



    const content =

    clips

    .map(

        clip =>

        `file '${clip}'`

    )

    .join("\n");





    await fs.writeFile(

        listFile,

        content,

        "utf8"

    );





    await exec(

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



    await exec(

        "whisper",

        [

            audio,

            "--language",

            "tr",

            "--task",

            "transcribe",

            "--output_format",

            "srt",

            "--output_dir",

            "output/work"

        ]

    );


}








export async function renderShort(

    video:string,

    audio:string,

    subtitle:string,

    output:string

):Promise<void>{



    await exec(

        "ffmpeg",

        [

            "-y",

            "-i",

            video,

            "-i",

            audio,

            "-vf",

            `subtitles=${subtitle}`,

            "-map",

            "0:v",

            "-map",

            "1:a",

            "-c:v",

            "libx264",

            "-preset",

            "medium",

            "-c:a",

            "aac",

            "-shortest",

            output

        ]

    );


}
