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



export function normalizeText(
text:string
){

return text

.replace(
/[#*_{}[\]"]/g,
""
)

.replace(
/\s+/g,
" "
)

.trim();

}



export async function enhanceAudio(
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

"loudnorm,acompressor",

output
]
);



return output;

}
