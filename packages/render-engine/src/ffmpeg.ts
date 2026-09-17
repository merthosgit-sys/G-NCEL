import { execFile } from "child_process";
import { promisify } from "util";


const exec =
promisify(execFile);



export async function renderShort(
 video:string,
 audio:string,
 output:string
){

console.log(
 "Starting FFmpeg render..."
);



await exec(
 "ffmpeg",
 [
  "-y",

  "-i",
  video,

  "-i",
  audio,


  "-vf",
  [
   "scale=1080:1920",
   "crop=1080:1920",
   "format=yuv420p"
  ].join(","),


  "-map",
  "0:v:0",

  "-map",
  "1:a:0",


  "-c:v",
  "libx264",

  "-preset",
  "fast",

  "-crf",
  "23",


  "-c:a",
  "aac",

  "-b:a",
  "192k",


  "-shortest",

  output
 ]
);



console.log(
 `Rendered: ${output}`
);



return output;

}
