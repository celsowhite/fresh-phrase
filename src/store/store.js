// Imports

import portugueseData from '../data/english-portuguese.json';
import spanishData from '../data/english-spanish.json';

// Store

export const store = {
  // Global State

  state: {
    activeLanguageCode: '',
    languageSettingsVisible: false,
    translation: [],
    languages: {
      english: {
        backgroundColor: '#2942dc',
        color: '#FFFFF',
        flag: 'usa.svg',
        voice: 'Samantha',
      },
      portuguese: {
        backgroundColor: '#239e46',
        color: '#f7f409',
        flag: 'brazil.svg',
        voice: 'Luciana',
      },
      spanish: {
        backgroundColor: '#0067c6',
        color: '#fffff',
        flag: 'panama.svg',
        voiceName: 'Juan',
      },
    },
    languageCodes: {
      brep: {
        originalLanguage: 'english',
        translatedLanguage: 'portuguese',
        translations: portugueseData,
      },
      laes: {
        originalLanguage: 'english',
        translatedLanguage: 'spanish',
        translations: spanishData,
      },
    },
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
    // Save Active Language Info

    const activeLanguageInfo = this.state.languageCodes[
      this.state.activeLanguageCode
    ];

    const originalLanguage = activeLanguageInfo.originalLanguage;

    const translatedLanguage = activeLanguageInfo.translatedLanguage;

    // Get a random index so we can select a translation from our list.

    const rand =
      Math.floor(Math.random() * activeLanguageInfo.translations.length) + 0;

    // Set the new translation in state.

    const newTranslation = [
      {
        language: activeLanguageInfo.originalLanguage,
        text: activeLanguageInfo.translations[rand][originalLanguage],
      },
      {
        language: activeLanguageInfo.translatedLanguage,
        text: activeLanguageInfo.translations[rand][translatedLanguage],
      },
    ];
    this.state.translation = newTranslation;
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
