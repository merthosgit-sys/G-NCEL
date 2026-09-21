export interface VideoCandidate {


    id:number;


    width:number;


    height:number;


    duration:number;


    title:string;


    url:string;


    videoUrl:string;


}







const usedVideos = new Set<number>();








export function resetVideoHistory(){


    usedVideos.clear();


}









export function rankVideos(

    videos:VideoCandidate[],

    keywords:string[] = []

):VideoCandidate[]{





    const uniqueVideos =

    removeDuplicates(

        videos

    );







    return uniqueVideos

    .map(

        video => ({


            video,


            score:

            calculateScore(

                video,

                keywords

            )


        })

    )


    .sort(

        (a,b)=>

        b.score-a.score

    )


    .map(

        item =>

        item.video

    );


}









function removeDuplicates(

    videos:VideoCandidate[]

):VideoCandidate[]{





    const seen =

    new Set<number>();





    return videos.filter(

        video => {


            if(

                seen.has(video.id)

            ){

                return false;

            }



            seen.add(

                video.id

            );



            return true;


        }

    );



}









function calculateScore(

    video:VideoCandidate,

    keywords:string[]

):number{



    let score = 0;







    const text =

    (

        video.title +

        " " +

        video.url

    )

    .toLowerCase();








    /*
        Aynı video tekrar seçilmesin
    */


    if(

        usedVideos.has(

            video.id

        )

    ){

        score -=100;

    }









    /*
        Keyword eşleşmesi
    */


    const words =

    keywords

    .join(" ")

    .toLowerCase()

    .split(/\s+/)

    .filter(

        word =>

        word.length > 2

    );







    let matches = 0;





    for(

        const word of words

    ){


        if(

            text.includes(word)

        ){

            matches++;

        }


    }






    score +=

    matches * 15;









    /*
        Portrait Shorts avantajı
    */


    if(

        video.height >

        video.width

    ){

        score +=60;

    }

    else{


        score -=50;


    }









    /*
        Çözünürlük
    */


    if(

        video.height >=2160

    ){

        score +=50;

    }

    else if(

        video.height >=1440

    ){

        score +=35;

    }

    else if(

        video.height >=1080

    ){

        score +=25;

    }

    else if(

        video.height >=720

    ){

        score +=10;

    }

    else{


        score -=20;


    }









    /*
        Süre
    */


    if(

        video.duration >=5 &&

        video.duration <=45

    ){

        score +=25;

    }

    else if(

        video.duration >90

    ){

        score -=20;

    }









    /*
        Kalitesiz stok içerik cezası
    */


    const genericWords = [

        "abstract",

        "background",

        "animation",

        "generic",

        "wallpaper",

        "stock"

    ];





    for(

        const word of genericWords

    ){


        if(

            text.includes(word)

        ){

            score -=15;


        }


    }








    return score;


}









export function markVideoUsed(

    id:number

){


    usedVideos.add(

        id

    );


}
