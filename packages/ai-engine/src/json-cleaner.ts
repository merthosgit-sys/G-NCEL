export function cleanAIJson(

    text:string

):string{



    let cleaned = text.trim();





    cleaned = cleaned

        .replace(

            /```json/g,

            ""

        )

        .replace(

            /```/g,

            ""

        )

        .trim();






    const first =

    cleaned.indexOf("{");



    const last =

    cleaned.lastIndexOf("}");





    if(

        first !== -1 &&

        last !== -1

    ){

        cleaned =

        cleaned.substring(

            first,

            last + 1

        );

    }






    return cleaned;

}







export function validateScriptJSON(

    value:any

):boolean{



    if(!value){

        return false;

    }



    if(

        typeof value.title !== "string"

    ){

        return false;

    }



    if(

        !Array.isArray(value.scenes)

    ){

        return false;

    }





    if(

        value.scenes.length === 0

    ){

        return false;

    }





    for(

        const scene of value.scenes

    ){



        if(

            typeof scene.id !== "number"

        ){

            return false;

        }



        if(

            typeof scene.visualPrompt !== "string"

        ){

            return false;

        }



        if(

            typeof scene.narration !== "string"

        ){

            return false;

        }


    }





    return true;

}
