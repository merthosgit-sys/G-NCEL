import { GoogleGenerativeAI }
from "@google/generative-ai";


const apiKey =
process.env.GEMINI_API_KEY;


if (!apiKey) {

  throw new Error(
    "GEMINI_API_KEY missing"
  );

}


const client =
new GoogleGenerativeAI(
  apiKey
);


export async function generateShortScript(
  niche
) {


  const model =
    client.getGenerativeModel({
      model: "gemini-2.0-flash"
    });


  const prompt = `

You are a professional YouTube Shorts writer.

Topic:
${niche}

Rules:

- Turkish language
- 35 seconds
- Strong first 3 second hook
- Documentary style
- High retention

Return JSON only:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}

`;


  const response =
    await model.generateContent(
      prompt
    );


  return response
    .response
    .text();

}
