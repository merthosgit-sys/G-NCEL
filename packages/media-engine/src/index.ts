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


const videos =
await searchVideos(
description
);



const selected =
rankVideo(
videos
);



if(!selected){

throw new Error(
`No video found ${description}`
);

}



await downloadVideo(
selected.link,
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



const result:string[]=[];



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



result.push(file);

}



return result;

}
