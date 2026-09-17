import { GoogleGenAI } from "@google/genai";


const apiKey =
process.env.GEMINI_API_KEY;


if (!apiKey) {

  throw new Error(
    "GEMINI_API_KEY missing"
  );

}


const ai =
new GoogleGenAI({
  apiKey
});



async function main(){


  const result =
    await ai.models.list();



  for await (
    const model of result
  ){

    console.log(
      "MODEL:",
      model.name
    );


    console.log(
      "METHODS:",
      model.supportedActions
    );

  }


}


main();
