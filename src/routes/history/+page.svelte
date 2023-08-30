<script lang="ts">
  import { readHistory } from "$lib/firebase.client";
    import { user as firebaseUser } from "$lib/store";
    import type { User } from "firebase/auth"
    import type { DocumentData } from "firebase/firestore"

    let loading:Boolean = true
    let user:User|null
    let vocabs:DocumentData[] = []

    const getHistory = async (userId:string) => {
        vocabs = await readHistory(userId)
        loading = false
    }

    const unsubscribe = firebaseUser.subscribe((value) => {
        loading = true
        user = value
        if (user != null) {
            getHistory(user.email!)
        }
    })
</script>


<div id="historyPage">
    {#if !loading}
        <div class="histories">
            {#each vocabs as vocab}
                <button class="history" on:click={() => {window.location.href="/?vocab="+vocab.vocab}}>
                    <h3 class="vocab">{vocab.vocab}</h3>
                    <p class="searchCount">Searched: {vocab.searchCount} times</p>
                    <p class="lastSearched">
                        Last Searched: {vocab.lastSearched}
                    </p>
                </button>
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
    height: 93vh;
    margin-top: 7vh;
    .histories {
        // margin: 70px 10px;
        padding: 10px;
        .history {
            width: 100%;
            border: none;
            text-align: left;
            background-color: #FFFFFF;
            margin-bottom: 10px;
            padding: 10px;
            .vocab {
                font-size: 20px;
                margin: 0;
            }
            .searchCount {
                margin: 0;
            }
            .lastSearched {
                margin: 0;
            }
        }
    }
    
}

@media screen and (min-width: 768px) {
    #historyPage {
        height: 91vh;
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
            }
        }

    }
}
</style>