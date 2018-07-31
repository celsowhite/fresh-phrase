<!-- Template -->

<template>
  <div id="app">
    <TranslationPanels />
    <SettingsButton />
    <LanguageSettings />
  </div>
</template>

<!-- Script -->

<script>
  
  // Imports

  import './styles/main.scss';
  import TranslationPanels from './components/TranslationPanels';
  import SettingsButton from './components/SettingsButton';
  import LanguageSettings from './components/LanguageSettings';
  import { store } from "./store/store.js";
    
  // Component Setup
  
  export default {
    name: 'App',
    components: {
      TranslationPanels,
      SettingsButton,
      LanguageSettings
    },
    created: function() {
      
      // Set initial language code before the app renders.
      // Need to set in 'created' because other components depend on knowing this code to render properly.
      
      store.setInitialLanguageCode();
            
    },
    mounted: function () {
            
      store.setTranslation();
      
    }
    
  }

</script>

<!-- Style-->

<style>

</style>
