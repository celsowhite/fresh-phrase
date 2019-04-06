// Imports

import { languageCodes, languages } from '../data/languages';

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
    // Save Language Info

    const activeLanguageCodeInfo = languageCodes[this.state.activeLanguageCode];

    const originalTextLanguage = activeLanguageCodeInfo.originalTextLanguage;
    let originalTextInfo = languages[originalTextLanguage];

    const translatedTextLanguage =
      activeLanguageCodeInfo.translatedTextLanguage;
    let translatedTextInfo = languages[translatedTextLanguage];

    // Dynamically set the phrases

    const rand =
      Math.floor(Math.random() * activeLanguageCodeInfo.translations.length) +
      0;

    originalTextInfo.phrase =
      activeLanguageCodeInfo.translations[rand][originalTextLanguage];
    translatedTextInfo.phrase =
      activeLanguageCodeInfo.translations[rand][translatedTextLanguage];

    // Reset the current translation.
    this.state.translation = [];

    // Push the active languages up to data
    this.state.translation.push(originalTextInfo);
    this.state.translation.push(translatedTextInfo);
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
