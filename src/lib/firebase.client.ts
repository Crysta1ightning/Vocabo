// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";
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


// const analytics = getAnalytics(firebaseApp);