export interface RankedVideo {

    id:number;

    width:number;

    height:number;

    duration:number;

    title:string;

    url:string;

    videoUrl:string;

}







export function rankVideo(

    videos:RankedVideo[]

):RankedVideo | undefined {



    return videos

    .sort(

        (

            a,

            b

        ) => {


            const scoreA =

            calculateScore(a);



            const scoreB =

            calculateScore(b);



            return scoreB - scoreA;


        }

    )[0];

}








function calculateScore(

    video:RankedVideo

):number{


    let score = 0;




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





    if(

        video.duration >=5 &&

        video.duration <=30

    ){

        score +=25;

    }





    if(

        video.height >

        video.width

    ){

        score +=25;

    }





    if(

        video.title

    ){

        score +=20;

    }





    return score;

}
