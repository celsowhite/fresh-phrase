<!-- Template -->

<template>
    
    <section class="language_container">
        <section v-for="sentence in translation" :key="sentence.code" class="language_half_container">
            <div class="translation_container first_language_text" :style="{ backgroundColor: sentence.backgroundColor }">
                <span :style="{ color: sentence.color }">{{ sentence.phrase }}</span>
                <p class="play_voice" @click="speakPhrase(sentence.phrase, sentence.voice)"><i class="far fa-volume-down"></i></p>
            </div>
            <div class="flag_container">
                <img :src="require(`@/assets/flags/${sentence.flag}`)" alt="">
            </div>
        </section>
    </section>

</template>

<!-- Script -->

<script>
    
    // Setup speech synthesis. Get the voices available by the browser

    let voices = [];

    window.speechSynthesis.onvoiceschanged = function() {
        voices = window.speechSynthesis.getVoices();
    }

    // Component Setup

    export default {
        name: 'TranslationPanels',
        props: {
            translation: Array
        },
        methods: {
            
            speakPhrase(phrase, voiceName){
                
                // Setup the utterance object. This object holds the message and other settings that will be spoken by the browser
                
                const msg = new SpeechSynthesisUtterance();
                
                // Find the specific voice object we want to use within our voices array.
                // The voiceName is set in our language data.
                
	            const selectedVoice = voices.find(voice => voice.name === voiceName);
                
                // Set the voice and text on the utterance object
                
                msg.voice = selectedVoice;
	            msg.text = phrase;
                
                // Trigger the browser to speak the phrase
                
                speechSynthesis.speak(msg);
                
            }
            
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
    
    // Volume
    
    p.play_voice {
        cursor: pointer;
        transition: all .3s ease-in-out;
        
        &:hover {
            transform: scale(1.2)
        }
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