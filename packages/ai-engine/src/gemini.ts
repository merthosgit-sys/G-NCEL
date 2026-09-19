import "dotenv/config";

import {
    GoogleGenAI
}
from "@google/genai";


import {
    generateGroqScript
}
from "./groq.js";





const apiKey =
process.env.GEMINI_API_KEY;



if(!apiKey){

    throw new Error(
        "GEMINI_API_KEY missing"
    );

}



const ai =
new GoogleGenAI({

    apiKey

});









export async function generateShortScript(

    topic:string

):Promise<string>{



    console.log(
        "AI SCRIPT GENERATION:",
        topic
    );



    try {



        console.log(
            "Trying Gemini..."
        );



        const result =

        await ai.models.generateContent({

            model:

            "gemini-3.6-flash",


            contents:

            createPrompt(topic)

        });





        const text =

        result.text;



        if(!text){

            throw new Error(
                "Gemini empty response"
            );

        }



        console.log(
            "Gemini success"
        );



        return cleanJSON(
            text
        );



    }

    catch(error:any){



        console.error(
            "Gemini failed:"
        );


        console.error(
            error?.message ?? error
        );



        console.log(
            "Switching to Groq fallback..."
        );



        const fallback =

        await generateGroqScript(

            topic

        );



        console.log(
            "Groq success"
        );



        return cleanJSON(
            fallback
        );


    }


}









function createPrompt(

    topic:string

){



return `

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
- Her sahne için ayrı görsel açıklaması yaz.
- Bilim, teknoloji ve tarih kanalı formatında hazırla.
- İlk 3 saniyede güçlü merak oluştur.
- Anlatım doğal ve akıcı olsun.
- Markdown kullanma.
- Açıklama yazma.
- Sadece JSON döndür.

`;

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
