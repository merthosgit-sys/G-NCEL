import { GoogleGenAI } from "@google/genai";


const ai =
new GoogleGenAI({
 apiKey:
 process.env.GEMINI_API_KEY
});



export async function createTopics(
topic:string,
count:number
){


try{


const result =
await ai.models.generateContent({

model:
"gemini-3.6-flash",


contents:
`

You are a YouTube Shorts topic planner.

Main topic:

${topic}


Create ${count} completely different Shorts ideas.

Rules:

- Each idea must be unique.
- No repeated subjects.
- High curiosity.
- Suitable for 40 second videos.


Return only JSON array:

[
"topic 1",
"topic 2"
]

`

});



return JSON.parse(
result.text ?? "[]"
);



}
catch{


return Array.from(
{
length:count
},
(_,i)=>
`${topic} ilginç bilgi ${i+1}`
);


}


}
