import { GoogleGenAI } from "@google/genai";

import {
 readCache,
 saveCache
}
from "./cache.js";


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
 niche:string
){


 const cacheKey =
 niche
 .toLowerCase()
 .replace(
  /[^a-z0-9]/g,
  "-"
 );


 const cached =
 await readCache(
  cacheKey
 );


 if(cached){

  console.log(
   "Using cached AI script"
  );

  return cached;

 }



 console.log(
  "Generating new AI script"
 );



 const response =
 await ai.models.generateContent({

  model:
   "gemini-3.6-flash",


  contents:
`
Türkçe YouTube Shorts senaryosu oluştur.

Konu:
${niche}


Kurallar:

- 35 saniye
- Güçlü hook
- Bilgi videosu
- Yüksek izlenme


JSON:

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



 const text =
 response.text ?? "";



 await saveCache(
  cacheKey,
  text
 );


 return text;

}
