<script lang="ts">
    import { onMount } from 'svelte';
    import { API_RESULT_DEFAULT, EXAMPLE_NOTFOUND, DICTS } from "$lib/constants"
    import { API_PARSE } from '$lib/APIs/parseAPI';
    import { API_CALL } from '$lib/APIs/callAPI';
    import { DefinitionsNotFoundError } from '$lib/error'
    import { page } from '$app/stores'
    // @ts-ignore
    import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte'


    let vocabInput:string = $page.url.searchParams.get("vocab") || ""
    let dictAPIResult1:DictionaryAPI_Result = API_RESULT_DEFAULT[0]
    let dictAPIResult2:UrbanDictionary_Result = API_RESULT_DEFAULT[1]
    let isLoading: boolean = false; // Loading indicator
    let defNotFound: boolean[] = [false, false, false, false]
    let notFoundWord: string = ""


    const fetchData = async () => {
        if (vocabInput == "") return 

        isLoading = true
        try {
            const res = await API_CALL[0](vocabInput)
            dictAPIResult1 = await API_PARSE[0](res)
        } catch (error) {
            if (error instanceof DefinitionsNotFoundError) {
                // Handle the error, show a message to the user, etc.
                console.error('Definitions not found:', error.message);
                defNotFound[0] = true
                notFoundWord = vocabInput
            } else {
                // Handle other types of errors
                console.error('An error occurred:', error);
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
        <img class="icon" src="/vocabo.png" alt="Vocabo"/>
        <div class="search">
            <input class="searchInput" bind:value={vocabInput} placeholder="Search: What is the vocab you want to learn today"/>
            <button class="searchIcon" on:click={search}><IoIosSearch/></button>
        </div>
    </div>

    <div class="dicts">
        {#if isLoading}
            <div class="loading"/>
        {:else}
            <div class="dictionary" id="dict1">
                <div class="label">{DICTS[0]}</div>
                {#if defNotFound[0]}
                    <div class="defNotFound">Sorry, {notFoundWord} did not match any result</div>
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
                    <div class="defNotFound">Sorry, we didn't find any result</div>
                {:else}
                    <h3 class="vocab">{dictAPIResult2.vocab}</h3>
                    {#if dictAPIResult2.definitions}
                        {#each dictAPIResult2.definitions as defblock}
                            <div class="defblock">
                                <p class="def">{defblock.definition}</p>
                                <div class="thumbs">
                                    <div class="thumb up">+{defblock.thumbs_up}</div>
                                    <div class="thumb down">-{defblock.thumbs_down}</div>
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

    ::-webkit-scrollbar {
        width: 10px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
    background: #f1f1f1; 
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
    background: #ccc; 
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
    background: #888; 
    }


    #mainPage {
        background: #C8E4B2;
        width: 100vw;
        height: 100vh;
        // header
        .header {
            background: #9ED2BE;
            height: 18vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            .icon {
                // background-color: yellow;
                height: 8vh;
                padding: 5px 0;
            }
            // search
            .search {
                height: 8vh;
                position: relative;
                // background-color: aqua;
                .searchInput {
                    border-style: none;
                    width: 46vw;
                    height: 7.5vh;
                    border-radius: 45px;
                    padding: 0 2vw;
                    font-size: 24px;
                }
                .searchInput:focus {
                    outline: none;
                }
                .searchIcon {
                    background-color: inherit;
                    border: none;
                    position: absolute;
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
            position: relative;
            .dictionary {
                background: #FFFFFF;
                padding: 20px;
                display: inline-block;
                margin: 20px;
                width: calc(50vw - 75px);
                height: calc(41vh - 75px);
                overflow-y: scroll;
                position: relative;
                
                .label {
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: #7EAA92;
                    color: #FFFFFF;
                    width: 125px;
                    line-height: 25px;
                    text-align: center;
                }
                .vocab {
                    font-size: 36px;
                    font-weight: normal;
                    margin: 0 0 10px 0;
                }
                .pos {
                    font-size: 14px;
                    background: #FFD9B7;
                    width: 50px;
                    line-height: 20px;
                    text-align: center;
                }
                .defblock {
                    // background-color: #9ED2BE;
                    margin: 10px 0px;
                    .def {
                        margin: 0 0 5px 0;
                        display: inline-block;
                    }
                    .exp {
                        margin: 0;
                    }
                    .exp::before {
                        content:"• ";
                    }
                    .thumbs {
                        display: inline-block;
                        .thumb {
                            display: inline-block;
                            font-size: 14px;
                            background: #FFD9B7;
                            width: 40px;
                            line-height: 20px;
                            text-align: center;
                        }
                    }
                    .notfound {
                        color: #D9D9D9;
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
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                width: 40px;
                will-change: transform;
            }
        }

        
    }


</style>
