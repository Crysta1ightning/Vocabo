<script lang="ts">
  import { db, deleteHistory, readHistory, transferHistory } from "$lib/firebase.client";
    import { user as firebaseUser } from "$lib/store";
    import type { User } from "firebase/auth"
    import { onSnapshot, type DocumentData, collection } from "firebase/firestore"
    import { onDestroy, onMount } from "svelte";
    import { deleteHistoryLocal, formatDate, getCompareFn, readHistoryLocal } from "$lib/utils" 
    import { faLink, faTrashCan } from '@fortawesome/free-solid-svg-icons'
    // @ts-ignore
    import Fa from 'svelte-fa/src/fa.svelte'

    let isLoading:Boolean = true
    let isSignedIn:Boolean = false
    let user:User|null
    let vocabs:DocumentData[] = []
    let sortBy:string

    const delHistory = async (vocab:string) => {
        if (user && user.email) {
           deleteHistory(user.email, vocab)
        } else {
            deleteHistoryLocal(vocab)
            vocabs = vocabs.filter((vocabEntry) => vocabEntry.vocab != vocab)
        }
    }

    const getHistory = async () => {
        vocabs = await readHistory(user!.email!)
        vocabs = vocabs.sort(getCompareFn("recent"))
        isLoading = false
    }

    const unsubscribe = firebaseUser.subscribe(async (value) => {
        user = value
        console.log(user)
        if (user && user.email) {
            isSignedIn = true
            await transferHistory(user.email)
            const thisColl = collection(db, "userHistories", user.email || "", "vocabs")
            onSnapshot(thisColl, (coll) => {
                getHistory()
            })
        }
        
    })

    const sortHistory = () => {
        vocabs = vocabs.sort(getCompareFn(sortBy))
    }

    onMount(() => {
        vocabs = readHistoryLocal()
        vocabs = vocabs.sort(getCompareFn("recent"))
        setTimeout(() => {
            isLoading = false
        }, 1500)
    })

    onDestroy(() => {
        unsubscribe()
    })
</script>


<div id="historyPage">
    {#if isLoading}
        <div class="loading"/>
    {:else}
        {#if !isSignedIn}
            <div class="warning">
                You are not signed in yet, history might be lost
            </div>
        {/if}
        <div class="filter">
            <select bind:value={sortBy} on:change={sortHistory}>
                <option value="" selected disabled hidden>Sort By</option>
                <option value="alphabetic">Alphabetic order</option>
                <option value="recent">Most recently searched</option>
                <option value="frequent">Most frequently searched</option>
            </select>
        </div>
        <div class="histories">
            {#each vocabs as vocab}
                <div class="history">
                    <h3 class="vocab">{vocab.vocab}</h3>
                    <button class="link" on:click={() => {window.location.href="/?vocab="+vocab.vocab}}>
                        <Fa icon={faLink} />
                    </button>
                    <div class="info">
                        <p class="searchCount">
                            {#if vocab.searchCount === 1}
                                Searched 1 time
                            {:else}
                                Searched {vocab.searchCount} times
                            {/if}
                        </p>
                        |
                        <p class="lastSearched">
                            {formatDate(vocab.lastSearched)}
                        </p>
                    </div>
                    <button class="del" on:click={() => {delHistory(vocab.vocab)}}>
                        <Fa icon={faTrashCan} />
                    </button>
                </div>
                {:else}
                <div class="warning notFound">
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
    .filter {
        // color: #FFFFFF;
        padding: 10px;
        background-color: #7EAA92;
        select {
            border: 0;
            box-shadow: none;
            color: #7EAA92;
            background-color: #FFFFFF;
        }
    }
    .histories {
        padding: 10px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-column-gap: 10px;
        position: relative;
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
                font-size: 16px;
                background-color: inherit;
                border: none;
                color: #1E453E;
            }
            .info {
                color: #7EAA92;
                .searchCount {
                    display: inline-block;
                    margin: 0 5px 0 0;
                    // color: #7EAA92;
                }
                .lastSearched {
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
                font-size: 25px;
                background-color: inherit;
                color: #7EAA92;
                border: none;
            }
        }
        .notFound {
            width: 100vw;
            position: absolute;
            left: 0;
            top: 0
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
    .warning {
        background: #FFD9B7;
        text-align: center;
    }
}

@media screen and (min-width: 768px) {
    #historyPage {
        min-height: 91vh;
        margin-top: 9vh;
        .histories {
            padding: 10px 20px;
            width: calc(100vw - 40px);
            .history {
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