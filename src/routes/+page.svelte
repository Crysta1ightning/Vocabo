<script>
    import { API_RESULT_DEFAULT, EXAMPLE_NOTFOUND, DICTS } from "$lib"
    // @ts-ignore
    import IoIosSearch from 'svelte-icons/io/IoIosSearch.svelte'
    let vocabInput = ""
    let dictAPIResult1 = API_RESULT_DEFAULT[0]
    let dictAPIResult2 = API_RESULT_DEFAULT[1]
    let dictAPIResult3 = API_RESULT_DEFAULT[1]
    let dictAPIResult4 = API_RESULT_DEFAULT[1]
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
        <h3 class="vocab">{dictAPIResult1.vocab || "Vocabulary"}</h3>
        <div class="pos">{dictAPIResult1.pos || ""}</div>
        {#each dictAPIResult1.definitions as defblock}
            <div class="defblock">
                <p class="def">{defblock.definition}</p>
                <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
            </div>
        {/each}     
        <div class="bg">Read More</div>
        <div class="readmore">
            Read More
        </div>
    </div>
    <div class="dictionary" id="dict2">
        <div class="label">{DICTS[1]}</div>
        <h3 class="vocab">{dictAPIResult2.vocab || "Vocabulary"}</h3>
        <div class="pos">{dictAPIResult2.pos || ""}</div>
        {#each dictAPIResult2.definitions as defblock}
            <div class="defblock">
                <p class="def">{defblock.definition}</p>
                <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
            </div>
        {/each} 
        <div class="bg">Read More</div>
        <div class="readmore">
            Read More
        </div>
    </div>
    <div class="dictionary" id="dict3">
        <div class="label">{DICTS[2]}</div>
        <h3 class="vocab">{dictAPIResult3.vocab || "Vocabulary"}</h3>
        <div class="pos">{dictAPIResult3.pos || ""}</div>
        {#each dictAPIResult3.definitions as defblock}
            <div class="defblock">
                <p class="def">{defblock.definition}</p>
                <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
            </div>
        {/each} 
        <div class="bg">Read More</div>
        <div class="readmore">
            Read More
        </div>
    </div>
    <div class="dictionary" id="dict4">
        <div class="label">{DICTS[3]}</div>
        <h3 class="vocab">{dictAPIResult4.vocab || "Vocabulary"}</h3>
        <div class="pos">{dictAPIResult4.pos || ""}</div>
        {#each dictAPIResult4.definitions as defblock}
            <div class="defblock">
                <p class="def">{defblock.definition}</p>
                <p class="exp" class:notfound={defblock.example == null}>{defblock.example || EXAMPLE_NOTFOUND}</p>
            </div>
        {/each} 
        <div class="bg">Read More</div>
        <div class="readmore">
            Read More
        </div>
    </div>
</div>

<style lang="scss">

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
                    top: 2.75vh;
                    height: 3vh;
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
            overflow: hidden;
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
                }
                .exp {
                    margin: 0;
                }
                .exp::before {
                    content:"• ";
                }
                .notfound {
                    color: #D9D9D9;
                }
            }
            .bg {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30px;
                opacity: 80%;
                filter: blur(10px);
                background: #7EAA92;
            }
            .readmore {
                position: absolute;
                bottom: 0;
                left: 0;
                margin: 0;
                width: 100%;
                height: 30px;
                text-align: center;
                backdrop-filter: blur(5px);
                cursor: pointer;
            }

        }
        #dict1, #dict3 {
            margin-right: 10px;
        }
        #dict2, #dict4 {
            margin-left: 10px;
        }
        #dict1, #dict2 {
            margin-bottom: 10px;
        }
        #dict3, #dict4 {
            margin-top: 10px;
        }
    }


</style>
