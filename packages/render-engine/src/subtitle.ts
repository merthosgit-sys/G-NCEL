import {
execFile
}
from "child_process";


import {
promisify
}
from "util";


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



await exec(
"whisper",
[
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



const file =
"/tmp/subtitle/"
+
audio.split("/").pop()
?.replace(
".wav",
".srt"
);



await fs.copyFile(
file!,
output
);



return output;

}
