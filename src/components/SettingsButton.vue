<template>
    <div class="settings" @click="toggleLanguageSettings">
        <span>Settings</span> 
        <div class="line_transform"></div>
    </div>
</template>

<script>
    
    import { store } from "../store/store.js";
        
    export default {
        name: 'SettingsButton',
        methods: {
            toggleLanguageSettings(){
                store.toggleLanguageSettings();
            }
        }
    }
    
</script>

<style scoped lang="scss">

    .settings {
        position: absolute;
        cursor: pointer;
        top: 30px;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 13;
    }

    .settings span {
        color: white;
        text-transform: uppercase;
        margin-right: 10px;
        font-size: 13px;
        line-height: 13px;
    }

    .line_transform {
        width: 30px;
        height: 2px;
        top: -1px;
        position: relative;
        background: white;
        display: inline-block;
        transition: all .3s ease-in-out;
    }

    .show_options .line_transform {
        margin-right: 10px;
    }
    
    .settings:hover .line_transform {
        width: 40px;
    }

    .line_transform:before {
        content: '';
        background: white;
        position: absolute;
        width: 30px;
        height: 2px;
        transition: all .3s ease-in-out;
    }

    .show_options .line_transform {
        width: 20px;
        transform: rotate(45deg);
    }

    .show_options .line_transform:before {
        width: 20px;
        transform: rotate(-90deg);
    }

</style>