
/**
 * Unformatted JSON Mock data
 *
 * Mock represents unformatted JSON
 */
export const json_unformatted = `
[{"id": "61030c7091c53833d1eca82d",
"index": 0,"guid": "5afca36b-7be1-4159-a23c-405ac35165ba","isActive": true,
"balance":     "$1,599.85","picture": "http://placehold.it/32x32", "age": 30,
"eyeColor": "green","name": "Gamble Rosario","gender": "male","company": "KROG",
"email": "gamblerosario@krog.com",
"phone": "+1 (976) 459-2486",
"address": "630 Berry Street, Hessville, Palau, 4266",
"about": "Aliquip occaecat sint sunt quis tempor veniam aliquip incididunt pariatur nulla exercitation. Duis esse laboris ipsum dolore fugiat nisi officia ea ut est. Laborum irure cillum esse veniam id laboris irure magna sunt proident. Fugiat excepteur aute aute excepteur. Esse dolor cupidatat ipsum minim enim ea occaecat cupidatat. Laborum aute ea ut eu nulla amet quis duis aute ipsum Lorem eiusmod. Magna duis Lorem ea nisi veniam magna irure cupidatat.\r\n",
"registered": "2014-03-28T08:33:01 -01:00",
"latitude": -5.723721,
"longitude": 102.693916,
"tags": [
"reprehenderit",
"do",
"quis",
"ad",
"est",
"id",
"eu"
],
"friends": [
{"id": 0,"name": "Winnie Kerr"
},
{
"id": 1,
"name": "Wade Gutierrez"
},
{
"id": 2,
"name": "Wanda Tillman"
}
],
"greeting": "Hello, Gamble Rosario! You have 2 unread messages.",
"favoriteFruit": "banana"
},
{
"id": "61030c705a5f654cf865c68c",
"index": 1,
"guid": "bd7ae96b-9571-4693-a6d6-b50e964d9a96",
"isActive": false,
"balance": "$2,106.13",
"picture":

"http://placehold.it/32x32",
"age": 22,
"eyeColor":

"blue",
"name": "Geraldine Barron"
,
"gender": "female",


"company": "HELIXO",
"email": "geraldinebarron@helixo.com",
"phone": "+1 (968) 514-2936",
"address": "800 Crawford Avenue, Rockhill, Alaska, 3886",
"about":            "Minim sit exercitation aliquip adipisicing tempor est sunt labore deserunt velit officia est tempor ad. Nostrud reprehenderit dolore nulla culpa veniam cillum in pariatur enim. Sunt nulla aute culpa occaecat proident non ad. Duis aliqua quis dolor consectetur mollit cillum excepteur ad sint anim magna tempor amet deserunt.\r\n",
"registered": "2014-02-17T09:33:51 -01:00",
"latitude": -89.270586,
"longitude": 148.936498,
"tags":

[
"nostrud",
"qui", "Lorem", "sunt",
"consectetur",
"aute",
"aliqua"
],
"friends": [
{
"id": 0,    "name": "Haney Perez"
},
{
"id": 1,
"name": "Hull Goff"
},
{
"id": 2,
"name": "Candice Walters"
}
],
"greeting": "Hello, Geraldine Barron! You have 7 unread messages.",
"favoriteFruit": "banana"
}
]

`;

/**
 * Invalid JSON Mock data
 *
 * Error is is a missing comma character located within the
 * `tags[]`array at `officia`
 */
export const json_invalid = `
[
  {
    "id": "61030eb6dc1f22122ce360f2",
    "index": 0,
    "guid": "00a77a86-0fb1-4469-a635-04a4db984b3a",
    "isActive": false,
    "email": "candicewalters@helixo.com",
    "phone": "+1 (994) 525-2275",
    "address": "232 Bath Avenue, Herbster, Palau, 1575",
    "registered": "2018-11-16T12:25:54 -01:00",
    "latitude": -22.533778,
    "longitude": 121.785086,
    "tags": [
      "laborum",
      "officia"
      "nostrud",
      "qui",
      "amet",
      "mollit",
      "aliqua"
    ]
  }
]
`;
/**
 * JSON Style
 *
 * Mock is used to test different formatting JSON rules
 */
export const json_styles = `[
  {
    "id": "61031017580af9c3852b8446",
    "index": 0,
    "guid": "736df7b2-6fba-40d0-a081-2ef33b8af55b",
    "isActive": true,
    "balance": "$3,097.43",
    "picture": "http://placehold.it/32x32",
    "age": 35,
    "eyeColor": "blue",
    "name": "Conway Bentley",
    "gender": "male",
    "company": "CABLAM",
    "email": "conwaybentley@cablam.com",
    "phone": "+1 (904) 505-3452",
    "address": "109 Bayview Place, Russellville, Wyoming, 8270",
    "registered": "2016-11-30T08:52:05 -01:00",
    "latitude": 60.830578,
    "longitude": 121.011331,
    "tags": [
    "laborum",
      "officia",
      "nostrud",
      "qui",
      "amet",
      "mollit",
      "aliqua"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Elaine Peck",
        "friends": [
          {
            "id": 0,
            "name": "Annette Morales",
            "friends": [
              {
                "id": 0,
                "name": "Rosella Weaver"
              },
              {
                "id": 1,
                "name": "Joanna Stark"
              },
              {
                "id": 2,
                "name": "Allison Navarro"
              }
            ]
          },
          {
            "id": 1,
            "name": "Logan Bell",
            "friends": [
              {
                "id": 0,
                "name": "Christensen Whitehead"
              },
              {
                "id": 1,
                "name": "Valencia Harris"
              },
              {
                "id": 2,
                "name": "Vinson Johnston"
              }
            ]
          },
          {
            "id": 2,
            "name": "Cathryn Oneil",
            "friends": [
              {
                "id": 0,
                "name": "Joann Melton"
              },
              {
                "id": 1,
                "name": "Victoria Leach"
              },
              {
                "id": 2,
                "name": "Alford Velez"
              }
            ]
          }
        ]
      }
    ]
  }
]
`;
