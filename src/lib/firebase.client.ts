import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, type DocumentData, onSnapshot } from "firebase/firestore"
import { doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, Timestamp, increment } from "firebase/firestore"
import { PUBLIC_APIKEY, PUBLIC_APPID, PUBLIC_AUTHDOMAIN, PUBLIC_MEASUREMENTID, PUBLIC_MESSAGINGSENDERID, PUBLIC_PROJECTID, PUBLIC_STORAGEBUCKET } from '$env/static/public';

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
        if (data && data.lastVocab === vocab) {
            return
        } else {
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

const padTo2Digits = (num:number) => {
    return num.toString().padStart(2, '0');
}

function formatDate(date:Date) {
    return (
        [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
        ].join('-')
    );
}

export const readHistory = async (userId:string):Promise<DocumentData[]> => {
    try {
        let thisColl = collection(db, "userHistories", userId, "vocabs")
        const colRef = await getDocs(thisColl)
        let vocabs:DocumentData[] = []
        colRef.forEach((doc) => {
            const date = new Date(doc.data().lastSearched.seconds*1000)
            vocabs.push({
                vocab: doc.id,
                searchCount: doc.data().searchCount,
                lastSearched: formatDate(date)
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
        let thisDoc = doc(db, "userHistories", userId, "vocabs", vocab)
        await deleteDoc(thisDoc)
    } catch (error) {
        console.log(error)
    }
}

// const analytics = getAnalytics(firebaseApp);