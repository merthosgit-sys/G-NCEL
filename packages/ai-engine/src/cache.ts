import fs from "fs/promises";
import path from "path";


const CACHE_DIR =
"output/cache";


export async function saveCache(
 key:string,
 data:string
){

 await fs.mkdir(
  CACHE_DIR,
  {
   recursive:true
  }
 );


 const file =
 path.join(
  CACHE_DIR,
  `${key}.json`
 );


 await fs.writeFile(
  file,
  data,
  "utf-8"
 );


}



export async function readCache(
 key:string
){


 try {


  const file =
   path.join(
    CACHE_DIR,
    `${key}.json`
   );


  return await fs.readFile(
    file,
    "utf-8"
  );


 }
 catch{

  return null;

 }

}
