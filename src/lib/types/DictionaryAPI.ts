// before parse
type DictionaryAPI_Definition = {
    definition: string;
    example?: string;
};

type DictionaryAPI_Meaning = {
    partOfSpeech: string;
    definitions: DictionaryAPI_Definition[];
};

// after parse
type DictionaryAPI_Result = {
    vocab: string
    meanings: {
        pos: string;
        definitions: {
            definition: string;
            example: string;    
        }[];
    }[]
}
