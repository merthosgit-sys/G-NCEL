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









const ai =

apiKey

?

new GoogleGenAI({

    apiKey

})

:

null;









export async function generateShortScript(

    topic:string

):Promise<string>{



    try{



        if(!ai){

            throw new Error(

                "Gemini API key missing"

            );

        }







        console.log(

            "AI Director: Gemini"

        );







        const response =

        await ai.models.generateContent({



            model:

            "gemini-3.6-flash",



            contents:

            createDirectorPrompt(

                topic

            )



        });







        const text =

        response.text;







        if(!text){

            throw new Error(

                "Gemini empty response"

            );

        }







        return validateResult(

            text

        );







    }

    catch(error:any){



        console.error(

            "Gemini failed"

        );



        console.error(

            error?.message ?? error

        );





        console.log(

            "Switching to Groq..."

        );





        return await generateGroqScript(

            topic

        );



    }


}









function validateResult(

    text:string

):string{



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

            "Invalid Gemini JSON"

        );

    }







    return cleaned;


}









function createDirectorPrompt(

    topic:string

){



return `


Konu:

${topic}



Sen profesyonel YouTube Shorts AI yönetmenisin.



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
- 6 sahne oluştur.
- Her sahne için farklı görsel üret.
- Her sahneye İngilizce 3 medya arama kelimesi ekle.
- İlk 3 saniye güçlü hook olsun.
- Sinematik belgesel tarzı kullan.
- Markdown yok.
- JSON dışında cevap verme.

`;

}
