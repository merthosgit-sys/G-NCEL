import {
 searchVideos
}
from "./pexels.js";


import {
 rankVideos
}
from "./ranking.js";


import {
 downloadVideo
}
from "./downloader.js";


import fs from "fs/promises";



export async function fetchSceneVideo(
 scene:string,
 output:string
){

 console.log(
  `Searching: ${scene}`
 );


 const videos =
  await searchVideos(scene);



 if(!videos.length){

  throw new Error(
   `No video found: ${scene}`
  );

 }



 const ranked =
  rankVideos(videos);



 const selected =
  ranked[0];



 const file =
 selected.video_files
 .filter(
  (v:any)=>
   v.height > v.width
 )
 .sort(
  (a:any,b:any)=>
   b.height-a.height
 )[0];



 if(!file){

  throw new Error(
   "Portrait video missing"
  );

 }



 await fs.mkdir(
  "output/assets",
  {
   recursive:true
  }
 );



 await downloadVideo(
  file.link,
  output
 );


 console.log(
  `Downloaded: ${output}`
 );


 return output;

}
