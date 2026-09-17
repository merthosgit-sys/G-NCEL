import { execFile } from "child_process";
import { promisify } from "util";


const exec =
promisify(execFile);



export async function generateVoice(
 text:string,
 output:string
){

console.log(
"Generating Turkish voice..."
);



await exec(
"python",
[
"-m",
"piper",

"--model",
"voices/tr_TR-dfki-medium.onnx",

"--output_file",
output
],
{
input:text
}
);



console.log(
`Voice created: ${output}`
);



return output;

}
