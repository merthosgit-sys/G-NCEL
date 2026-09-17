import fs from "fs/promises";



export async function createCaptionFile(
 text:string,
 output:string
){


const content = `
1
00:00:00,000 --> 00:00:05,000

${text}

`;



await fs.writeFile(
 output,
 content,
 "utf-8"
);



return output;

}
