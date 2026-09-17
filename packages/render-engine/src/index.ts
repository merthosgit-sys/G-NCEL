import {
searchVideos
}
from "./pexels.js";


import {
downloadVideo
}
from "./downloader.js";


import fs from "fs/promises";



export async function fetchSceneVideo(
description:string,
output:string
){


console.log(
"Searching:",
description
);



const videos =
await searchVideos(
description
);



if(!videos.length){

throw new Error(
`No video found: ${description}`
);

}



const portrait =
videos[0]
.video_files
.find(
(v:any)=>
v.height > v.width
);



if(!portrait){

throw new Error(
"No portrait video"
);

}



await downloadVideo(
portrait.link,
output
);



return output;

}



export async function fetchMultipleScenes(
scenes:any[],
folder:string
){


await fs.mkdir(
folder,
{
recursive:true
}
);



const files:string[]=[];



for(
let i=0;
i<scenes.length;
i++
){


const file =
`${folder}/scene-${i}.mp4`;



await fetchSceneVideo(
scenes[i].description,
file
);



files.push(file);



}



return files;

}
