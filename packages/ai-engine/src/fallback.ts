export function generateFallbackScript(
  niche: string
){

return JSON.stringify({

title:
`${niche} hakkında bilinmeyen gerçek`,

hook:
"Bu bilgiyi çoğu insan bilmiyor...",


script:
`
Bugün ${niche} hakkında şaşırtıcı bir bilgiye bakıyoruz.

Geçmişte yaşanan bu olay teknoloji ve insan hayatını büyük ölçüde değiştirdi.

En ilginç nokta ise çoğu kişinin bu hikayeyi hiç duymamış olması.

Takip et, daha fazla ilginç bilgi keşfet.
`,

scenes:[

{
description:
"technology history documentary footage",
duration:8
},

{
description:
"old computer laboratory",
duration:8
},

{
description:
"modern technology future",
duration:8
}

]

});

}
