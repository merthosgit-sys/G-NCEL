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

                "Trying Groq model:",

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

                        createPrompt(topic)

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







            console.log(

                "Groq model success:",

                model

            );





            return cleanJSON(

                text

            );





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









function createPrompt(

    topic:string

){



return `

Sen profesyonel YouTube Shorts senaristisin.



Konu:

${topic}



Sadece JSON formatında cevap ver.



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
- Her sahnede farklı görsel açıklaması olsun.
- İlk 3 saniye güçlü merak oluşturmalı.
- Bilim, teknoloji, tarih ve ilginç bilgiler kanalına uygun yaz.
- İzleyiciyi videonun sonuna kadar tutacak anlatım kullan.
- Markdown kullanma.
- Açıklama ekleme.
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
