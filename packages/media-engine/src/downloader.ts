import axios from "axios";
import fs from "fs";


export async function downloadVideo(
 url:string,
 output:string
){

 const response =
 await axios.get(
  url,
  {
   responseType:"stream"
  }
 );


 const writer =
 fs.createWriteStream(
  output
 );


 response.data.pipe(writer);


 return new Promise(
  (resolve,reject)=>{

   writer.on(
    "finish",
    resolve
   );

   writer.on(
    "error",
    reject
   );

  }
 );

}
