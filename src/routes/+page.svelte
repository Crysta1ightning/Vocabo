<script lang="ts">
    import { onMount } from 'svelte';
    import { EXAMPLE_NOTFOUND, DICTS } from "$lib/constants"
    import { API_PARSE } from '$lib/APIs/parseAPI';
    import { API_CALL } from '$lib/APIs/callAPI';
    import { DefinitionsNotFoundError } from '$lib/error'
    import { page } from '$app/stores'
    import { transferHistory, updateHistory } from '$lib/firebase.client';
    import type { User } from "firebase/auth"
    import { user as firebaseUser } from '$lib/store';
    import { faL, faSearch } from '@fortawesome/free-solid-svg-icons'
    import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons'
    // @ts-ignore
    import Fa from 'svelte-fa/src/fa.svelte'
    import { updateHistoryLocal } from '$lib/utils';

    let vocabInput:string = $page.url.searchParams.get("vocab") || ""
    let dictAPIResult1:DictionaryAPI_Result
    let dictAPIResult2:UrbanDictionary_Result
    let isLoading:boolean = true
    let isSignedIn:Boolean = false
    let defNotFound:boolean[] = [false, false, false, false]
    let notFoundWord:string = ""
    let user:User|null

    const unsubscribe = firebaseUser.subscribe(async (value) => {
        user = value
        if (user && user.email) {
            isSignedIn = true
            await transferHistory(user.email)
        }
    })

    const fetchData = async () => {
        let vI = vocabInput;
        if (vocabInput == "" || !/^[a-zA-Z]+$/.test(vocabInput)) {
            vI = "vocabulary"
        }

        try {
            const res = await API_CALL[0](vI)
            dictAPIResult1 = await API_PARSE[0](res)
        } catch (error) {
            if (error instanceof DefinitionsNotFoundError) {
                console.error('Definitions not found:', error.message)
            } else {
                console.error('An unexpected error occurred')
            }
            defNotFound[0] = true
            notFoundWord = vI
        }

        try {
            const res = await API_CALL[1](vI)
            dictAPIResult2 = await API_PARSE[1](res)
        } catch (error) {
            if (error instanceof DefinitionsNotFoundError) {
                console.error('Definitions not found:', error.message)
            } else {
                console.error('An unexpected error occurred')
            }
            defNotFound[1] = true
            notFoundWord = vI
        }

        if (vocabInput != "" && !(defNotFound[0] && defNotFound[1])) {
            if (user) {
                updateHistory(user.email!, vI)
            } else {
                updateHistoryLocal(vI)
            }
        }
        isLoading = false
    }

    onMount(fetchData);

    const search = () => {
        window.location.href = "/?vocab=" + vocabInput
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            search();
        }
    }
</script>

<svelte:window on:keydown={onKeyDown}/>
<div id="mainPage">
    <div class="header">
        <div class="search">
            <input class="searchInput" bind:value={vocabInput} placeholder="Search: The vocab to learn today"/>
            <button class="searchIcon" on:click={search}><Fa icon={faSearch} /></button>
        </div>
    </div>

    <div class="dicts">
        {#if isLoading}
            <div class="loading"/>
        {:else}
            {#if !isSignedIn}
                <div class="warning">
                    You are not signed in yet, history might be lost
                </div>
            {/if}
            <div class="dictionary" id="dict1">
                <div class="label">{DICTS[0]}</div>
                {#if defNotFound[0]}
                    <div class="defNotFound">Sorry, "{notFoundWord}" did not match any result</div>
                {:else}
                    <h3 class="vocab">{dictAPIResult1.vocab}</h3>
                    {#each dictAPIResult1.meanings as meaning}
                        <div class="pos">{meaning.pos || ""}</div>
                        {#if meaning.definitions}
                            {#each meaning.definitions as defblock}
                                <div class="defblock">
                                    <p class="def">{defblock.definition}</p>
                                    <p class="exp" class:notfound={defblock.example == ""}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                                </div>
                            {/each}
                        {/if}
                    {/each}                    
                {/if} 
            </div>

            <div class="dictionary" id="dict2">
                <div class="label">{DICTS[1]}</div>
                {#if defNotFound[1]}
                    <div class="defNotFound">Sorry, "{notFoundWord}" did not match any result</div>
                {:else}
                    <h3 class="vocab">{dictAPIResult2.vocab}</h3>
                    {#if dictAPIResult2.definitions}
                        {#each dictAPIResult2.definitions as defblock}
                            <div class="defblock">
                                <p class="def">{defblock.definition}</p>
                                <div class="thumbs">
                                    <div class="thumb up"><Fa icon={faThumbsUp} />{defblock.thumbs_up}</div>
                                    <div class="thumb down"><Fa icon={faThumbsDown} />{defblock.thumbs_down}</div>
                                </div>
                                <p class="exp" class:notfound={defblock.example == ""}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                            </div>
                        {/each} 
                    {/if}                 
                {/if}
            </div>


            <div class="dictionary" id="dict3">
                <div class="label">{DICTS[2]}</div>
                <div class="notSupported">Sorry, this feature is not yet supported</div>
            </div>

            <div class="dictionary" id="dict4">
                <div class="label">{DICTS[3]}</div>
                <div class="notSupported">Sorry, this feature is not yet supported</div>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    #mainPage {
        background: #C8E4B2;
        width: 100vw;
        min-height: 100vh;
        // header
        .header {
            position: fixed;
            top: 0;
            z-index: 1;
            background: #9ED2BE;
            width: 100vw;  
            height: 12vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding-bottom: 2vh;
            // search
            .search {
                position: absolute;
                top: 8vh;
                .searchInput {
                    border-style: none;
                    width: 90vw;
                    height: 5vh;
                    border-radius: 45px;
                    padding: 0 2vw;
                    font-size: 16px;
                }
                .searchInput:focus {
                    outline: none;
                }
                .searchIcon {
                    background-color: inherit;
                    border: none;
                    position: absolute;
                    right: 1vw;
                    top: 1vh;
                    height: 3vh;
                    font-size: 16px;
                }
            }
        }

        // dictionaries
        .dicts {
            position: relative;
            margin-top: 14vh;
            padding-bottom: 2.5vh;
            .dictionary {
                background: #FFFFFF;
                width: calc(100vw - 50px);
                padding: 30px 15px;
                display: inline-block;
                margin: 10px;
                position: relative;
                .label {
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: #7EAA92;
                    color: #FFFFFF;
                    width: 150px;
                    line-height: 25px;
                    text-align: center;
                }
                .vocab {
                    font-size: 36px;
                    // font-weight: normal;
                    margin: 0 0 10px 0;
                    overflow-wrap: break-word;
                }
                .pos {
                    font-size: 14px;
                    background: #FFD9B7;
                    min-width: 40px;
                    line-height: 20px;
                    text-align: center;
                    display: inline-block;
                    padding: 0 5px;
                }
                .defblock {
                    margin: 10px 0px;
                    position: relative;
                    .def {
                        margin: 0 0 5px 0;
                        display: inline-block;
                        white-space: pre-line;
                        font-weight: bold;
                        width: 100%;
                        overflow-wrap: break-word;
                    }
                    .exp {
                        margin: 5px 0 5px 10px;
                        white-space: pre-line;
                        position: relative;
                    }
                    .exp::before {
                        position: absolute;
                        left: -10px;
                        content:"";
                        height: 100%;
                        width: 3px;
                        background-color: #7EAA92;
                    }
                    .thumbs {
                        display: block;
                        .thumb {
                            display: inline-block;
                            font-size: 14px;
                            background: #FFD9B7;
                            min-width: 30px;
                            line-height: 20px;
                            text-align: center;
                            padding: 0 5px;
                        }
                    }
                    .notfound {
                        color: #D9D9D9;
                    }
                    .notfound::before {
                        background-color: #D9D9D9;
                    }
                }
                .defNotFound {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                }
                .notSupported {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #D9D9D9;
                    width: 100%;
                    height: 100%;
                    color: #FFFFFF;
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
        .warning {
            background: #FFD9B7;
            text-align: center;
        }
    }


    // mobile

    @media screen and (min-width: 768px) {
        // scroll
        ::-webkit-scrollbar {
        width: 10px;
        }
        ::-webkit-scrollbar-track {
        background: #f1f1f1; 
        }
        ::-webkit-scrollbar-thumb {
        background: #ccc; 
        }
        ::-webkit-scrollbar-thumb:hover {
        background: #888; 
        }

        #mainPage {
            height: 100vh;
            // header
            .header {
                height: 18vh;
                padding: 0;
                // search
                .search {
                    top: 9.5vh;
                    .searchInput {
                        width: 46vw;
                        height: 7.5vh;
                        font-size: 24px;
                    }
                    .searchIcon {
                        right: 2vw;
                        top: 2vh;
                        height: 4vh;
                        cursor: pointer;
                    }
                }
            }

            // dictionaries
            .dicts {
                height: 82vh;
                position: fixed;
                top: 18vh;
                margin: 0;
                padding: 0;
                .dictionary {
                    padding: 20px;
                    margin: 20px;
                    width: calc(50vw - 75px);
                    height: calc(41vh - 75px);
                    overflow-y: scroll;
                }
                #dict1, #dict2 {
                    margin-bottom: 10px;
                }
                #dict3, #dict4 {
                    margin-top: 10px;
                }
                #dict1, #dict3 {
                    margin-right: 10px;
                }
                #dict2, #dict4 {
                    margin-left: 10px;
                }
                
                // loading 
                .loading::before {
                    top: 50%;
                }
            }
        }
    }
</style>
