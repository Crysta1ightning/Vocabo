import { Timestamp, type DocumentData } from "firebase/firestore";
import type { UserHistory } from "$lib/types/UserHistory"

const padTo2Digits = (num:number) => {
    return num.toString().padStart(2, '0');
}
export const formatDate = (time:number) => {
    const date = new Date(time)
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-')
    );
}

export const getCompareFn = (sortBy:string) => {
    if (sortBy === "alphabetic") {
        return (a:DocumentData, b:DocumentData) => {
            if (a.vocab.toLowerCase() < b.vocab.toLowerCase()) { return -1 }
            else if (a.vocab.toLowerCase() === b.vocab.toLowerCase()) {
                if (a.lastSearched < b.lastSearched) { return -1 }
                else { return 1 }
            }
            else { return 1 }
        }   
    } else if (sortBy === "recent") {
        return (a:DocumentData, b:DocumentData) => {
            if (a.lastSearched > b.lastSearched) { return -1 }
            else if (a.lastSearched === b.lastSearched) {
                if (a.vocab.toLowerCase() < b.vocab.toLowerCase()) { return -1 }
                else { return 1 }
            }
            else { return 1 }
        }
    } else if (sortBy === "frequent") {
        return (a:DocumentData, b:DocumentData) => {
            if (a.searchCount > b.searchCount) { return -1 }
            else if (a.searchCount === b.searchCount) { 
                if (a.vocab.toLowerCase() < b.vocab.toLowerCase()) { return -1 }
                else { return 1 }
            } else { return 1 }
        }
    } else {
        return () => { return 1 }
    }
}


export const updateHistoryLocal = (vocab:string) => {
    try {
        let searchCount:number
        const userHistoryNull:string|null = localStorage.getItem("userHistory")
        if (userHistoryNull != null) {
            const userHistory:UserHistory = JSON.parse(userHistoryNull)
            if (userHistory.lastVocab === vocab) {
                searchCount = userHistory.vocabs[vocab].searchCount
            } else if (userHistory.vocabs[vocab]) {
                searchCount = userHistory.vocabs[vocab].searchCount + 1
            } else {
                searchCount = 1
            }
            const updatedUserHistory: UserHistory = {
                lastVocab: vocab,
                vocabs: {
                    ...userHistory.vocabs,
                    [vocab]: {
                        searchCount: searchCount,
                        lastSearched: Timestamp.now() 
                    }
                }
            };
            localStorage.setItem("userHistory", JSON.stringify(updatedUserHistory))
        } else {
            const userHistory: UserHistory = {
                lastVocab: vocab,
                vocabs: {
                    [vocab]: {
                        searchCount: 1,
                        lastSearched: Timestamp.now() 
                    }
                }
            };
            localStorage.setItem("userHistory", JSON.stringify(userHistory))
        }
    } catch (error) {
        alert(error)
    }
}

export const readHistoryLocal = ():DocumentData[] => {
    try {
        const userHistoryNull:string|null = localStorage.getItem("userHistory")
        if (userHistoryNull != null) {
            const userHistoryVocabs:UserHistory["vocabs"] = JSON.parse(userHistoryNull).vocabs 
            let vocabs:DocumentData[] = []
            for (const key in userHistoryVocabs) {
                const vocab = userHistoryVocabs[key]
                vocabs.push({
                    vocab: key,
                    searchCount: vocab.searchCount,
                    lastSearched: vocab.lastSearched.seconds*1000
                })
            }
            return vocabs
        } 
    } catch (error) {
        alert(error)
    }
    return []
}

export const deleteHistoryLocal = (vocab:string) => {
    try {
        const userHistoryNull:string|null = localStorage.getItem("userHistory")
        if (userHistoryNull != null) {
            const userHistory = JSON.parse(userHistoryNull)
            const updatedVocabs = userHistory.vocabs
            delete updatedVocabs[vocab]
            const updatedLastVocab = userHistory.lastVocab === vocab? "" : userHistory.lastVocab
            const updatedHistory:UserHistory = {
                lastVocab: updatedLastVocab,
                vocabs: updatedVocabs
            }
            localStorage.setItem("userHistory", JSON.stringify(updatedHistory))
        } 
    } catch (error) {
        alert(error)
    }
}

