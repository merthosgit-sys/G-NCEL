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



export async function concatVideos(
videos:string[],
output:string
){


const list =
"/tmp/video-list.txt";



await fs.writeFile(
list,
videos
.map(v=>`file '${v}'`)
.join("\n")
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
list,

"-c",
"copy",

output
]
);



return output;

}
