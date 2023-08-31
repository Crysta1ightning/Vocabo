import type { DocumentData } from "firebase/firestore";

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