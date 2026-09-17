import axios from "axios";
import fs from "fs/promises";
import path from "path";


export async function downloadVideo(
url:string,
output:string
){

await fs.mkdir(
path.dirname(output),
{
recursive:true
}
);


const response =
await axios.get(
url,
{
responseType:"arraybuffer"
}
);



await fs.writeFile(
output,
response.data
);



return output;

}
