import {
execFile
}
from "child_process";


import {
promisify
}
from "util";


import {
prepareSpeechText
}
from "./text-preprocessor.js";


import {
getVoiceSettings
}
from "./director.js";



const exec =
promisify(execFile);



export async function generateVoice(

text:string,

output:string,

scene:any

){

console.log(
"Generating Turkish voice..."
);



const clean =
prepareSpeechText(
text
);



const settings =
getVoiceSettings(
scene
);



await exec(

"python",

[

"-m",

"piper",

"--model",

"voices/tr_TR-dfki-medium.onnx",

"--output_file",

output,

"--length_scale",

settings.speed,

"--text",

clean

]

);



console.log(
"Voice generated:",
output
);



return output;


}
