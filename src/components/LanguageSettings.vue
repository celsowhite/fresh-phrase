<template>
    <div class="options_container" :class="{ show_options: storeState.languageSettingsVisible }">
        <div class="options_container_transparent_layer" @click="toggleLanguageSettings"></div>
        <div class="options_content">
            <h1>Select Your Language</h1> 
            <select v-model="languageSelection">
                <option value="brep">English &#8594; Portuguese</option>
                <option value="laes">English &#8594; Spanish</option>
            </select>
            <button id="save" @click="changeLanguage">Save</button>
        </div>
        <p class="credits">Made by <a href="http://celsowhite.com" target="_blank">Celso White</a></p>
    </div>
</template>

<script>
    
    import { store } from "../store/store.js";

    export default {
        name: 'LanguageSettings',
        data() {
            return {
                storeState: store.state,
                languageSelection: store.state.activeLanguageCode
            }
        },
        methods: {
            changeLanguage() {
                store.changeLanguage(this.languageSelection);
            },
            toggleLanguageSettings() {
                store.toggleLanguageSettings();
            }
        }
    }
    
</script>

<style scoped lang="scss">

    /*========================
    OPTIONS
    ========================*/

    .options_container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background: rgba(0,0,0,.8);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: -10;
        transition: all .2s ease-in-out;
    }

    .options_container.show_options {
        opacity: 1;
        z-index: 10;
    }
    
    // Content
    
    .options_content {
        z-index: 13;
    }

    h1 {
        font-size: 30px;
        letter-spacing: 1px;
        margin-bottom: 20px;
    }

    select {
        -webkit-appearance: none;
        text-align: center;
        width: 100%;
        background: white;
        border: 0;
        font-size: 20px;
        border-radius: 0;
        padding: 10px 20px;
        margin-bottom: 20px;
        color: #3d3d3d;
        font-family: 'jaapokki';
    }

    button {
        border-radius: 0;
        outline: 0;
        width: 100%;
        -webkit-appearance: none;
        background: transparent;
        padding: 10px 20px;
        border: 3px solid white;
        font-family: 'jaapokki';
        text-transform: uppercase;
        color: white;
        cursor: pointer;
        font-size: 20px;
        transition: all .3s ease-in-out;
    }

    button:hover {
        color: #3d3d3d;
        background: #ffffff;
    }

    .credits {
        position: absolute;
        z-index: 13;
        font-size: 13px;
        text-transform: uppercase;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }

    a {
        color: #ffffff;
    }
    
    // Transparent Layer
    
    .options_container_transparent_layer {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        opacity: 0;
        width: 100%;
        height: 100%;    
    }
    
</style>