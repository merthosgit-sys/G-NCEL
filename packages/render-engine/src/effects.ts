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



export async function addZoomEffect(
input:string,
output:string
){


await exec(
"ffmpeg",
[
"-y",

"-i",
input,


"-vf",

"scale=1200:-1,zoompan=z='min(zoom+0.0015,1.15)':d=1:s=1080x1920",


"-c:v",
"libx264",

output

]
);



return output;

}
