interface VideoCandidate {


    id:number;


    width:number;


    height:number;


    duration:number;


    title?:string;


}





export function rankVideos(

    videos:VideoCandidate[]

){



    return videos

    .map(

        video => ({


            video,


            score:

            calculateScore(

                video

            )


        })

    )


    .sort(

        (

            a,

            b

        ) =>

        b.score - a.score

    )

    .map(

        item =>

        item.video

    );

}









function calculateScore(

    video:VideoCandidate

){



    let score = 0;





    // HD kalite

    if(

        video.width >= 1920

    ){

        score += 30;

    }

    else if(

        video.width >=1280

    ){

        score +=20;

    }





    // Shorts için yeterli süre

    if(

        video.duration >=5 &&

        video.duration <=30

    ){

        score +=25;

    }





    // Dikey video avantajı

    if(

        video.height >

        video.width

    ){

        score +=30;

    }





    // Başlık bilgisi

    if(

        video.title

    ){

        score +=15;

    }





    return score;

}
