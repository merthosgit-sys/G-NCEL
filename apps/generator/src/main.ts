import "dotenv/config";


import {

createTopics

}
from "../../../packages/ai-engine/src/planner.js";


import {

generateShortScript

}
from "../../../packages/ai-engine/src/gemini.js";



const count =
Number(
process.env.SHORTS_COUNT ?? 3
);



const mainTopic =
process.env.SHORTS_TOPIC ??
"teknoloji";



async function main(){


console.log(
"===== TOPIC PLANNER ====="
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


console.log(
`
VIDEO ${i+1}
TOPIC:
${topics[i]}
`
);



const script =
await generateShortScript(
topics[i]
);



console.log(
script
);



}


}


main();
