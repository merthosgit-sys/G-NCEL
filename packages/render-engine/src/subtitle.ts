import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";


const exec =
promisify(execFile);



export async function createSubtitle(
    audio:string,
    output:string
){

    console.log(
        "Creating subtitles..."
    );


    await fs.mkdir(
        "/tmp/subtitle",
        {
            recursive:true
        }
    );


    await exec(
        "python",
        [
            "-m",
            "whisper",

            audio,

            "--language",
            "Turkish",

            "--task",
            "transcribe",

            "--output_format",
            "srt",

            "--output_dir",
            "/tmp/subtitle"
        ]
    );



    const name =
    audio
    .split("/")
    .pop()
    ?.replace(
        ".wav",
        ".srt"
    );



    if(!name){

        throw new Error(
            "Subtitle filename missing"
        );

    }



    await fs.copyFile(
        `/tmp/subtitle/${name}`,
        output
    );


    console.log(
        "Subtitle ready:",
        output
    );


    return output;

}
