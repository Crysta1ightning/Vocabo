<script lang="ts">
    import { onMount } from 'svelte'
    import { auth } from '$lib/firebase.client';
    import { GoogleAuthProvider, signOut, signInWithRedirect, type User } from "firebase/auth";
    import { user as firebaseUser } from '$lib/store';
    
    let loggedIn:Boolean = false
    let isLoading:Boolean = true

    onMount(() => {
        auth.onAuthStateChanged((newUser) => {
            isLoading = true
            firebaseUser.set(newUser)
            if (newUser != null) {
                loggedIn = true
            } else {
                loggedIn = false
            }
            isLoading = false
        })
    })

    const vocaboSignIn = async () => {
        const provider = new GoogleAuthProvider()
        provider.addScope('profile')
        provider.addScope('email')
        await signInWithRedirect(auth, provider)
    }

    const vocaboSignOut = async () => {
        try {
            await signOut(auth)
            loggedIn = false
        } catch (error) {
            console.log(error)
        }
    }
</script>

<div class="header">
    <button class="iconButton" on:click={()=>{window.location.href = "/"}}><img class="icon" src="/vocabo.png" alt="Vocabo"/></button>
    {#if !isLoading}
        <button class="custButton history" on:click={()=>{window.location.href = "/history"}}>History</button>
        {#if loggedIn}
            <button class="custButton signout" on:click={vocaboSignOut}>Sign Out</button>
        {:else}
            <button class="custButton signin" on:click={vocaboSignIn}>Sign In</button>    
        {/if}
    {/if}
</div>
<slot/>

<style lang="scss">
    // header
    .header {
        position: fixed;
        top: 0;
        z-index: 2;
        background: #9ED2BE;
        width: 100vw;  
        height: 6vh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 5px 0;
        .iconButton {
            background-color: inherit;
            border: none;
            .icon {
                height: 3Vh;
                padding: 15px 0;
            }
        }
        .custButton {
            position: absolute;
            border-radius: 5px;
            right: 5vw;
            top: 15px;
            height: 4vh;
            padding: 0 5px;
            background-color: #FFFFFF;
            color: #7EAA92;
            border: none;
        }
        .history {
            position: fixed;
            // background-color: inherit;
            // color: #FFFFFF;
            border: #F1F1F1 1px solid;
            width: fit-content;
            left: 5vw; 
        }
    }
    @media screen and (min-width: 768px) {
        .header {
            height: 9vh;
            padding: 0;
            .iconButton {
                cursor: pointer;
                .icon {
                    height: 6vh;
                    padding: 1vh;
                }
            }
            .custButton {
                right: 30px;
                height: 6vh;
                font-size: 16px;
                cursor: pointer;
            }
            .history {
                left: 30px;
            }
        }
    }
</style>