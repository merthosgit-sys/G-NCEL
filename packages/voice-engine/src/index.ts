import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";


const exec =
promisify(execFile);



function cleanText(
text:string
){

return text
.replace(
/[#*_{}[\]"]/g,
""
)
.replace(
(/\n+/g),
" "
)
.trim();

}



export async function generateVoice(
text:string,
output:string
){


console.log(
"Generating Turkish voice..."
);



const folder =
"output/audio";



await fs.mkdir(
folder,
{
recursive:true
}
);



const clean =
cleanText(text);



const input =
path.join(
folder,
"voice.txt"
);



await fs.writeFile(
input,
clean,
"utf8"
);



await exec(
"python",
[
"-m",
"piper",

"--model",
"voices/tr_TR-dfki-medium.onnx",

"--input_file",
input,

"--output_file",
output
]
);



const stat =
await fs.stat(
output
);



if(stat.size < 5000){

throw new Error(
"Voice file invalid"
);

}



console.log(
"Voice ready:",
output
);



return output;

}
