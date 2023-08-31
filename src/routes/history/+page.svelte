<script lang="ts">
  import { db, deleteHistory, readHistory } from "$lib/firebase.client";
    import { user as firebaseUser } from "$lib/store";
    import type { User } from "firebase/auth"
    import { onSnapshot, type DocumentData, collection } from "firebase/firestore"
    import { onDestroy } from "svelte";

    let isLoading:Boolean = true
    let user:User|null
    let vocabs:DocumentData[] = []

    const delHistory = async (vocab:string) => {
        if (user != null) {
           deleteHistory(user!.email!, vocab)
        }
    }

    const getHistory = async () => {
        isLoading = true
        if (user && user.email) {
            vocabs = await readHistory(user.email)
            isLoading = false
        }   
    }

    const unsubscribe = firebaseUser.subscribe((value) => {
        isLoading = true
        user = value
        if (user != null && user.email) {
            const thisColl = collection(db, "userHistories", user.email || "", "vocabs")
            onSnapshot(thisColl, (coll) => {
                getHistory()
            })
        }
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>


<div id="historyPage">
    {#if isLoading}
        <div class="loading"/>
    {:else}
        <div class="histories">
            {#each vocabs as vocab}
                <div class="history">
                    <h3 class="vocab">{vocab.vocab}</h3>
                    <button class="link" on:click={() => {window.location.href="/?vocab="+vocab.vocab}}>link</button>
                    <div class="info">
                        <p class="searchCount">
                            {#if vocab.searchCount === 1}
                                Searched 1 time
                            {:else}
                                Searched {vocab.searchCount} times
                            {/if}
                        </p>
                        <p class="lastSearched">
                            {vocab.lastSearched}
                        </p>
                    </div>
                    <button class="del" on:click={() => {delHistory(vocab.vocab)}}>del</button>
                </div>
                {:else}
                <div class="notFound">
                    Search some vocabs to add to history~
                </div>
            {/each}
        </div>
    {/if}

</div>


<style lang="scss">
#historyPage {
    background: #C8E4B2;
    min-height: 93vh;
    margin-top: 7vh;
    .histories {
        // margin: 70px 10px;
        padding: 10px;
        .history {
            background-color: #FFFFFF;
            margin-bottom: 10px;
            padding: 10px;
            position: relative;
            .vocab {
                font-size: 20px;
                margin: 0;
                display: inline-block;
            }
            .link {
                font-size: 20px;
                background-color: inherit;
                border: none;
                color: #1E453E;
            }
            .info {
                color: #7EAA92;
                .searchCount {
                    min-width: 110px;
                    display: inline-block;
                    margin: 0 5px 0 0;
                    // color: #7EAA92;
                }
                .lastSearched {
                    min-width: 110px;
                    display: inline-block;
                    margin: 0 0 0 5px;
                }
            }
            .del {
                width: 40px;
                height: 40px;
                position: absolute;
                right: 10px;
                top: calc(50% - 20px);
                background-color: #7EAA92;
                color: #FFFFFF;
                border: none;
            }
        }
    }

        // loading 
        @keyframes spinner {
        0% {
        transform: translate3d(-50%, -50%, 0) rotate(0deg);
        }
        100% {
        transform: translate3d(-50%, -50%, 0) rotate(360deg);
        }
    }
    .loading::before {
        animation: 1.5s linear infinite spinner;
        animation-play-state: inherit;
        border: solid 5px #f1f1f1;
        border-bottom-color: #7EAA92;
        border-radius: 50%;
        content: "";
        height: 40px;
        position: fixed;
        top: 50vh;
        left: 50vw;
        transform: translate3d(-50%, -50%, 0);
        width: 40px;
        will-change: transform;
    }
}

@media screen and (min-width: 768px) {
    #historyPage {
        min-height: 91vh;
        margin-top: 9vh;
        .histories {
            padding: 10px 20px;
            width: calc(100vw - 40px);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-column-gap: 10px;
            .history {
                // width: 300px;
                display: inline-block;
                .link {
                    cursor: pointer;
                }
                .del {
                    cursor: pointer;
                }
            }
        }
        // loading 
        .loading::before {
            top: 50%;
        }
    }
}
</style>