export function rankVideo(
videos:any[]
){

return videos
.flatMap(
(video:any)=>
video.video_files.map(
(file:any)=>({

...file,

score:
(file.width < file.height ? 100 : 0)
+
(file.height ?? 0)

})
)
)
.sort(
(a,b)=>
b.score-a.score
)
[0];

}
