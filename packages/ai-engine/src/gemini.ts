import { GoogleGenAI } from "@google/genai";


import {
readCache,
saveCache
}
from "./cache.js";


import {
generateFallbackScript
}
from "./fallback.js";



const apiKey =
process.env.GEMINI_API_KEY;



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
"Using cached script"
);

return cached;

}



try{


console.log(
"Generating AI script"
);



const result =
await ai.models.generateContent({

model:
"gemini-3.6-flash",


contents:
`

Sen profesyonel YouTube Shorts senaristisin.


Konu:
${niche}


Kurallar:

- Türkçe
- 35-45 saniye
- İnsan gibi konuşma dili
- İlk 3 saniye güçlü giriş
- Belgesel tarzı
- Seslendirme için doğal metin


Sadece JSON döndür:


{
"title":"",
"hook":"",
"narrationText":"",
"scenes":[

{
"description":"",
"duration":5
}

]

}

6 sahne oluştur.

`

});



const text =
result.text ?? "";



await saveCache(
cacheKey,
text
);



return text;



}
catch{


console.log(
"Gemini fallback"
);


const fallback =
generateFallbackScript(
niche
);



await saveCache(
cacheKey,
fallback
);



return fallback;


}


}
