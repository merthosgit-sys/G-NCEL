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









function selectBestFile(

    files:any[]

){



    const valid =

    files.filter(

        file => {


            if(

                !file.width ||

                !file.height ||

                !file.link

            ){

                return false;

            }


            return true;


        }

    );







    if(

        valid.length === 0

    ){

        return null;

    }








    return valid.sort(

        (

            a,

            b

        )=>{





            const scoreA =

            calculateFileScore(

                a

            );






            const scoreB =

            calculateFileScore(

                b

            );







            return scoreB-scoreA;



        }

    )[0];

}









function calculateFileScore(

    file:any

):number{


    let score = 0;







    /*
        Shorts dikey avantaj
    */


    if(

        file.height >

        file.width

    ){

        score +=50;

    }

    else{

        score -=40;

    }







    /*
        Ideal çözünürlük
    */


    if(

        file.width >=1080 &&

        file.height >=1920

    ){

        score +=40;

    }

    else if(

        file.width >=720

    ){

        score +=20;

    }







    /*
        Çok büyük dosya gereksiz
    */


    if(

        file.width >2160

    ){

        score -=10;

    }







    return score;


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


                per_page:20,


                orientation:"portrait"


            }


        }

    );









    const videos =

    response.data.videos ?? [];









    return videos

    .map(

        (video:any)=>{






            const best =

            selectBestFile(

                video.video_files ?? []

            );







            if(

                !best

            ){

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

                video.duration ?? 0,



                title:

                (

                    video.url ??

                    ""

                ),



                url:

                video.url ?? "",



                videoUrl:

                best.link



            };




        }

    )

    .filter(

        Boolean

    ) as VideoCandidate[];


}
