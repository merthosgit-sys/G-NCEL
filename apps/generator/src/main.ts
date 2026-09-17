import "dotenv/config";


import {
 generateShortScript
}
from "../../../packages/ai-engine/src/gemini.js";


import {
 fetchSceneVideo
}
from "../../../packages/media-engine/src/index.js";



async function main(){


const script =
await generateShortScript(
"teknoloji tarihi"
);



console.log(
"===== SCRIPT ====="
);


console.log(script);



await fetchSceneVideo(
"old computer laboratory",
"output/assets/scene-01.mp4"
);



console.log(
"Media pipeline completed"
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
