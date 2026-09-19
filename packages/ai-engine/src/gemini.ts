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



    try{


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

    catch(error){



        console.error(

            "Gemini failed, using Groq"

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

            "AI output format invalid"

        );

    }





    return cleaned;


}









function createDirectorPrompt(

    topic:string

){



return `

Sen profesyonel bir YouTube Shorts AI yönetmenisin.



Görevin:

${topic}

konusunda yüksek kaliteli kısa video planı hazırlamak.



Amaç:

İzleyiciyi ilk 3 saniyede yakalamak.

Videonun sonuna kadar izletmek.

Gerçekçi ve sinematik görüntüler kullanmak.





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



GENEL:

- Türkçe yaz.
- Tam 6 sahne üret.
- Her sahne 5-8 saniye arası olsun.
- Toplam süre Shorts formatına uygun olsun.



ANLATIM:

- İlk sahne güçlü merak uyandırsın.
- Basit ama etkileyici anlatım kullan.
- Gereksiz bilgi doldurma.
- İzleyiciyi tutacak hikaye yapısı kullan.



GÖRSELLER:

Her sahne için:

visualPrompt:

gerçekçi film sahnesi gibi yaz.


searchQueries:

stok video araması için İngilizce 3 farklı kelime grubu üret.



Örnek:

Kötü:

"elektrik"


İyi:

"Nikola Tesla laboratory"

"Tesla coil electricity sparks"

"historic electrical experiment"



KAMERA:

Şunlardan uygun olanları kullan:

- cinematic zoom
- slow motion
- aerial shot
- close up
- tracking shot
- macro shot



STİL:

Bilim:

cinematic documentary


Teknoloji:

futuristic realistic


Tarih:

historical documentary


Çocuk:

3D animation





Kesinlikle:

- Markdown kullanma.
- Açıklama yazma.
- JSON dışında hiçbir şey yazma.

`;

}
