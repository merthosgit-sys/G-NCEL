import "dotenv/config";

import fs from "fs/promises";


import {
generateShortScript
}
from "../../../packages/ai-engine/src/gemini.js";


import {
generateVoice
}
from "../../../packages/voice-engine/src/index.js";


import {
fetchSceneVideo
}
from "../../../packages/media-engine/src/index.js";


import {
renderShort,
createSubtitle
}
from "../../../packages/render-engine/src/index.js";



const COUNT = 3;



async function generateOne(
index:number
){


console.log(
`===== SHORT ${index} START =====`
);



const raw =
await generateShortScript(
`teknoloji tarihi bölüm ${index}`
);



const data =
JSON.parse(raw);



const folder =
`output/final/short-${index}`;



await fs.mkdir(
folder,
{
recursive:true
}
);



const video =
await fetchSceneVideo(
data.scenes[0].description,
`${folder}/video.mp4`
);



const audio =
await generateVoice(
data.narrationText,
`${folder}/voice.wav`
);



const subtitle =
await createSubtitle(
data.narrationText,
`${folder}/subtitle.srt`
);



await renderShort(
video,
audio,
subtitle,
`${folder}/short.mp4`
);



console.log(
`SHORT ${index} DONE`
);



}



async function main(){


console.log(
"===== SHORTS FACTORY BATCH ====="
);



for(
let i=1;
i<=COUNT;
i++
){

await generateOne(i);

}



console.log(
"ALL SHORTS CREATED"
);


}



main()
.catch(
error=>{

console.error(error);

process.exit(1);

}
);
