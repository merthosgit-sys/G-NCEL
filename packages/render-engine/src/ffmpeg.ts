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



export async function renderShort(

video:string,

audio:string,

subtitle:string,

output:string

){


console.log(
"Rendering final video..."
);



await exec(
"ffmpeg",
[
"-y",

"-i",
video,

"-i",
audio,


"-vf",

`scale=1080:1920,subtitles=${subtitle}:force_style='FontSize=18,Bold=1,Alignment=2,MarginV=150'`,


"-map",
"0:v",

"-map",
"1:a",


"-c:v",
"libx264",

"-preset",
"fast",


"-c:a",
"aac",

"-b:a",
"192k",


"-shortest",

output

]
);



return output;

}
