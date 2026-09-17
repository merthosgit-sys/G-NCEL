import {
searchVideos
}
from "./pexels.js";


import {
rankVideo
}
from "./ranking.js";


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



const selected =
rankVideo(
videos
);



if(!selected?.link){

throw new Error(
`No suitable video: ${description}`
);

}



await downloadVideo(
selected.link,
output
);



console.log(
"Downloaded:",
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

const output =
`${folder}/scene-${i}.mp4`;


await fetchSceneVideo(
scenes[i].description,
output
);



files.push(output);

}



return files;

}
