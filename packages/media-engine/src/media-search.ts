import {

    expandKeywords

}

from "./keyword-expander.js";



import {

    rankVideos

}

from "./video-ranker.js";



import {

    searchPexelsVideos

}

from "./pexels.js";








export async function findBestMedia(

    scene:any,

    folder:string

){



    const queries =

    expandKeywords(

        scene.searchQueries

    );





    console.log(

        "MEDIA SEARCH:",

        queries

    );





    let candidates:any[] = [];





    for(

        const query of queries

    ){



        const results =

        await searchPexelsVideos(

            query

        );





        candidates.push(

            ...results

        );



    }





    if(

        candidates.length ===0

    ){

        throw new Error(

            "No media found"

        );

    }





    const ranked =

    rankVideos(

        candidates

    );





    return ranked[0];

}
