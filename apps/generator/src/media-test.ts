import {
    searchPexelsVideos
}
from "../../../packages/media-engine/src/pexels.js";




async function test(){


    const videos =

    await searchPexelsVideos(

        "technology laboratory"

    );


    console.log(

        videos

    );


}



test();
