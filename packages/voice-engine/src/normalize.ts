export function normalizeText(
    text:string
){

return text

.replace(
/[#*_{}[\]"]/g,
""
)

.replace(
/\s+/g,
" "
)

.replace(
/\./g,
". "
)

.trim();

}
