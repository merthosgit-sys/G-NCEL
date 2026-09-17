import { generateShortScript }
from "../../../packages/ai-engine/src/gemini.js";


async function main(){

  const script =
    await generateShortScript(
      "teknoloji tarihi"
    );


  console.log(script);

}


main();
