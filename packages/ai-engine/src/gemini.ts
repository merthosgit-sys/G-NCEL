import "dotenv/config";

import {
    GoogleGenerativeAI
}
from "@google/generative-ai";

import type {
    ShortScript
}
from "./types.js";



const apiKey =
process.env.GEMINI_API_KEY;



if(!apiKey){

    throw new Error(
        "GEMINI_API_KEY missing"
    );

}



const client =
new GoogleGenerativeAI(
    apiKey
);



const model =
client.getGenerativeModel(
{
    model:"gemini-2.5-flash"
}
);





export async function generateShortScript(
    topic:string
):Promise<string>{



    const prompt = `

Sen profesyonel YouTube Shorts senaristisin.

Konu:

${topic}


JSON formatında cevap ver.


Kurallar:

- 30-60 saniyelik video olacak.
- 6 sahne üret.
- Her sahnenin görsel açıklaması ayrı olsun.
- Her sahnenin narration metni ayrı olsun.
- Türkçe yaz.
- Açıklama veya markdown kullanma.


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


`;



    const result =
    await model.generateContent(
        prompt
    );



    const text =
    result.response.text();



    return cleanJSON(
        text
    );

}





function cleanJSON(
    value:string
):string{


    return value
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
