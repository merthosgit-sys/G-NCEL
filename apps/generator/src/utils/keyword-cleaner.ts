export function cleanKeywords(

    keywords:string[]

){


    const banned = [

        "electricity experiment",
        "science laboratory",
        "electrical sparks"

    ];



    const unique =
        [...new Set(keywords)];



    return unique.filter(

        keyword =>

        !banned.includes(
            keyword.toLowerCase()
        )

    );


}
