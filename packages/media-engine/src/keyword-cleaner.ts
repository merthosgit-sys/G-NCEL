export function cleanKeywords(

    keywords:string[]

):string[]{


    const blocked = [

        "electricity experiment",

        "science laboratory",

        "electrical sparks",

        "generic technology",

        "historical documentary"

    ];



    const unique = [

        ...new Set(

            keywords

        )

    ];



    return unique.filter(

        keyword => {


            const lower =

            keyword.toLowerCase();



            return !blocked.some(

                word =>

                lower.includes(word)

            );


        }

    );

}
