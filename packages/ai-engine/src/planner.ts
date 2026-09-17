import { GoogleGenAI } from "@google/genai";


const ai =
new GoogleGenAI({

apiKey:
process.env.GEMINI_API_KEY

});



export async function createTopics(
topic:string,
count:number
){


try {


const result =
await ai.models.generateContent({

model:
"gemini-3.6-flash",


contents:

`

Sen profesyonel YouTube Shorts konu planlayıcısısın.


Ana konu:

${topic}


${count} tane birbirinden tamamen farklı video konusu üret.


Kurallar:

- Aynı başlığı tekrar etme
- Her video farklı hikaye olsun
- Merak uyandırıcı olsun
- Shorts formatına uygun olsun


Sadece JSON array döndür.


Örnek:

[
"Ferrari'nin bilinmeyen kuruluş hikayesi",
"Elektrikli arabaların gizli başlangıcı",
"Dünyanın en pahalı arabasının hikayesi"
]

`

});


return JSON.parse(
result.text ?? "[]"
);



}
catch {


return [

`${topic} hakkında bilinmeyen hikayeler`,

`${topic} tarihindeki şaşırtıcı olaylar`,

`${topic} dünyasından ilginç gerçekler`

]
.slice(0,count);


}

}
