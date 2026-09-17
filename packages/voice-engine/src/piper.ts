import {
execFile
}
from "child_process";


import {
promisify
}
from "util";


import fs from "fs/promises";

import {
normalizeText
}
from "./normalize.js";


import {
pickVoice
}
from "./voices.js";



const exec =
promisify(execFile);



export async function generatePiperVoice(

text:string,

output:string,

voiceIndex:number

){


console.log(
"Generating voice..."
);



const clean =
normalizeText(
text
);



await fs.writeFile(
"output/audio/input.txt",
clean,
"utf8"
);



const voice =
pickVoice(
voiceIndex
);



console.log(
"Voice:",
voice.name
);



await exec(
"python",
[
"-m",
"piper",

"--model",
voice.model,

"--input_file",
"output/audio/input.txt",

"--output_file",
output
]
);



return output;

}
