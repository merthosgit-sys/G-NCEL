export function cleanVoiceText(
 text:string
){

return text
.replace(
/[#*_{}[\]"]/g,
""
)
.replace(
/\n+/g,
" "
)
.replace(
/\s+/g,
" "
)
.trim();

}
