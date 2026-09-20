export function expandKeywords(

queries:string[]

):string[]{


const result:string[]=[];



for(const q of queries){


if(!result.includes(q)){

result.push(q);

}


}



return result.slice(0,6);


}
