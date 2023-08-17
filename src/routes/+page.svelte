<script>
    import { API_RESULT_DEFAULT, EXAMPLE_NOTFOUND, DICTS } from "$lib"
    import FaSearch from 'svelte-icons/fa/FaSearch.svelte'
    let vocabInput = ""
    let dictAPIResult1 = API_RESULT_DEFAULT
</script>

<div id="mainPage">
    <div id="header">
        <img class="icon" src="/vocabo.png" alt="Vocabo"/>
        <input class="serachInput" bind:value={vocabInput} placeholder="Search: What is the vocab you want to learn today"/>
        <FaSearch class="serachIcon"/>
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
        <div class="readmore">
            <p>Read More</p>
        </div>
    </div>
    <div class="dictionary" id="dict2">
        <div class="label">{DICTS[1]}</div>
        <div class="readmore">
            <p>Read More</p>
        </div>
    </div>
    <div class="dictionary" id="dict3">
        <div class="label">{DICTS[2]}</div>
        <div class="readmore">
            <p>Read More</p>
        </div>
    </div>
    <div class="dictionary" id="dict4">
        <div class="label">{DICTS[3]}</div>
        <div class="readmore">
            <p>Read More</p>
        </div>
    </div>
</div>

<style>

</style>
