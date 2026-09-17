import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY missing"
  );
}


const client =
  new GoogleGenerativeAI(apiKey);



export async function generateShortScript(
  niche: string
) {


  const model =
    client.getGenerativeModel({
      model: "gemini-3.6-flash"
    });



  const prompt = `

Sen profesyonel YouTube Shorts içerik üreticisisin.

Konu:
${niche}

Kurallar:

- Türkçe
- 35 saniye
- İlk 3 saniye çok güçlü hook
- Merak uyandırıcı anlatım
- Belgesel tarzı

Sadece JSON döndür:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}

`;



  const result =
    await model.generateContent(
      prompt
    );


  return result.response.text();

}
