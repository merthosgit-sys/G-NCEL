import fs from "fs/promises";



export async function createSubtitle(
text:string,
output:string
){

const words =
text
.split(" ");



let current =
0;


let srt =
"";


for(
let i=0;
i<words.length;
i+=4
){


const chunk =
words
.slice(
i,
i+4
)
.join(" ");



const start =
formatTime(current);


current += 2;


const end =
formatTime(current);



srt +=
`${i/4+1}
${start} --> ${end}
${chunk}

`;

}



await fs.writeFile(
output,
srt,
"utf-8"
);



return output;

}



function formatTime(
seconds:number
){

const date =
new Date(
seconds*1000
);


return (
"00:" +
String(
date.getUTCMinutes()
)
.padStart(2,"0")
+
":" +
String(
date.getUTCSeconds()
)
.padStart(2,"0")
+
",000"
);

}
