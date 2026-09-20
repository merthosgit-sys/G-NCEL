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

    .map(video=>({


        video,


        score:

        calculateScore(video)


    }))


    .sort(

        (a,b)=>

        b.score-a.score

    )


    .map(

        item=>

        item.video

    );

}





function calculateScore(

video:VideoCandidate

):number{


    let score = 0;



    // Shorts dikey video

    if(

        video.height >

        video.width

    ){

        score +=50;

    }



    // kalite

    if(

        video.height >=1920

    ){

        score+=30;

    }

    else if(

        video.height >=1080

    ){

        score+=20;

    }



    // ideal shorts süresi

    if(

        video.duration >=5 &&

        video.duration <=60

    ){

        score+=20;

    }



    return score;

}
