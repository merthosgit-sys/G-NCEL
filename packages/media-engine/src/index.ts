import {
  searchVideos
} from "./pexels.js";

import {
  rankVideos
} from "./ranking.js";

import {
  downloadVideo
} from "./downloader.js";

import fs from "fs/promises";


export async function fetchSceneVideo(
  scene:string,
  output:string
){

  console.log(
    `Searching video: ${scene}`
  );


  const videos =
    await searchVideos(scene);


  if(!videos.length){

    throw new Error(
      `No videos found for ${scene}`
    );

  }


  const ranked =
    rankVideos(videos);


  const best =
    ranked[0];


  const file =
    best.video_files
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
      "No portrait video found"
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
    `Saved: ${output}`
  );


  return output;

}
