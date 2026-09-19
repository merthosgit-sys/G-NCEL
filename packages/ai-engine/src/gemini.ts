import "dotenv/config";

import {
    GoogleGenerativeAI
}
from "@google/generative-ai";



const apiKey =
process.env.GEMINI_API_KEY;



if(!apiKey){

    throw new Error(
        "Missing GEMINI_API_KEY"
    );

}



const genAI =
new GoogleGenerativeAI(
    apiKey
);



const model =
genAI.getGenerativeModel(
{

    model:
    "gemini-2.0-flash"

}
);





export async function generateShortScript(

    topic:string

):Promise<string>{



    const prompt = `

You are a professional YouTube Shorts script writer.

Create a Turkish short video script.

Topic:

${topic}


Return ONLY valid JSON.

Format:

{
"title":"",
"hook":"",
"scenes":[

{
"id":1,
"visualPrompt":"",
"narration":"",
"estimatedSeconds":5
}

],
"fullNarration":""
}


Rules:

- Exactly 6 scenes.
- Turkish language.
- Each scene has different visualPrompt.
- Narration should be engaging.
- Total length 30-60 seconds.
- No markdown.
- No explanation.

`;



    const result =

    await model.generateContent(
        prompt
    );



    const text =

    result.response.text();



    return text

        .replace(
            /```json/g,
            ""
        )

        .replace(
            /```/g,
            ""
        )

        .trim();

}
