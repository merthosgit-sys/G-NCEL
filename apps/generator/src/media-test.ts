import {
 searchVideos
} from "../../../packages/media-engine/src/pexels.js";


const videos =
await searchVideos(
 "old computer"
);


console.log(
 videos.length
);
