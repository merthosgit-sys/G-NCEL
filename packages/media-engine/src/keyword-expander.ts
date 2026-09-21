export function expandKeywords(

    queries:string[]

):string[]{





    const result = new Set<string>();








    for(

        const query of queries

    ){



        const clean =

        query

        .trim();





        if(

            !clean

        ){

            continue;

        }






        result.add(

            clean

        );







        const lower =

        clean.toLowerCase();









        /*
            Tesla
        */


        if(

            lower.includes("tesla")

        ){



            result.add(

                "Nikola Tesla historical laboratory"

            );



            result.add(

                "Tesla coil electricity experiment"

            );



            result.add(

                "Wardenclyffe Tower Tesla"

            );


        }









        /*
            Elektrik / enerji
        */


        if(

            lower.includes("electric")

            ||

            lower.includes("energy")

            ||

            lower.includes("power")

        ){



            result.add(

                "electrical invention history"

            );



            result.add(

                "high voltage experiment"

            );



            result.add(

                "electricity technology close up"

            );


        }









        /*
            Araba
        */


        if(

            lower.includes("car")

            ||

            lower.includes("automobile")

            ||

            lower.includes("vehicle")

        ){



            result.add(

                "classic automobile history"

            );



            result.add(

                "vintage car engine"

            );



            result.add(

                "car technology evolution"

            );


        }









        /*
            Uzay
        */


        if(

            lower.includes("space")

            ||

            lower.includes("planet")

            ||

            lower.includes("nasa")

        ){



            result.add(

                "space exploration documentary"

            );



            result.add(

                "planet earth from space"

            );



            result.add(

                "astronomy telescope footage"

            );


        }









        /*
            Tarih
        */


        if(

            lower.includes("history")

            ||

            lower.includes("ancient")

            ||

            lower.includes("old")

        ){



            result.add(

                "historical archive footage"

            );



            result.add(

                "museum historical artifact"

            );



        }





    }








    return Array.from(

        result

    )

    .slice(

        0,

        12

    );

}
