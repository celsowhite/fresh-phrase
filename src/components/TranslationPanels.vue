<!-- Template -->

<template>
    
    <section class="language_container" :href="translationCode">
        <section v-for="sentence in translation" :key="sentence.code" class="language_half_container">
            <div class="translation_container first_language_text" :style="{ backgroundColor: sentence.backgroundColor }">
                <span :style="{ color: sentence.color }">{{ sentence.phrase }}</span>
            </div>
            <div class="flag_container">
                <img :src="require(`@/assets/flags/${sentence.flag}`)" alt="">
            </div>
        </section>
    </section>

</template>

<!-- Script -->

<script>
        
    // Component Setup

    export default {
        name: 'TranslationPanels',
        props: {
            translationCode: String, 
            translation: Array
        }
    }    
    
</script>

<!-- Style -->

<style scoped lang="scss">

    /*=================== 
    Languages
    ===================*/ 

    section.language_container {
        display: flex;
        position: relative;
        height: 100vh;
        color: #FFFFFF;
    }

    .language_half_container {
        height: 100vh;
        width: 50%;
    }

    .translation_container {
        height: 92vh;
        display: flex;
        padding: 0 50px;
        font-size: 30px;
        text-align: center;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        
        transition: filter .3s ease-in-out;
    }

    .translation_container span {
        transition: filter .3s ease-in-out;
    }

    .show_options .translation_container span {
        filter: blur(3px);
    }

    /*=================== 
    Flags
    ===================*/

    .flag_container {
        height: 8vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        img {
            width: 40px;
            transition: filter .3s ease-in-out;
        }
    }

    .show_options .flag_container img {
        filter: blur(3px);
    }

</style>