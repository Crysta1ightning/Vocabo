<script lang="ts">
    import { onMount } from 'svelte';
    import { API_RESULT_DEFAULT, EXAMPLE_NOTFOUND, DICTS, API_URLS } from "$lib/constants"
    import { API_PARSE } from '$lib/parseAPI';
    // @ts-ignore
    import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte'
    import { page } from '$app/stores'

    let vocabInput = $page.url.searchParams.get("vocab") || ""
    let dictAPIResult1:API_RESULT = API_RESULT_DEFAULT[0]
    let dictAPIResult2:API_RESULT = API_RESULT_DEFAULT[1]
    let dictAPIResult3:API_RESULT = API_RESULT_DEFAULT[2]
    let dictAPIResult4:API_RESULT = API_RESULT_DEFAULT[3]

    onMount(async () => {
        // const url = API_URLS[0] + vocabInput
        // const res = await fetch(url)
        // dictAPIResult1 = await API_PARSE[0](res);
        // const url2 = API_URLS[1] + vocabInput
        // const res2 = await fetch(url)
        // dictAPIResult2 = await API_PARSE[1](res);
    })
</script>

<div id="mainPage">
    <div class="header">
        <img class="icon" src="/vocabo.png" alt="Vocabo"/>
        <div class="search">
            <input class="searchInput" bind:value={vocabInput} placeholder="Search: What is the vocab you want to learn today"/>
            <div class="searchIcon"><IoIosSearch/></div>
        </div>
    </div>
    <div class="dictionary" id="dict1">
        <div class="label">{DICTS[0]}</div>
        {#if dictAPIResult1.vocab}
            <h3 class="vocab">{dictAPIResult1.vocab}</h3>
            <div class="pos">{dictAPIResult1.pos || ""}</div>
            {#if dictAPIResult1.definitions}
                {#each dictAPIResult1.definitions as defblock}
                    <div class="defblock">
                        <p class="def">{defblock.definition}</p>
                        <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                    </div>
                {/each}
            {/if}
        {:else}
            <div class="notSupported">Sorry, this feature is not yet supported</div>
        {/if} 
    </div>


    <div class="dictionary" id="dict2">
        <div class="label">{DICTS[1]}</div>
        {#if dictAPIResult2.vocab}
            <h3 class="vocab">{dictAPIResult2.vocab}</h3>
            {#if dictAPIResult2.definitions}
                {#each dictAPIResult2.definitions as defblock}
                    <div class="defblock">
                        <p class="def">{defblock.definition}</p>
                        <div class="thumbs">
                            <div class="thumb up">+{defblock.thumbs_up}</div>
                            <div class="thumb down">-{defblock.thumbs_down}</div>
                        </div>
                        <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                    </div>
                {/each} 
            {/if}
        {:else}
            <div class="notSupported">Sorry, this feature is not yet supported</div>
        {/if}
    </div>


    <div class="dictionary" id="dict3">
        <div class="label">{DICTS[2]}</div>
        {#if dictAPIResult3.vocab}
            <h3 class="vocab">{dictAPIResult3.vocab}</h3>
            <div class="pos">{dictAPIResult3.pos || ""}</div>
            {#if dictAPIResult3.definitions}
                {#each dictAPIResult3.definitions as defblock}
                    <div class="defblock">
                        <p class="def">{defblock.definition}</p>
                        <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                    </div>
                {/each} 
            {/if}
        {:else}
            <div class="notSupported">Sorry, this feature is not yet supported</div>
        {/if}
    </div>

    <div class="dictionary" id="dict4">
        <div class="label">{DICTS[3]}</div>
        {#if dictAPIResult4.vocab}
            <h3 class="vocab">{dictAPIResult4.vocab}</h3>
            <div class="pos">{dictAPIResult4.pos || ""}</div>
            {#if dictAPIResult4.definitions}
                {#each dictAPIResult4.definitions as defblock}
                    <div class="defblock">
                        <p class="def">{defblock.definition}</p>
                        <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
                    </div>
                {/each} 
            {/if}
        {:else}
            <div class="notSupported">Sorry, this feature is not yet supported</div>
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
                    position: absolute;
                    right: 2vw;
                    top: 2vh;
                    height: 4vh;
                    cursor: pointer;
                }
            }
        }
        // dictionaries
        .dictionary {
            background: #FFFFFF;
            padding: 20px;
            display: inline-block;
            margin: 20px;
            width: calc(50% - 75px);
            height: calc(41% - 75px);
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
    }


</style>
