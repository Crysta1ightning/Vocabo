<script lang="ts">
    import { onMount } from 'svelte'
    import { auth } from '$lib/firebase.client';

    let loggedIn:Boolean = false
    let loading:Boolean = true


    onMount(() => {
        auth.onAuthStateChanged((user) => {
            loading = true
            console.log(user)
            if (user != null) {
                loggedIn = true
            } else {
                loggedIn = false
            }
            loading = false
        })
    })
</script>


<div id="historyPage">
    <div class="userContent">
        <h1>History for user: </h1>
    </div>

</div>


<style lang="scss">
#historyPage {
    .userContent {
        margin-top: 8vh;
    }
    
}

@media screen and (min-width: 768px) {
    #historyPage {
        .userContent {
            margin-top: 9vh;
        }
        
    }
}
</style>