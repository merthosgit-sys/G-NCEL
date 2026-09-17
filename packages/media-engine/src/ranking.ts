export function rankVideos(
 videos:any[]
){

 return videos.sort(
  (a,b)=>{

   const aScore =
    (a.width / a.height)
    +
    a.duration;


   const bScore =
    (b.width / b.height)
    +
    b.duration;


   return bScore-aScore;

  }
 );

}
