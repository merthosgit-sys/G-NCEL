import "dotenv/config";


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
concatVideos,
createSubtitle,
renderShort
}
from "../../../packages/render-engine/src/index.js";


import {
generateVoice
}
from "../../../packages/voice-engine/src/index.js";


import fs from "fs/promises";



const count =
Number(
process.env.SHORTS_COUNT ?? 3
);



async function generateVideo(
topic:string,
index:number
){


console.log(
"VIDEO:",
index
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



const audio =
`${folder}/voice.wav`;



await generateVoice(
data.narrationText,
audio
);



const subtitle =
`${folder}/subtitle.srt`;



await createSubtitle(
audio,
subtitle
);



const final =
`output/final/short-${index}.mp4`;



await renderShort(
merged,
audio,
subtitle,
final
);



console.log(
"FINAL:",
final
);



}



async function main(){


const topics =
await createTopics(
process.env.SHORTS_TOPIC ??
"teknoloji",
count
);



console.log(
topics
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
