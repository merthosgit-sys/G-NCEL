export interface VideoCandidate {


    id:number;


    width:number;


    height:number;


    duration:number;


    title:string;


    url:string;


    videoUrl:string;


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

){


    const seen = new Set<number>();


    return videos.filter(

        video => {


            if(

                seen.has(video.id)

            ){

                return false;

            }


            seen.add(video.id);


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





    let keywordMatches = 0;



    for(

        const word of words

    ){


        if(

            text.includes(word)

        ){

            keywordMatches++;

        }


    }




    score +=

    keywordMatches * 12;







    /*
        Shorts format
    */


    if(

        video.height >

        video.width

    ){

        score +=50;

    }

    else{


        score -=40;


    }








    /*
        Çözünürlük
    */


    if(

        video.height >=2160

    ){

        score +=40;

    }

    else if(

        video.height >=1440

    ){

        score +=30;

    }

    else if(

        video.height >=1080

    ){

        score +=20;

    }

    else if(

        video.height >=720

    ){

        score +=10;

    }







    /*
        Süre

        Shorts için ideal
    */


    if(

        video.duration >=5 &&

        video.duration <=60

    ){

        score +=20;

    }

    else if(

        video.duration >120

    ){

        score -=20;

    }






    /*
        Çok küçük videoları düşür
    */


    if(

        video.width <500

    ){

        score -=30;

    }





    return score;


}
