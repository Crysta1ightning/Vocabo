import { DefinitionsNotFoundError } from "$lib/error";

const parseDictionaryAPI = async (res: Response): Promise<DictionaryAPI_Result> => {
    const data = await res.json(); // Parse JSON response
    console.log(data);
    
    if (data.title === "No Definitions Found") {
        throw new DefinitionsNotFoundError(data.message)
    }

    const parsedResult: DictionaryAPI_Result = {
        vocab: data[0].word,
        meanings: data[0].meanings.map((meaning: Meaning) => ({
            pos: meaning.partOfSpeech,
            definitions: meaning.definitions.map((def: Definition) => ({
                definition: def.definition,
                example: def.example || ""
            }))
        }))
    };
    return parsedResult;
};
export const API_PARSE = [
    parseDictionaryAPI,
    // async (res) => {}
]

