import "dotenv/config";

import {
    GoogleGenAI
}
from "@google/genai";


import {
    generateGroqScript
}
from "./groq.js";


import {
    cleanAIJson,
    validateScriptJSON
}
from "./json-cleaner.js";





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



    try {



        console.log(
            "Trying Gemini..."
        );



        const response =

        await ai.models.generateContent({

            model:

            "gemini-3.6-flash",


            contents:

            createPrompt(topic)

        });





        const text =

        response.text;





        if(!text){

            throw new Error(
                "Gemini empty response"
            );

        }





        return validateAndReturn(

            text

        );



    }


    catch(error){



        console.error(

            "Gemini failed"

        );



        console.error(

            error

        );



        console.log(

            "Switching Groq..."

        );



        return await generateGroqScript(

            topic

        );


    }

}









function validateAndReturn(

    text:string

):string{



    const cleaned =

    cleanAIJson(

        text

    );





    const parsed =

    JSON.parse(

        cleaned

    );





    if(

        !validateScriptJSON(

            parsed

        )

    ){

        throw new Error(

            "Invalid Gemini JSON"

        );

    }





    return cleaned;

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
- Her sahne farklı görsel açıklaması içersin.
- İlk 3 saniye güçlü merak oluştur.
- Bilim teknoloji tarih kanalına uygun olsun.
- Markdown kullanma.
- Açıklama yazma.

`;

}
