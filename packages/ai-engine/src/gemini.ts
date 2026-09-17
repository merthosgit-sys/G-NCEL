import { GoogleGenAI } from "@google/genai";


const apiKey =
  process.env.GEMINI_API_KEY;


if (!apiKey) {

  throw new Error(
    "GEMINI_API_KEY missing"
  );

}


const ai =
  new GoogleGenAI({
    apiKey
  });



export async function generateShortScript(
  niche: string
) {


  const response =
    await ai.models.generateContent({

      model:
        "gemini-3.6-flash",


      contents:
`
Sen profesyonel YouTube Shorts içerik üreticisisin.

Konu:
${niche}

Kurallar:

- Türkçe
- 35 saniye
- İlk 3 saniye güçlü hook
- Bilgilendirici
- Belgesel tarzı
- İzleyiciyi sonuna kadar tutacak anlatım


Sadece JSON döndür:

{
"title":"",
"hook":"",
"script":"",
"scenes":[
 {
  "description":"",
  "duration":5
 }
]
}
`

    });



  return (
    response.text ??
    ""
  );

}
