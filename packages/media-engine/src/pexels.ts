import "dotenv/config";

import axios from "axios";





const apiKey =

process.env.PEXELS_API_KEY;





if(!apiKey){

    throw new Error(

        "PEXELS_API_KEY missing"

    );

}







interface PexelsVideo {


    id:number;


    width:number;


    height:number;


    duration:number;


    title:string;


    url:string;


    videoUrl:string;


}









export async function searchPexelsVideos(

    query:string

):Promise<PexelsVideo[]>{



    console.log(

        "Pexels search:",

        query

    );





    const response =

    await axios.get(

        "https://api.pexels.com/videos/search",

        {


            headers:{


                Authorization:

                apiKey

            },


            params:{


                query,


                per_page:10,


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





            const bestFile =

            files

            .filter(

                (file:any)=>

                file.width >=720

            )

            .sort(

                (

                    a:any,

                    b:any

                )=>

                b.width-a.width

            )[0];





            if(!bestFile){

                return null;

            }





            return {


                id:

                video.id,


                width:

                bestFile.width,


                height:

                bestFile.height,


                duration:

                video.duration,


                title:

                video.url ?? "",


                url:

                video.url,


                videoUrl:

                bestFile.link

            };



        }

    )

    .filter(Boolean);

}
