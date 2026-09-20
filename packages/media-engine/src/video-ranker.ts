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



    return videos

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





    const queryText =

    keywords

    .join(" ")

    .toLowerCase();







    /*
       Keyword uyumu
    */


    const words =

    queryText

    .split(/\s+/)

    .filter(

        word =>

        word.length > 2

    );





    for(

        const word of words

    ){


        if(

            text.includes(word)

        ){

            score += 10;

        }


    }





    /*
       Shorts dikey avantajı
    */


    if(

        video.height >

        video.width

    ){

        score +=40;

    }

    else{

        score -=30;

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

        video.height >=1080

    ){

        score +=25;

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

        score +=15;

    }

    else{

        score -=10;

    }






    return score;


}
