import { GoogleGenAI } from "@google/genai";


import {
generateFallbackScript
}
from "./fallback.js";



const ai =
new GoogleGenAI({

apiKey:
process.env.GEMINI_API_KEY

});



export async function generateShortScript(
topic:string
){


try{


const result =
await ai.models.generateContent({

model:
"gemini-3.6-flash",


contents:

`

Create a Turkish YouTube Shorts script.


Topic:

${topic}


Rules:

- 40 seconds
- Strong hook first sentence
- Natural spoken Turkish
- No robotic sentences


Return JSON:

{
"title":"",
"narrationText":"",
"scenes":[
{
"description":"",
"duration":5
}
]
}


Create 6 scenes.

`

});


return result.text ?? "";



}
catch{


return generateFallbackScript(
topic
);

}


}
