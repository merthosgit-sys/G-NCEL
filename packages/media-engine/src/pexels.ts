import axios from "axios";
import fs from "fs/promises";
import path from "path";


const API =
"https://api.pexels.com/videos/search";



function headers(){

return {

Authorization:
process.env.PEXELS_API_KEY ?? ""

};

}



export async function searchVideos(
query:string
){


const response =
await axios.get(
API,
{
headers:headers(),

params:{
query,
orientation:"portrait",
per_page:10
}

}
);



return response.data.videos ?? [];

}



export async function downloadVideo(
url:string,
output:string
){


const response =
await axios.get(
url,
{
responseType:"arraybuffer"
}
);



await fs.mkdir(
path.dirname(output),
{
recursive:true
}
);



await fs.writeFile(
output,
response.data
);



return output;

}



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
`No Pexels result: ${description}`
);

}



const video =
videos
.flatMap(
(v:any)=>v.video_files
)
.find(
(v:any)=>
v.width < v.height
);



if(!video){

throw new Error(
"No portrait clip found"
);

}



await downloadVideo(
video.link,
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



const results:string[]=[];



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



results.push(output);


}



return results;

}
