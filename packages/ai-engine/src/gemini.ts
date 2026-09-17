import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error("GEMINI_API_KEY missing");
}


const client =
  new GoogleGenerativeAI(apiKey);



export async function generateShortScript(
  niche: string
) {


  const model =
    client.getGenerativeModel({
      model: "gemini-1.5-flash"
    });



  const prompt = `

Türkçe YouTube Shorts senaristi gibi davran.

Konu:
${niche}

Kurallar:

- 35 saniye
- İlk 3 saniye güçlü giriş
- Merak uyandırıcı anlatım
- Belgesel tarzı

Sadece JSON dön:

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

`;



  const result =
    await model.generateContent(
      prompt
    );


  return result.response.text();

}
