import { GoogleGenerativeAI } from "@google/generative-ai";


const ai =
new GoogleGenerativeAI(
 process.env.GEMINI_API_KEY
);


export async function generateShortScript(niche){

const model =
ai.getGenerativeModel({
 model:"gemini-2.0-flash"
});


const prompt = `
Sen profesyonel YouTube Shorts senaristisin.

Konu:
${niche}

Kurallar:

- Türkçe
- 35 saniye
- İlk 3 saniye çok güçlü hook
- Bilgilendirici
- Viral format

JSON döndür:

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
