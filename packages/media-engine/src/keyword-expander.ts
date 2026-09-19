export function expandKeywords(

    queries:string[]

):string[]{



    const result = new Set<string>();





    for(

        const query of queries

    ){



        result.add(

            query

        );





        const lower =

        query.toLowerCase();





        if(

            lower.includes("car") ||

            lower.includes("bmw") ||

            lower.includes("vehicle")

        ){

            result.add(

                "luxury car cinematic"

            );

            result.add(

                "sports car driving"

            );

            result.add(

                "car engine close up"

            );

        }





        if(

            lower.includes("space") ||

            lower.includes("nasa") ||

            lower.includes("planet")

        ){

            result.add(

                "space documentary"

            );


            result.add(

                "galaxy animation"

            );


            result.add(

                "astronomy telescope"

            );

        }







        if(

            lower.includes("electric") ||

            lower.includes("tesla") ||

            lower.includes("energy")

        ){

            result.add(

                "electricity experiment"

            );


            result.add(

                "science laboratory"

            );


            result.add(

                "electrical sparks"

            );

        }







        if(

            lower.includes("history") ||

            lower.includes("ancient") ||

            lower.includes("old")

        ){

            result.add(

                "historical documentary"

            );


            result.add(

                "ancient civilization"

            );


            result.add(

                "museum artifact"

            );

        }


    }





    return Array.from(

        result

    );

}
