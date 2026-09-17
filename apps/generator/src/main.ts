import "dotenv/config";

import {
  generateShortScript
} from "../../../packages/ai-engine/src/gemini.js";


async function main() {

  try {

    const result =
      await generateShortScript(
        "teknoloji tarihi"
      );


    console.log(
      "===== GENERATED SHORT ====="
    );


    console.log(result);


  } catch (error) {

    console.error(
      "Generation failed:",
      error
    );

    process.exit(1);
  }
}


main();
