// // example of data in firebase store
// collection: userHistories
// documents: 0830david@gmail.com, vocabo.com@gmail.com
const userHistories = [
    {
        "0830david@gmail.com": {

            // sub-collection: vocab
            // documents: apple, banana 
            vocabs: [
                "apple", {
                    searched: 10,
                    lastSearched: 1869498348
                },
                "banana", {
                    searched: 5,
                    lastSearched: 1869445648
                }
            ]
        }
    },
    {
        "vocabo.com@gmail.com": {
            vocabs: [
                "orange", {
                    searched: 7,
                    lastSearched: 1869156166
                },
                "potato", {
                    searched: 9,
                    lastSearched: 1869115346
                }
            ]
        }
    }
]
