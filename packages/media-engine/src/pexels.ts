import axios from "axios";


const API_KEY =
process.env.PEXELS_API_KEY;


if(!API_KEY){

 throw new Error(
  "PEXELS_API_KEY missing"
 );

}


const client =
axios.create({

 baseURL:
 "https://api.pexels.com/videos",

 headers:{
  Authorization:API_KEY
 }

});



export async function searchVideos(
 query:string
){

 const response =
 await client.get(
 "/search",
 {
  params:{
   query,
   orientation:"portrait",
   size:"large",
   per_page:10
  }
 }
 );


 return response.data.videos;

}
