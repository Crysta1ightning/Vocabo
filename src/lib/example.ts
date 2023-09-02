// // example of data in firebase store
// collection: userHistories
// documents: 0830david@gmail.com, vocabo.com@gmail.com
const userHistories = [
    {
        "0830david@gmail.com": {

            lastVocab: "Lemon",
            // sub-collection: vocab
            // documents: apple, banana 
            vocabs: {
                "apple": {
                    searchCount: 10,
                    lastSearched: 1869498348
                },
                "banana": {
                    searchCount: 5,
                    lastSearched: 1869445648
                }
            }
        }
    },
    {
        "vocabo.com@gmail.com": {
            lastVocab: "Honey",
            vocabs: {
                "orange": {
                    searchCount: 7,
                    lastSearched: 1869156166
                },
                "potato": {
                    searchCount: 9,
                    lastSearched: 1869115346
                }
            }
        }
    }
]
