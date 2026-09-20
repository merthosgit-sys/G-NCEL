export function expandKeywords(

    queries:string[]

):string[]{



    const result = new Set<string>();



    for(

        const query of queries

    ){


        result.add(query);



        const lower =

        query.toLowerCase();



        if(

            lower.includes("tesla")

        ){

            result.add(

                "Tesla laboratory"

            );


            result.add(

                "Tesla coil"

            );


            result.add(

                "wireless electricity"

            );

        }




        if(

            lower.includes("car")

            ||

            lower.includes("automobile")

        ){


            result.add(

                "classic car history"

            );


            result.add(

                "old automobile"

            );


            result.add(

                "vintage engine"

            );


        }




        if(

            lower.includes("space")

        ){


            result.add(

                "space documentary"

            );


            result.add(

                "planet earth"

            );


        }



    }



    return Array.from(result);

}
