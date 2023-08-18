export const API_RESULT_DEFAULT: [DictionaryAPI_Result, UrbanDictionary_Result] = [
    {
        vocab: "vocabulary",
        meanings: [
        {   
            pos: "Noun",
            definitions: [
                {
                    definition: "A usually alphabetized and explained collection of words e.g. of a particular field, or prepared for a specific purpose, often for learning.",
                    example: ""
                },
                {
                    definition: "The collection of words a person knows and uses.",
                    example: "My Russian vocabulary is very limited.",
                },
                {
                    definition: "The stock of words used in a particular field.",
                    example: "The vocabulary of social sciences is often incomprehensible to ordinary people.",
                },
                {
                    definition: "The words of a language collectively.",
                    example: "The vocabulary of any language is influenced by contacts with other cultures.",
                },
                {
                    definition: "The words of a language collectively.",
                    example: "The vocabulary of any language is influenced by contacts with other cultures.",
                }
            ]
        }]
    },
    {
        vocab: "vocabulary",
        definitions: [
            {
                definition: "Those [words] that we [speak]",
                example: "\"My vocabulary is.... [um]... [yeah]\"",
                thumbs_up: 164,
                thumbs_down: 52
            },
            {
                definition: "The words, [riffs], [moves], [notes], experiences, or songs that we can use to express ourselves.",
                example: "The [drummer's] vocabulary is full of great [riffs] and [beats].   \r\n",
                thumbs_up: 31,
                thumbs_down: 53
            },
            {
                definition: "[The only] place where [marriage] still comes before [sex]",
                example: "You've [got] a [rich] [vocabulary].",
                thumbs_up: 9,
                thumbs_down: 0
            },
            {
                definition: "Adjective.\n\n1. Having an impressively [thorough] [vocabulary] or knowledge of a language, but feeling [the need] to illustrate that to all persons with which one comes into contact.\r\n2. Showing sesquipedalianism.",
                example: "Person 1: \"How was your date last night?\"\r\nPerson 2: \"Good, though he was a bit [vocabularious].\"\n\nPerson 1: \"I find gregarious [pedantism] unnecessary in the utilization of Socartic [didacticism].\"\r\nPerson 2: \"I find your vocabularious way of speaking irritating.\"",
                thumbs_up: 24,
                thumbs_down: 11
            },
            {
                definition: "[A word] [bank] in [your head]",
                example: "\"You've got a [strange] [vocabulary]. Must be great for those [essays].\"",
                thumbs_up: 5,
                thumbs_down: 2
            }
        ]
    }
];


export const EXAMPLE_NOTFOUND = "This definition currently has no example."
export const DICTS = ["Dictionary API", "Urban Dictionary", "Merriam Webster", "Words API"]
export const API_URLS = ["https://api.dictionaryapi.dev/api/v2/entries/en/", "https://api.urbandictionary.com/v0/define?term=", "", ""]