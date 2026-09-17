import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";


const exec = promisify(execFile);



export async function concatVideos(
    videos: string[],
    output: string
) {


    if (!videos.length) {

        throw new Error(
            "No videos to concat"
        );

    }



    const listFile =
        "/tmp/concat-list.txt";



    const content =
        videos
            .map(
                video =>
                    `file '${video}'`
            )
            .join("\n");



    await fs.writeFile(
        listFile,
        content,
        "utf-8"
    );



    console.log(
        "Concatenating videos:",
        videos.length
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

            "-c:v",
            "libx264",

            "-c:a",
            "aac",

            "-preset",
            "fast",

            output
        ]
    );



    return output;

}
