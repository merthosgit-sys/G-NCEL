import { 
    expandKeywords 
} from "./keyword-expander.js"; 


import { 
    cleanKeywords 
} from "./keyword-cleaner.js"; 


import { 
    rankVideos, 
    VideoCandidate 
} from "./video-ranker.js"; 


import { 
    searchPexelsVideos 
} from "./pexels.js"; 





export async function findBestMedia( 

    scene:any, 

    folder:string 

):Promise<VideoCandidate>{ 





    const expanded =

    expandKeywords(

        scene.searchQueries ?? []

    );





    const queries =

    cleanKeywords(

        expanded

    );





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







    const ranked =

    rankVideos(

        videos,

        queries

    );







    if(

        !ranked[0]

    ){

        throw new Error(

            "Ranking failed"

        );

    }







    console.log(

        "BEST MEDIA:",

        ranked[0].url

    );





    return ranked[0];

}
