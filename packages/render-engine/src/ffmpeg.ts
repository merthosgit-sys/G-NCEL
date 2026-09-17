import { execFile } from "child_process";
import { promisify } from "util";


const exec =
promisify(execFile);



export async function renderShort(
video:string,
audio:string,
subtitle:string,
output:string
){


console.log(
"Rendering with subtitles..."
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
`scale=1080:1920,subtitles=${subtitle}:force_style='FontSize=18,Bold=1'`,

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

"-shortest",

output

]
);



console.log(
`Created ${output}`
);


return output;

}
