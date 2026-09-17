import "dotenv/config";


import {
 generateShortScript
}
from "../../../packages/ai-engine/src/gemini.js";


import {
 fetchSceneVideo
}
from "../../../packages/media-engine/src/index.js";


import {
 generateVoice
}
from "../../../packages/voice-engine/src/index.js";


import {
 renderShort
}
from "../../../packages/render-engine/src/index.js";



async function main(){


console.log(
"===== SHORTS FACTORY START ====="
);



const script =
await generateShortScript(
"teknoloji tarihi"
);



console.log(
"AI SCRIPT:"
);


console.log(script);



const video =
await fetchSceneVideo(
"old computer laboratory",
"output/assets/video.mp4"
);



const audio =
await generateVoice(
script,
"output/audio/voice.wav"
);



await renderShort(
video,
audio,
"output/final/short.mp4"
);



console.log(
"===== SHORT CREATED ====="
);



}



main()
.catch(
error=>{

 console.error(
  error
 );

 process.exit(1);

}
);
