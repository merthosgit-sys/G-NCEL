import "dotenv/config";


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




async function main(){


console.log(
"===== SHORTS FACTORY V2 ====="
);



const raw =
await generateShortScript(
"teknoloji tarihi"
);



const data =
JSON.parse(raw);



console.log(
data.title
);



const narration =
data.narrationText;



await generateVoice(
narration,
"output/audio/voice.wav"
);



const firstScene =
data.scenes[0];



await fetchSceneVideo(
firstScene.description,
"output/assets/video.mp4"
);



await renderShort(
"output/assets/video.mp4",
"output/audio/voice.wav",
"output/final/short.mp4"
);



console.log(
"SHORT CREATED"
);



}


main()
.catch(
err=>{

console.error(err);

process.exit(1);

}
);
