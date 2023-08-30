<script lang="ts">
    import { user as firebaseUser } from "$lib/store";
    import type { User } from "firebase/auth"
    
    let loggedIn:Boolean = false
    let loading:Boolean = true
    let user:User|null


    const unsubscribe = firebaseUser.subscribe((value) => {
        loading = true
        user = value
        console.log(user)
        if (user != null) {
            loading = false
        }
    })
</script>


<div id="historyPage">
    {#if !loading}
        <div class="userContent">
            History for user: { user?.email }
        </div>
        <div class="histories">
            Histories
        </div>
    {/if}

</div>


<style lang="scss">
#historyPage {
    background: #C8E4B2;
    width: 100vw;
    min-height: 93vh;
    .userContent {
        margin-top: 7vh;
    }
    
}

@media screen and (min-width: 768px) {
    #historyPage {
        min-height: 91vh;
        .userContent {
            margin-top: 9vh;
        }
        
    }
}
</style>