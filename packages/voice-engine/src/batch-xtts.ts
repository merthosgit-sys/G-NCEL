import {execFile} from "child_process";
import {promisify} from "util";


const exec = promisify(execFile);



export async function generateBatchXTTS(

texts:string[],

outputs:string[]

){



await exec(

"python",

[

"scripts/xtts_batch_generate.py",

"--texts",

JSON.stringify(texts),

"--outputs",

JSON.stringify(outputs)

]

);


return outputs;


}
