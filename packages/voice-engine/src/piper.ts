import { execFile } from "child_process";
import { promisify } from "util";
import fs from "fs/promises";
import path from "path";


const exec =
  promisify(execFile);



export async function generateVoice(
  text: string,
  output: string
) {

  console.log(
    "Generating Turkish voice..."
  );


  const tempDir =
    "output/audio";


  await fs.mkdir(
    tempDir,
    {
      recursive: true
    }
  );


  const inputFile =
    path.join(
      tempDir,
      "script.txt"
    );


  await fs.writeFile(
    inputFile,
    text,
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
      output
    ]
  );


  console.log(
    `Voice created: ${output}`
  );


  return output;

}
