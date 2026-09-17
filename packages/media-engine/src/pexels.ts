import axios from "axios";


const API =
"https://api.pexels.com/videos/search";


export async function searchVideos(
query:string
){

const response =
await axios.get(
API,
{
headers:{
Authorization:
process.env.PEXELS_API_KEY ?? ""
},

params:{
query,
orientation:"portrait",
per_page:15
}

}
);


return response.data.videos ?? [];

}
