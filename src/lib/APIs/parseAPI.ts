import { DefinitionsNotFoundError } from "$lib/error";

const parseDictionaryAPI = async (res: Response): Promise<DictionaryAPI_Result> => {
    const data = await res.json()
    console.log(data)
    
    if (data.title === "No Definitions Found") {
        throw new DefinitionsNotFoundError("DictionaryAPI")
    }

    const parsedResult: DictionaryAPI_Result = {
        vocab: data[0].word,
        meanings: data[0].meanings.map((meaning: DictionaryAPI_Meaning) => ({
            pos: meaning.partOfSpeech,
            definitions: meaning.definitions.map((def: DictionaryAPI_Definition) => ({
                definition: def.definition,
                example: def.example || ""
            }))
        }))
    }
    return parsedResult;
};

const replaceWords = (str: String): String => {
    return str.replaceAll("[", "")
        .replaceAll("]", "")
        .replaceAll("\n\n", "\n")
}

const parseUrbanDictionary = async (res: Response): Promise<UrbanDictionary_Result> => {
    const data = await res.json()
    console.log(data)

    if (data.list.length === 0) {
        throw new DefinitionsNotFoundError("UrbanDictionary")
    }
    const parsedResult: UrbanDictionary_Result = {
        vocab: data.list[0].word,
        definitions: data.list.map((def: urbandictionary_Definition) => ({
            definition: replaceWords(def.definition),
            example: replaceWords(def.example),
            thumbs_up: def.thumbs_up,
            thumbs_down: def.thumbs_down
        }))
    }

    return parsedResult
}

export const API_PARSE: [
    (res: Response) => Promise<DictionaryAPI_Result>, 
    (res: Response) => Promise<UrbanDictionary_Result>
] = [
        parseDictionaryAPI,
        parseUrbanDictionary
];