import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function generateShortScript(
  niche: string
) {

  const model =
    client.getGenerativeModel({
      model: "gemini-2.0-flash"
    });


  const result =
    await model.generateContent(`
Create a YouTube Shorts script.

Language: Turkish

Niche:
${niche}

Rules:
- 35 seconds
- Strong first 3 second hook
- Documentary style
- Return JSON only

Structure:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}

`);


  return result.response.text();
}
