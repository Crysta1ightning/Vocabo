import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, type DocumentData, onSnapshot } from "firebase/firestore"
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp, increment } from "firebase/firestore"
import { PUBLIC_APIKEY, PUBLIC_APPID, PUBLIC_AUTHDOMAIN, PUBLIC_MEASUREMENTID, PUBLIC_MESSAGINGSENDERID, PUBLIC_PROJECTID, PUBLIC_STORAGEBUCKET } from '$env/static/public';
import type { UserHistory } from "$lib/types/UserHistory"

const firebaseConfig = {
  apiKey: PUBLIC_APIKEY,
  authDomain: PUBLIC_AUTHDOMAIN,
  projectId: PUBLIC_PROJECTID,
  storageBucket: PUBLIC_STORAGEBUCKET,
  messagingSenderId: PUBLIC_MESSAGINGSENDERID,
  appId: PUBLIC_APPID,
  measurementId: PUBLIC_MEASUREMENTID,
};

let firebaseApp
if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig)
} else {
  firebaseApp = getApp()
  deleteApp(firebaseApp)
  firebaseApp = initializeApp(firebaseConfig)
}


export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)

export const updateHistory = async (userId:string, vocab:string) => {
    try {
        let userDocRef = doc(db, "userHistories", userId)
        const userDoc = await getDoc(userDocRef)
        const data = userDoc.data()
        if (data && data.lastVocab != vocab) {
            await updateDoc(userDocRef, {
                "lastVocab": vocab  
            })
        }

        let thisDocRef = doc(db, "userHistories", userId, "vocabs", vocab)
        const thisDoc = await getDoc(thisDocRef)

        if (thisDoc.exists()) {
            // udpate
            await updateDoc(thisDocRef, {
                "searchCount": increment(1),
                "lastSearched": Timestamp.now()
            })
        } else {
            // set
            await setDoc(thisDocRef, {
                "searchCount": 1,
                "lastSearched": Timestamp.now()
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const readHistory = async (userId:string):Promise<DocumentData[]> => {
    try {
        let thisColl = collection(db, "userHistories", userId, "vocabs")
        const colRef = await getDocs(thisColl)
        let vocabs:DocumentData[] = []
        colRef.forEach((doc) => {
            vocabs.push({
                vocab: doc.id,
                searchCount: doc.data().searchCount,
                lastSearched: doc.data().lastSearched.seconds*1000
            })
        })
        return vocabs
    } catch (error) {
        console.log(error)
    }
    return []
}

export const deleteHistory = async (userId:string, vocab:string) => {
    try {
        let userDocRef = doc(db, "userHistories", userId)
        const userDoc = await getDoc(userDocRef)
        const data = userDoc.data()
        if (data && data.lastVocab === vocab) {
            await updateDoc(userDocRef, {
                "lastVocab": ""
            })
        } 

        let thisDoc = doc(db, "userHistories", userId, "vocabs", vocab)
        await deleteDoc(thisDoc)
    } catch (error) {
        console.log(error)
    }
}

export const transferHistory = async (userId:string) => {
    try {
        const userHistoryNull:string|null = localStorage.getItem("userHistory")
        if (userHistoryNull === null) return

        const userHistoryVocabs:UserHistory["vocabs"] = JSON.parse(userHistoryNull).vocabs 
        for (const key in userHistoryVocabs) {
            let thisDocRef = doc(db, "userHistories", userId, "vocabs", key)
            const thisDoc = await getDoc(thisDocRef)
            const vocab = userHistoryVocabs[key]
            if (thisDoc.exists()) {
                // if exists in cloud, add the current searchCount to it
                await updateDoc(thisDocRef, {
                    "searchCount": increment(vocab.searchCount),
                    "lastSearched": vocab.lastSearched
                })
            } else {
                // if not exists in cloud, simply add it to cloud
                await setDoc(thisDocRef, {
                    "searchCount": vocab.searchCount,
                    "lastSearched": vocab.lastSearched
                })

            }
        }   

        const userHistory = JSON.parse(userHistoryNull)
        let userDocRef = doc(db, "userHistories", userId)
        await updateDoc(userDocRef, {
            "lastVocab": userHistory.lastVocab
        })

        localStorage.removeItem("userHistory")
    } catch (error) {
        console.log(error)
    }
}

// const analytics = getAnalytics(firebaseApp);