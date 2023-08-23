import { API_URLS } from "$lib/constants"
const callDictionaryAPI = async (vocabInput: string): Promise<Response> => {
    const url = API_URLS[0] + vocabInput
    const res = await fetch(url)
    return res
};
const callUrbanDictionary = async(vocabInput: string): Promise<Response> => {
    const url = API_URLS[1] + vocabInput
    const res = await fetch(url)
    return res
}

export const API_CALL: ((vocabInput: string) => Promise<Response>)[] = [
    callDictionaryAPI,
    callUrbanDictionary
];
