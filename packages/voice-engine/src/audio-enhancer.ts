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



export async function enhanceVoice(
input:string,
output:string
){

await exec(
"ffmpeg",
[

"-y",

"-i",

input,


"-af",

"highpass=f=80,lowpass=f=12000,loudnorm,acompressor",

output

]

);


return output;

}
