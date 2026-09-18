export interface ShortScene {

    id:number;

    visualPrompt:string;

    narration:string;

    estimatedSeconds:number;

}



export interface ShortScript {

    title:string;

    hook:string;

    scenes:ShortScene[];

    fullNarration:string;

}
