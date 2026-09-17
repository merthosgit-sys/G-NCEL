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


const key =
niche
.toLowerCase()
.replace(
/[^a-z0-9]/g,
"-"
);



const cached =
await readCache(key);



if(cached){

console.log(
"Using cached AI script"
);

return cached;

}



try{


console.log(
"Generating new AI script"
);



const response =
await ai.models.generateContent({

model:
"gemini-3.6-flash",


contents:
`
Create Turkish YouTube Shorts JSON.

Topic:
${niche}

Return:

{
"title":"",
"hook":"",
"script":"",
"scenes":[]
}
`

});



const text =
response.text ?? "";



await saveCache(
key,
text
);


return text;



}
catch(error){


console.log(
"Gemini unavailable, using fallback"
);


const fallback =
generateFallbackScript(
niche
);



await saveCache(
key,
fallback
);



return fallback;


}


}
