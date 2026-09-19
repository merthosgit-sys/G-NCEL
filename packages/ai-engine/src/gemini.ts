import "dotenv/config";

import {
    GoogleGenAI
}
from "@google/genai";



const apiKey =
process.env.GEMINI_API_KEY;



if(!apiKey){

    throw new Error(
        "GEMINI_API_KEY missing"
    );

}



const ai =
new GoogleGenAI(
    {
        apiKey
    }
);







export async function generateShortScript(

    topic:string

):Promise<string>{



    const prompt = `

Sen profesyonel YouTube Shorts senaristisin.


Konu:

${topic}



Sadece JSON döndür.


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



Kurallar:

- Türkçe yaz.
- Tam 6 sahne üret.
- Her sahne için farklı görsel açıklaması oluştur.
- Her sahnenin narration metni ayrı olsun.
- Toplam süre 30-60 saniye olsun.
- Markdown kullanma.
- Açıklama yazma.
- Sadece JSON döndür.

`;





    const response =

    await ai.models.generateContent(

        {

            model:

            "gemini-3.6-flash",


            contents:

            prompt

        }

    );





    const text =

    response.text;



    if(!text){

        throw new Error(
            "Gemini returned empty response"
        );

    }



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
