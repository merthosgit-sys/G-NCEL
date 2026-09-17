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
concatVideos,
createSubtitle,
renderShort
}
from "../../../packages/render-engine/src/index.js";


import {
generatePiperVoice,
enhanceAudio
}
from "../../../packages/voice-engine/src/index.js";



const count =
Number(
process.env.SHORTS_COUNT ?? "3"
);



const mainTopic =
process.env.SHORTS_TOPIC ??
"teknoloji";



async function generateVideo(
topic:string,
index:number
){


console.log(
"VIDEO:",
index
);


console.log(
"TOPIC:",
topic
);



const rawScript =
await generateShortScript(
topic
);



const data =
JSON.parse(
rawScript
);



const folder =
`output/work/${index}`;



await fs.mkdir(
folder,
{
recursive:true
}
);



await fs.writeFile(

`${folder}/script.json`,

JSON.stringify(
data,
null,
2
),

"utf8"

);



console.log(
"Downloading scenes..."
);



const clips =
await fetchMultipleScenes(
data.scenes,
folder
);



console.log(
"Clips:",
clips
);



const merged =
`${folder}/merged.mp4`;



await concatVideos(
clips,
merged
);



console.log(
"Video merged:",
merged
);



//
// VOICE
//


const rawAudio =
`${folder}/voice-raw.wav`;



const finalAudio =
`${folder}/voice.wav`;



await generatePiperVoice(

data.narrationText,

rawAudio,

index

);



await enhanceAudio(

rawAudio,

finalAudio

);



console.log(
"Voice ready:",
finalAudio
);




//
// SUBTITLE
//


const subtitle =
`${folder}/subtitle.srt`;



await createSubtitle(

finalAudio,

subtitle

);



console.log(
"Subtitle ready:",
subtitle
);




//
// FINAL RENDER
//


const finalVideo =
`output/final/short-${index}.mp4`;



await renderShort(

merged,

finalAudio,

subtitle,

finalVideo

);



console.log(
"FINAL VIDEO:",
finalVideo
);



return finalVideo;

}





async function main(){


console.log(
"===== SHORTS FACTORY V3 ====="
);



const topics =
await createTopics(

mainTopic,

count

);



console.log(
topics
);



const results:string[]=[];



for(
let i=0;
i<topics.length;
i++
){

try {


const result =
await generateVideo(

topics[i],

i+1

);


results.push(
result
);


}
catch(error){


console.error(
`VIDEO ${i+1} FAILED`
);


console.error(
error
);


}

}



console.log(
"ALL DONE"
);


console.log(
results
);


}



main()
.catch(
error=>{

console.error(error);

process.exit(1);

}
);
