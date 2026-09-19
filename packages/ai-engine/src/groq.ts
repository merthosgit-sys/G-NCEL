import "dotenv/config";

import OpenAI from "openai";



const apiKey =
process.env.GROQ_API_KEY;



if(!apiKey){

    throw new Error(
        "GROQ_API_KEY missing"
    );

}



const client =
new OpenAI({

    apiKey,

    baseURL:
    "https://api.groq.com/openai/v1"

});






export async function generateGroqScript(

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
- 6 sahne oluştur.
- Her sahne için farklı görsel önerisi ver.
- Merak uyandıran anlatım kullan.
- Bilim, teknoloji ve tarih videolarına uygun yaz.
- Açıklama verme.
- Markdown kullanma.

`;



    const response =

    await client.chat.completions.create({

        model:
        "llama-3.3-70b-versatile",


        messages:[

            {

                role:"user",

                content:prompt

            }

        ],


        temperature:0.8

    });




    const text =

    response.choices[0]
    ?.message
    ?.content;



    if(!text){

        throw new Error(
            "Groq empty response"
        );

    }



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
