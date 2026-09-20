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

    scoreVideo(video)

}))


.sort(

(a,b)=>

b.score-a.score

)


.map(

x=>x.video

);


}



function scoreVideo(

video:VideoCandidate

){


let score=0;



// Shorts dikey

if(video.height > video.width){

score+=50;

}


// yüksek çözünürlük

if(video.height>=1920){

score+=30;

}

else if(video.height>=1080){

score+=20;

}


// ideal süre

if(video.duration>=5 && video.duration<=30){

score+=20;

}



return score;


}
