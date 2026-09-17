import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";


const exec =
promisify(execFile);



export async function concatVideos(
videos:string[],
output:string
){

if(!videos.length){

throw new Error(
"No videos supplied"
);

}



const listFile =
path.resolve(
"/tmp/concat-list.txt"
);



const absoluteVideos =
videos.map(
video =>
path.resolve(video)
);



const content =
absoluteVideos
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
"Concat list:"
);

console.log(content);



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
