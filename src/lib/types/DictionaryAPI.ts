// before parse
type Definition = {
    definition: string;
    example?: string;
};

type Meaning = {
    partOfSpeech: string;
    definitions: Definition[];
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
