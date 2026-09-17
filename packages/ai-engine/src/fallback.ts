export function generateFallbackScript(
  niche: string
) {

return JSON.stringify({

title:
`${niche} hakkında şaşırtıcı gerçekler`,


hook:
"Bu bilgiyi çoğu insan bilmiyor...",


narrationText:
`
Bugün teknoloji tarihinin bilinmeyen bir hikayesine bakıyoruz.

İlk dönem bilgisayarlar bugünkü cihazlardan tamamen farklıydı.

Bu dev makineler çok büyük alan kaplıyor ve sadece özel merkezlerde kullanılabiliyordu.

Zaman içinde teknoloji küçüldü, hızlandı ve hayatımızın vazgeçilmez bir parçası oldu.

Bugün kullandığımız cihazların arkasında yüzlerce yıllık bir gelişim hikayesi var.
`,


scenes:[

{
description:
"old computer laboratory with giant computers",
duration:5
},


{
description:
"vintage technology researchers working",
duration:5
},


{
description:
"first computers history documentary",
duration:5
},


{
description:
"modern smartphone technology",
duration:5
},


{
description:
"future artificial intelligence technology",
duration:5
},


{
description:
"technology evolution timeline",
duration:5
}

]


});

}
