<div class="header">
    <img class="icon" src="/vocabo.png" alt="Vocabo"/>
    <button class="signin" on:click={()=>{}}>Sign In</button>
</div>
<slot></slot>

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
        .icon {
            height: 3Vh;
            padding: 15px 0;
        }
        .signin {
            position: absolute;
            border-radius: 5px;
            right: 5vw;
            top: 2vh;
            height: 4vh;
            background-color: #FFFFFF;
            color: #7EAA92;
            border: none;
        }
    }
    @media screen and (min-width: 768px) {
        .header {
            height: 9vh;
            padding: 0;
            .icon {
                height: 6vh;
                padding: 1vh;
            }
            .signin {
                right: 30px;
                height: 6vh;
                font-size: 16px;
                cursor: pointer;
            }
        }
    }
</style>