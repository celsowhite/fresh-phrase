// Imports

import apiConfig from '../../config/api';
import axios from 'axios';
import TranslationPanels from '../components/TranslationPanels';
import SettingsButton from '../components/SettingsButton';
import LanguageSettings from '../components/LanguageSettings';
import { languageCodes, languages } from '../data/languages';
import { findTrueTranslation } from '../helpers/helpers';

// Store

export const store = {
  // Global State

  state: {
    activeLanguageCode: '',
    languageSettingsVisible: false,
    translation: [],
  },

  // Set initial language code

  setInitialLanguageCode() {
    // Get the language code from the users local storage.
    // If none exists then set the default as our first available language code.

    if (!localStorage.getItem('freshPhraseLanguage')) {
      this.setLanguageCode(Object.keys(languageCodes)[0]);
    } else {
      this.setLanguageCode(localStorage.getItem('freshPhraseLanguage'));
    }
  },

  // Set active language code

  setLanguageCode(languageCode) {
    this.state.activeLanguageCode = languageCode;
  },

  // Show/Hide the language setting screen

  toggleLanguageSettings() {
    this.state.languageSettingsVisible = !this.state.languageSettingsVisible;
  },

  // Set a new translation in our state using the active language code.

  setTranslation() {
    let self = this;

    // Save Language Info

    const activeLanguageCodeInfo = languageCodes[this.state.activeLanguageCode];

    const originalTextLanguage = activeLanguageCodeInfo.originalTextLanguage;
    let originalTextInfo = languages[originalTextLanguage];

    const translatedTextLanguage =
      activeLanguageCodeInfo.translatedTextLanguage;
    let translatedTextInfo = languages[translatedTextLanguage];

    // Create a random number between 10 and the Total amount of entries for a given language combination

    var searchOffset =
      Math.floor(Math.random() * activeLanguageCodeInfo.totalEntries) + 10;

    axios
      .get(
        `https://api.pearson.com/v2/dictionaries/${
          this.state.activeLanguageCode
        }/entries?offset=${searchOffset}&limit=30&apiKey=${
          apiConfig.pearson.apiKey
        }&apiSecret=GhdhSUFHOG5Ukm7Q${apiConfig.pearson.secretKey}`
      )
      .then(function(response) {
        const results = response.data.results;
        findTrueTranslation(results).then(translations => {
          // Dynamically set the phrases
          originalTextInfo.phrase = translations.text;
          translatedTextInfo.phrase = translations.translation.text[0];
          // Push the active languages up to data
          self.state.translation = [];
          self.state.translation.push(originalTextInfo);
          self.state.translation.push(translatedTextInfo);
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  // Dynamically change the language

  changeLanguage(newLanguageCode) {
    // Save the new language code in state and in localStorage

    this.state.activeLanguageCode = newLanguageCode;

    localStorage.setItem('freshPhraseLanguage', newLanguageCode);

    // Reset the translation on the page

    this.setTranslation();

    // Hide the language settings overlay

    this.toggleLanguageSettings();
  },
};
