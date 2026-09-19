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

    console.warn(

        "GROQ_API_KEY missing, Groq fallback disabled"

    );

}







const client =

apiKey

?

new OpenAI({

    apiKey,

    baseURL:

    "https://api.groq.com/openai/v1"

})

:

null;









const models = [

    "llama-3.3-70b-versatile",

    "llama-3.1-8b-instant",

    "openai/gpt-oss-20b"

];









export async function generateGroqScript(

    topic:string

):Promise<string>{



    if(!client){

        throw new Error(

            "Groq API key missing"

        );

    }







    let lastError:any;







    for(

        const model of models

    ){



        try{



            console.log(

                "AI Director fallback:",

                model

            );







            const response =

            await client.chat.completions.create({

                model,



                messages:[

                    {


                        role:"system",


                        content:

                        "Sen profesyonel YouTube Shorts AI yönetmenisin."

                    },


                    {

                        role:"user",


                        content:

                        createDirectorPrompt(

                            topic

                        )

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

                    "Groq empty response"

                );

            }







            const cleaned =

            cleanAIJson(

                text

            );







            const json =

            JSON.parse(

                cleaned

            );







            if(

                !validateScriptJSON(

                    json

                )

            ){

                throw new Error(

                    "Invalid Groq JSON"

                );

            }







            console.log(

                "Groq success:",

                model

            );







            return cleaned;







        }

        catch(error:any){



            console.error(

                "Groq failed:",

                model

            );



            console.error(

                error?.message ?? error

            );



            lastError = error;



        }


    }







    throw lastError;

}









function createDirectorPrompt(

    topic:string

){



return `


Konu:

${topic}



Sen profesyonel YouTube Shorts AI yönetmenisin.



Bu konu için sinematik kısa video planı oluştur.



Sadece JSON döndür.



Format:



{

"title":"",

"hook":"",


"contentType":"science",


"style":{

"visual":"cinematic realistic",

"tone":"mysterious"

},


"scenes":[

{

"id":1,

"duration":6,

"narration":"",

"visualPrompt":"",

"searchQueries":[

"",

"",

""

],

"cameraStyle":"",

"mood":""

}

],


"fullNarration":""

}




Kurallar:

- Türkçe yaz.
- Tam 6 sahne üret.
- İlk sahne güçlü merak oluşturmalı.
- Her sahne için 3 İngilizce arama kelimesi üret.
- Görseller gerçekçi ve sinematik olsun.
- Bilim, teknoloji, tarih içerik kalitesi kullan.
- Markdown kullanma.
- Sadece JSON döndür.

`;

}
