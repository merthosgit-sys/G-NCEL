export function cleanKeywords(

    keywords:string[]

):string[]{


    const blocked = [

        "electricity experiment",

        "science laboratory",

        "electrical sparks"

    ];



    return [

        ...new Set(

            keywords

        )

    ]

    .filter(

        keyword =>

        !blocked.includes(

            keyword.toLowerCase()

        )

    );

}
