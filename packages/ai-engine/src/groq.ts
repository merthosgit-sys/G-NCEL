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

                        role:

                        "system",


                        content:

                        "Sen profesyonel YouTube Shorts AI yönetmenisin."

                    },


                    {

                        role:

                        "user",


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

                    "Invalid Groq output"

                );

            }





            console.log(

                "Groq success:",

                model

            );





            return cleaned;





        }

        catch(error){



            console.error(

                "Groq failed:",

                model

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



Bu konu için YouTube Shorts videosu planla.



Sen AI video yönetmenisin.



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
- Her sahne 5-8 saniye olsun.
- İlk sahne çok güçlü hook içersin.
- Her sahne için İngilizce 3 medya arama kelimesi üret.
- Görsel açıklamaları gerçekçi ve sinematik olsun.
- Bilim, teknoloji, tarih içerik kalitesinde yaz.
- İzleyiciyi videonun sonuna kadar tutacak hikaye yapısı kullan.



Görsel arama örneği:



Yanlış:

"elektrik"



Doğru:

"Tesla laboratory"

"electricity experiment sparks"

"vintage science laboratory"



Kamera seçenekleri:

- cinematic zoom
- close up
- tracking shot
- aerial shot
- macro shot



Markdown yok.

Açıklama yok.

Sadece JSON.


`;

}
