import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY missing"
  );
}


const client =
new GoogleGenerativeAI(apiKey);


export async function generateShortScript(niche) {

  const model =
    client.getGenerativeModel({
      model: "gemini-2.0-flash"
    });


  const prompt = `
Sen profesyonel YouTube Shorts içerik üreticisisin.

Konu:
${niche}

Kurallar:

- Türkçe yaz
- 35 saniye
- İlk 3 saniye güçlü hook
- Merak uyandır
- Bilgi videosu formatı

Sadece JSON dön:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}
`;


  const result =
    await model.generateContent(prompt);


  return result.response.text();
}
