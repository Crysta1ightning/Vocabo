import type { IdTokenResult, User, UserMetadata } from "firebase/auth"
import { writable, type Writable } from "svelte/store"


export const defaultUser: User = {
    uid: "",
    email: null,
    emailVerified: false,
    isAnonymous: false,
    metadata: {
        creationTime: "", 
        lastSignInTime: "", 
    },
    providerData: [],
    refreshToken: "",
    tenantId: null,
    delete: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
        throw new Error("Function not implemented.");
    },
    getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
        throw new Error("Function not implemented.");
    },
    reload: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    toJSON: function (): object {
        throw new Error("Function not implemented.");
    },
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    providerId: "",
};

  
export const user:Writable<User|null> = writable(defaultUser)