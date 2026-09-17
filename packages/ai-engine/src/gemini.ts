import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY missing"
  );
}


const client =
  new GoogleGenerativeAI(apiKey);



const MODELS = [
  "gemini-3.6-flash",
  "gemini-3.6-flash-lite"
];



function wait(ms:number){

  return new Promise(
    resolve => setTimeout(resolve, ms)
  );

}



export async function generateShortScript(
  niche:string
){


  let lastError;



  for (const modelName of MODELS) {


    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {


      try {


        console.log(
          `Trying model: ${modelName} attempt: ${attempt}`
        );


        const model =
          client.getGenerativeModel({
            model: modelName
          });



        const result =
          await model.generateContent(`

You are a professional YouTube Shorts creator.

Create a Turkish YouTube Shorts script.

Topic:
${niche}


Rules:

- Turkish language
- 35 seconds
- Strong hook in first 3 seconds
- High retention
- Documentary style


Return only JSON:

{
"title":"",
"hook":"",
"script":"",
"scenes":[
 {
  "description":"",
  "duration":0
 }
]
}

`);


        return result.response.text();



      } catch(error) {


        lastError = error;


        console.log(
          `${modelName} failed attempt ${attempt}`
        );


        await wait(
          attempt * 3000
        );

      }

    }

  }



  throw lastError;

}
