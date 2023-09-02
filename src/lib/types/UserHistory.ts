import type { Timestamp } from "firebase/firestore"

type Vocabulary = {
    searchCount: number;
    lastSearched: Timestamp;
  };
  
export type UserHistory = {
    lastVocab: string;
    vocabs: { [key: string]: Vocabulary };
};