import {

    runFFmpeg

}

from "./ffmpeg.js";









export interface CaptionStyle {


    fontSize:number;


    position:string;


    color:string;


}





export const defaultCaptionStyle:CaptionStyle = {


    fontSize:72,


    position:"bottom",


    color:"white"


};









export async function addAnimatedCaptions(

    input:string,

    subtitle:string,

    output:string

):Promise<void>{



    const filter = `

drawtext=

fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:

textfile=${subtitle}:

fontsize=72:

fontcolor=white:

borderw=4:

bordercolor=black:

x=(w-text_w)/2:

y=h-(text_h*3)

`;







    await runFFmpeg([



        "-i",

        input,



        "-vf",

        filter,



        "-c:v",

        "libx264",



        "-preset",

        "medium",



        "-crf",

        "20",



        "-c:a",

        "copy",



        output



    ]);



}
