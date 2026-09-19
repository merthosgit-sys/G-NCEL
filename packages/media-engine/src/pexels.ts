import "dotenv/config";

import axios from "axios";


import {
    VideoCandidate
}
from "./video-ranker.js";






const apiKey =

process.env.PEXELS_API_KEY;





if(!apiKey){

    throw new Error(

        "PEXELS_API_KEY missing"

    );

}









export async function searchPexelsVideos(

    query:string

):Promise<VideoCandidate[]>{



    const response =

    await axios.get(

        "https://api.pexels.com/videos/search",

        {

            headers:{

                Authorization:apiKey

            },


            params:{

                query,

                per_page:15,

                orientation:"landscape"

            }

        }

    );






    const videos =

    response.data.videos ?? [];






    return videos

    .map(

        (video:any)=>{



            const files =

            video.video_files ?? [];





            const best =

            files

            .filter(

                (f:any)=>

                f.width >=720

            )

            .sort(

                (

                    a:any,

                    b:any

                )=>

                b.width-a.width

            )[0];





            if(!best){

                return null;

            }





            return {

                id:

                video.id,


                width:

                best.width,


                height:

                best.height,


                duration:

                video.duration,


                title:

                video.url ?? "",


                url:

                video.url,


                videoUrl:

                best.link

            };



        }

    )

    .filter(Boolean);

}
