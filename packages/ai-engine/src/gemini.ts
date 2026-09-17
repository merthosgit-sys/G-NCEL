import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = process.env.GEMINI_API_KEY;


if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY missing"
  );
}


const client =
  new GoogleGenerativeAI(apiKey);



async function sleep(ms:number){

  return new Promise(
    resolve => setTimeout(resolve, ms)
  );

}



export async function generateShortScript(
  niche:string
){


  const models = [
    "gemini-3.6-flash",
    "gemini-2.5-flash"
  ];



  let lastError;



  for(
    const modelName of models
  ){

    for(
      let attempt = 1;
      attempt <= 3;
      attempt++
    ){

      try {


        const model =
          client.getGenerativeModel({
            model:modelName
          });



        const result =
          await model.generateContent(`

Sen profesyonel YouTube Shorts içerik üreticisisin.

Konu:
${niche}

Kurallar:

- Türkçe
- 35 saniye
- Güçlü ilk 3 saniye
- Yüksek izlenme tutma oranı
- Belgesel tarzı

JSON formatında cevap ver:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}

`);


        return result.response.text();


      }
      catch(error){

        lastError = error;

        console.log(
          `${modelName} deneme ${attempt} başarısız`
        );


        await sleep(
          attempt * 3000
        );

      }

    }

  }



  throw lastError;

}
