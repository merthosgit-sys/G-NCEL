import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";


const exec = promisify(execFile);



function cleanText(text: string) {

  return text
    .replace(/[#*_{}[\]"]/g, "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}



function splitText(
  text:string,
  maxLength = 350
){

  const parts:string[] = [];

  let current = "";

  for(const sentence of text.split(".")){

    const next =
      current + sentence + ".";


    if(next.length > maxLength){

      if(current.trim()){
        parts.push(current.trim());
      }

      current =
        sentence + ".";

    } else {

      current = next;

    }

  }


  if(current.trim()){

    parts.push(
      current.trim()
    );

  }


  return parts;

}



export async function generateVoice(
  text:string,
  output:string
){

console.log(
"Generating Turkish voice..."
);



const tempDir =
"output/audio";



await fs.mkdir(
tempDir,
{
recursive:true
}
);



const clean =
cleanText(text);



if(!clean){

throw new Error(
"Voice text empty"
);

}



const chunks =
splitText(clean);



const files:string[] = [];



for(let i=0;i<chunks.length;i++){


const inputFile =
path.join(
tempDir,
`part-${i}.txt`
);



const outputFile =
path.join(
tempDir,
`part-${i}.wav`
);



await fs.writeFile(
inputFile,
chunks[i],
"utf-8"
);



await exec(
"python",
[
"-m",
"piper",

"--model",
"voices/tr_TR-dfki-medium.onnx",

"--input_file",
inputFile,

"--output_file",
outputFile
]
);



files.push(outputFile);


}



console.log(
"Voice parts created:",
files.length
);



/*
Burada parçaları birleştirme
işlemi ffmpeg ile yapılacak.
*/

await exec(
"ffmpeg",
[
"-y",

"-i",
`concat:${files.join("|")}`,

"-c",
"copy",

output
]
);



const stat =
await fs.stat(output);



if(stat.size < 1000){

throw new Error(
"Voice file invalid"
);

}



console.log(
`Voice ready: ${output}`
);



return output;

}
