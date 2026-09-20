export function rankVideo(

    video:any,

    query:string

){


    let score = 0;



    const text =
    JSON.stringify(video)
    .toLowerCase();



    const words =
    query
    .toLowerCase()
    .split(" ");



    for(
        const word of words
    ){

        if(
            text.includes(word)
        ){

            score += 10;

        }

    }



    if(
        video.duration > 5 &&
        video.duration < 60
    ){

        score += 5;

    }



    if(
        video.width >= 1080
    ){

        score += 5;

    }



    return score;

}
