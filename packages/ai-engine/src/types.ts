export type ContentMode =

    | "science"

    | "technology"

    | "history"

    | "kids"

    | "story"

    | "product";





export type VisualStyle =

    | "cinematic_realistic"

    | "documentary"

    | "3d_animation"

    | "cartoon"

    | "futuristic";





export type Tone =

    | "mysterious"

    | "exciting"

    | "educational"

    | "emotional"

    | "fun";








export interface ChannelStyle {


    mode:ContentMode;


    audience:string;


    visualStyle:VisualStyle;


    tone:Tone;


    language:string;


}









export interface Scene {


    id:number;



    duration:number;



    narration:string;



    visualPrompt:string;



    searchQueries:string[];



    cameraStyle:string;



    mood:Tone;



}









export interface ShortScript {


    title:string;



    hook:string;



    contentType:ContentMode;



    style:{

        visual:string;


        tone:string;

    };



    scenes:Scene[];



    fullNarration:string;



}
