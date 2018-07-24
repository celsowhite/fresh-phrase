<!-- Template -->

<template>
  <div id="app">
    <TranslationPanels :translationCode="activeLanguageCode" :translation="translation" />
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
        activeLanguageCode: 'brep',
        translation: [],
        languageSettingsVisible: false
      }
    },
    mounted: function () {
      this.setTranslations();
    },
    methods: {
      
      // Set the new translation in our state.
      
      setTranslations() {
        
        let self = this;
            
        // Save Language Info
        
        const activeLanguageCodeInfo = languageCodes[this.activeLanguageCode]
        
        const originalLanguageCode = activeLanguageCodeInfo.originalLanguage;
        let originalLanguageInfo = languages[originalLanguageCode];
        
        const translatedLanguageCode = activeLanguageCodeInfo.translatedLanguage;
        let translatedLanguageInfo = languages[translatedLanguageCode];
        
        // Create a random number between 10 and the Total amount of entries for a given language combination

        var searchOffset = Math.floor(Math.random() * activeLanguageCodeInfo.totalEntries) + 10;
            
        axios.get(`http://api.pearson.com/v2/dictionaries/${this.activeLanguageCode}/entries?offset=${searchOffset}&limit=30&apiKey=${apiConfig.pearson.apiKey}&apiSecret=GhdhSUFHOG5Ukm7Q${apiConfig.pearson.secretKey}`)
          .then(function (response) {
              const results = response.data.results;
              findTrueTranslation(results).then((translations) => {
                console.log(translations);
                // Dynamically set the phrases
                originalLanguageInfo.phrase = translations.text;
                translatedLanguageInfo.phrase = translations.translation.text[0];
                // Push the active languages up to data
                self.translation = [];
                self.translation.push(originalLanguageInfo);
                self.translation.push(translatedLanguageInfo);
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
        this.activeLanguageCode = newLanguageCode;
        this.setTranslations();
        this.toggleLanguageSettings();
      }
      
    }
  }

</script>

<!-- Style-->

<style>

</style>
