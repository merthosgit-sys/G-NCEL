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







export async function runFFmpeg(

    args:string[]

):Promise<void>{



    console.log(

        "FFmpeg:",

        args.join(" ")

    );



    await exec(

        "ffmpeg",

        [

            "-y",

            ...args

        ]

    );


}









export async function convertToShortsFormat(

    input:string,

    output:string

):Promise<void>{



    await runFFmpeg([



        "-i",

        input,



        "-vf",

        [

            "scale=1080:1920:force_original_aspect_ratio=increase",

            "crop=1080:1920",

            "eq=contrast=1.05:saturation=1.15",

            "format=yuv420p"

        ].join(","),





        "-c:v",

        "libx264",





        "-preset",

        "veryfast",





        "-crf",

        "23",





        "-c:a",

        "aac",





        "-b:a",

        "192k",





        output

    ]);

}
