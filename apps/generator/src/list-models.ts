import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey =
process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY missing"
  );
}


const client =
new GoogleGenerativeAI(apiKey);



async function main(){

  const models =
    await client.listModels();


  for(
    const model of models.models
  ){

    console.log(
      "MODEL:",
      model.name
    );

    console.log(
      "METHODS:",
      model.supportedGenerationMethods
    );

  }

}


main();
