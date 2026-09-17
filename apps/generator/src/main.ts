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
renderShort
}
from "../../../packages/render-engine/src/index.js";



const COUNT = 3;



async function generateOne(
index:number
){

console.log(
`===== SHORT ${index} START =====`
);



const script =
await generateShortScript(
`teknoloji tarihi bölüm ${index}`
);



const data =
JSON.parse(script);



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
`${folder}/source.mp4`
);



const audio =
await generateVoice(
data.narrationText,
`${folder}/voice.wav`
);



await renderShort(
video,
audio,
`${folder}/short.mp4`
);



console.log(
`SHORT ${index} COMPLETED`
);



return `${folder}/short.mp4`;

}



async function main(){


console.log(
"===== SHORTS FACTORY BATCH ====="
);



const results = [];



for(
let i=1;
i<=COUNT;
i++
){

try{


const result =
await generateOne(i);


results.push(result);


}
catch(error){

console.error(
`Short ${i} failed`,
error
);

}


}



console.log(
"===== ALL DONE ====="
);


console.log(results);



}



main()
.catch(
error=>{

console.error(error);

process.exit(1);

}
);
