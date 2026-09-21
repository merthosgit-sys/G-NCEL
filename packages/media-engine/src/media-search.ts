import {

    expandKeywords

}

from "./keyword-expander.js";



import {

    cleanKeywords

}

from "./keyword-cleaner.js";



import {

    rankVideos,

    markVideoUsed,

    VideoCandidate

}

from "./video-ranker.js";



import {

    searchPexelsVideos

}

from "./pexels.js";









export async function findBestMedia(


    scene:any,


    folder:string


):Promise<VideoCandidate>{





    const expanded =

    expandKeywords(

        scene.searchQueries ?? []

    );







    let queries =

    cleanKeywords(

        expanded

    );







    /*
       Eğer cleaner her şeyi silerse
       orijinal sorguya dön
    */


    if(

        queries.length === 0

    ){

        queries =

        scene.searchQueries ?? [];

    }








    console.log(

        "MEDIA QUERIES:",

        queries

    );








    let videos:VideoCandidate[] = [];









    for(

        const query of queries

    ){



        try{



            const result =

            await searchPexelsVideos(

                query

            );





            videos.push(

                ...result

            );





        }

        catch(error){



            console.log(

                "Search failed:",

                query

            );


        }


    }









    if(

        videos.length === 0

    ){


        throw new Error(

            "No media candidates found"

        );


    }









    /*
       Aynı video ID tekrarlarını temizle
    */


    const uniqueVideos =

    Array.from(

        new Map(

            videos.map(

                video =>

                [

                    video.id,

                    video

                ]

            )

        )

        .values()

    );









    const ranked =

    rankVideos(

        uniqueVideos,

        queries

    );









    if(

        !ranked[0]

    ){


        throw new Error(

            "Ranking failed"

        );


    }









    const selected =

    ranked[0];







    markVideoUsed(

        selected.id

    );








    console.log(

        "BEST MEDIA:",

        {

            id:selected.id,

            url:selected.url,

            size:

            `${selected.width}x${selected.height}`,

            duration:selected.duration

        }

    );








    return selected;



}
