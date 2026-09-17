import "dotenv/config";


import fs from "fs/promises";


import {
createTopics
}
from "../../../packages/ai-engine/src/planner.js";


import {
generateShortScript
}
from "../../../packages/ai-engine/src/gemini.js";


import {
fetchMultipleScenes
}
from "../../../packages/media-engine/src/index.js";


import {
concatVideos
}
from "../../../packages/render-engine/src/index.js";



const count =
Number(
process.env.SHORTS_COUNT ?? 3
);



async function generateVideo(
topic:string,
index:number
){


console.log(
"Creating:",
topic
);



const raw =
await generateShortScript(
topic
);



const data =
JSON.parse(raw);



const folder =
`output/work/${index}`;



await fs.mkdir(
folder,
{
recursive:true
}
);



const clips =
await fetchMultipleScenes(
data.scenes,
folder
);



const merged =
`${folder}/merged.mp4`;



await concatVideos(
clips,
merged
);



console.log(
"VIDEO READY:",
merged
);



}



async function main(){


const topics =
await createTopics(
process.env.SHORTS_TOPIC ?? "teknoloji",
count
);



for(
let i=0;
i<topics.length;
i++
){


await generateVideo(
topics[i],
i+1
);


}


}



main();
