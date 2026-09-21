export function cleanKeywords(

    keywords:string[]

):string[]{





    const blacklist = [

        "generic",

        "general",

        "random",

        "stock footage",

        "video clip",

        "nice video",

        "cool video"

    ];







    const replacements = [


        [

            "electrical sparks",

            "electric sparks"

        ],


        [

            "science laboratory",

            "laboratory experiment"

        ],


        [

            "historical documentary",

            "historical footage"

        ]


    ];









    const cleaned:string[] = [];







    for(

        let keyword of keywords

    ){





        keyword =

        keyword

        .trim()

        .toLowerCase();







        if(

            keyword.length <3

        ){

            continue;

        }








        const blocked =

        blacklist.some(

            word =>

            keyword.includes(word)

        );







        if(blocked){

            continue;

        }








        for(

            const [

                oldWord,

                newWord

            ]

            of replacements

        ){


            if(

                keyword === oldWord

            ){

                keyword = newWord;

            }


        }








        if(

            !cleaned.includes(

                keyword

            )

        ){

            cleaned.push(

                keyword

            );

        }



    }







    return cleaned;

}
