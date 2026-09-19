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

    videos:VideoCandidate[]

):VideoCandidate[]{



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

        b.score -

        a.score

    )


    .map(

        item =>

        item.video

    );


}









function calculateScore(

    video:VideoCandidate

):number{



    let score = 0;





    // yüksek çözünürlük

    if(

        video.width >=1920

    ){

        score +=30;

    }

    else if(

        video.width >=1280

    ){

        score +=20;

    }







    // Shorts için uygun süre

    if(

        video.duration >=5 &&

        video.duration <=30

    ){

        score +=25;

    }







    // Dikey videoya öncelik

    if(

        video.height >

        video.width

    ){

        score +=30;

    }







    // Başlık varsa

    if(

        video.title &&

        video.title.length >0

    ){

        score +=15;

    }







    return score;

}
