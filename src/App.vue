<!-- Template -->

<template>
  <div id="app">
    <TranslationPanels :translation="translation" />
    <SettingsButton @toggleLanguageSettings="toggleLanguageSettings" />
    <LanguageSettings :isVisible="languageSettingsVisible" :activeLanguageCode="activeLanguageCode" @changeLanguage="changeLanguage" />
  </div>
</template>

<!-- Script -->

<script>
  
  // Imports

  import './styles/main.scss';
  import apiConfig from '../config/api';
  import axios from 'axios';
  import TranslationPanels from './components/TranslationPanels';
  import SettingsButton from './components/SettingsButton';
  import LanguageSettings from './components/LanguageSettings';
  import { languageCodes, languages } from './data/languages';
  import { findTrueTranslation } from './helpers/helpers';
    
  // Component Setup
  
  export default {
    name: 'App',
    components: {
      TranslationPanels,
      SettingsButton,
      LanguageSettings
    },
    data() {
      return {
        activeLanguageCode: '',
        translation: [],
        languageSettingsVisible: false
      }
    },
    created: function() {
      
      // Get the langauge code from the users local storage.
      // If none exists then set the default as our first available language code.

      if (localStorage.getItem('freshPhraseLangauge') === null) {
        this.activeLanguageCode = Object.keys(languageCodes)[0];
      }
      else {
        this.activeLanguageCode = localStorage.getItem('freshPhraseLangauge');
      }
      
    },
    mounted: function () {
      // Set initial translation
      this.setTranslation();
    },
    methods: {
      
      // Set a new translation in our state.
      
      setTranslation() {
        
        let self = this;
            
        // Save Language Info
        
        const activeLanguageCodeInfo = languageCodes[this.activeLanguageCode]
        
        const originalTextLanguage = activeLanguageCodeInfo.originalTextLanguage;
        let originalTextInfo = languages[originalTextLanguage];

        const translatedTextLanguage = activeLanguageCodeInfo.translatedTextLanguage;
        let translatedTextInfo = languages[translatedTextLanguage];
        
        // Create a random number between 10 and the Total amount of entries for a given language combination

        var searchOffset = Math.floor(Math.random() * activeLanguageCodeInfo.totalEntries) + 10;
            
        axios.get(`http://api.pearson.com/v2/dictionaries/${this.activeLanguageCode}/entries?offset=${searchOffset}&limit=30&apiKey=${apiConfig.pearson.apiKey}&apiSecret=GhdhSUFHOG5Ukm7Q${apiConfig.pearson.secretKey}`)
          .then(function (response) {
              const results = response.data.results;
              findTrueTranslation(results).then((translations) => {
                console.log(translations);
                // Dynamically set the phrases
                originalTextInfo.phrase = translations.text;
                translatedTextInfo.phrase = translations.translation.text[0];
                // Push the active languages up to data
                self.translation = [];
                self.translation.push(originalTextInfo);
                self.translation.push(translatedTextInfo);
              });
          })
          .catch(function (error) {
              console.log(error);
          });
      },
      
      // Show/Hide the language setting screen
      
      toggleLanguageSettings() {
        this.languageSettingsVisible = !this.languageSettingsVisible;
      },
      
      // Dynamically change the language
      
      changeLanguage(newLanguageCode) {
        
        // Save the new langauge code in state and in localStorage
        
        this.activeLanguageCode = newLanguageCode;
        localStorage.setItem('freshPhraseLangauge', newLanguageCode);
        
        // Reset the translation on the page
        
        this.setTranslation();
        
        // Hide the language settings overlay
        
        this.toggleLanguageSettings();
        
      }
      
    }
  }

</script>

<!-- Style-->

<style>

</style>
