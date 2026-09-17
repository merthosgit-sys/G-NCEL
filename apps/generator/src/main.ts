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

generateXTTS,

generatePiperVoice,

enhanceAudio,

selectVoiceStyle

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
"======================"
);


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



const voiceStyle =
selectVoiceStyle(
data.scenes?.[0] ?? {}
);



console.log(
"Voice style:",
voiceStyle
);



try {


await generateXTTS(

data.narrationText,

rawAudio,

voiceStyle

);


console.log(
"XTTS voice created"
);



}

catch(error){


console.log(
"XTTS failed, fallback Piper"
);



await generatePiperVoice(

data.narrationText,

rawAudio,

index

);



}



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
// FINAL VIDEO
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



for(
let i=0;
i<topics.length;
i++
){


try {


await generateVideo(

topics[i],

i+1

);


}

catch(error){


console.error(
`VIDEO ${i+1} ERROR`
);


console.error(
error
);


}

}



console.log(
"DONE"
);



}



main()
.catch(
error=>{

console.error(error);

process.exit(1);

}
);
