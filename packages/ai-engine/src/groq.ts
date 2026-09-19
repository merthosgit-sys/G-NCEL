import "dotenv/config";

import OpenAI from "openai";


import {
    cleanAIJson,
    validateScriptJSON
}
from "./json-cleaner.js";







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







const models = [

    "llama-3.3-70b-versatile",

    "qwen-2.5-32b"

];









export async function generateGroqScript(

    topic:string

):Promise<string>{



    let lastError:any;



    for(

        const model of models

    ){



        try {



            console.log(

                "Trying:",

                model

            );





            const response =

            await client.chat.completions.create({

                model,


                messages:[

                    {

                        role:

                        "user",


                        content:

                        prompt(topic)

                    }

                ],



                temperature:

                0.8

            });





            const text =

            response

            .choices[0]

            ?.message

            ?.content;





            if(!text){

                throw new Error(

                    "Empty Groq response"

                );

            }





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

                    "Invalid Groq JSON"

                );

            }





            console.log(

                "Success:",

                model

            );





            return cleaned;



        }

        catch(error){



            console.error(

                model,

                "failed"

            );



            lastError = error;


        }

    }





    throw lastError;

}








function prompt(

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

- Türkçe.
- 6 sahne.
- Her sahnede farklı görsel açıklaması.
- Bilim teknoloji tarih içerikleri.
- Merak uyandıran anlatım.
- Markdown yok.

`;

}
