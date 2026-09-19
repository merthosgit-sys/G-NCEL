import fs from "fs/promises";






interface WordTiming {


    word:string;


    start:number;


    end:number;


}









export async function createSubtitle(

    audio:string,

    output:string

):Promise<void>{



    console.log(

        "Creating subtitles:",

        audio

    );





    // Burada Whisper entegrasyonu bağlanacak.

    // Şimdilik kaliteli Shorts formatı oluşturuyoruz.



    const demoWords:WordTiming[] = [



        {

            word:"BUNU",

            start:0,

            end:0.5

        },


        {

            word:"KİMSE",

            start:0.5,

            end:1

        },


        {

            word:"BİLMİYOR",

            start:1,

            end:1.7

        }



    ];







    let content =

    "";







    for(

        const item of demoWords

    ){



        content += `

${item.start}

-->

${item.end}

${item.word}



`;



    }







    await fs.writeFile(

        output,

        content,

        "utf8"

    );



}
