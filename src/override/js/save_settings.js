/*======================
Save Settings
======================*/

// Variables

var languageSelector = document.getElementById('language_selector');

var backgroundColors = {
  english: '#2942dc',
  portuguese: '#239e46',
  spanish: '#0067c6',
  chinese: '#de2910'
};

var textColors = {
  english: '#ffffff',
  portuguese: '#f7f409',
  spanish: '#fff',
  chinese: '#ffde00'
};

function save_settings() {

  // Get the users language selection from the value of the select dropdown.
  // Save the associated language data (code and total entries for the API call)

  var languages = languageSelector.value;
  var languagesArray = languages.split('_');
  var firstLanguage = languagesArray[0];
  var secondLanguage = languagesArray[1];
  var languageCode;
  var totalEntries;
  var firstSynthLanguageCode;
  var secondSynthLanguageCode;

  if(firstLanguage === 'english' && secondLanguage === 'portuguese') {
    languageCode = 'brep';
    firstSynthLanguageCode = 'en-US';
    secondSynthLanguageCode = 'pt-BR';
    totalEntries = 13890;
  }
  else if(firstLanguage === 'english' && secondLanguage === 'spanish') {
    languageCode = 'laes';
    firstSynthLanguageCode = 'en-US';
    secondSynthLanguageCode = 'es-ES';
    totalEntries = 31258;
  }
  else if(firstLanguage === 'portuguese' && secondLanguage === 'english') {
    languageCode = 'brpe';
    firstSynthLanguageCode = 'pt-BR';
    secondSynthLanguageCode = 'en-US';
    totalEntries = 8766;
  }
  else if(firstLanguage === 'spanish' && secondLanguage === 'english') {
    languageCode = 'lase';
    firstSynthLanguageCode = 'es-ES';
    secondSynthLanguageCode = 'en-US';
    totalEntries = 23729;
  }

  // Set the language selection settings in the storage.

  chrome.storage.sync.set({

    firstLanguage: firstLanguage,
    secondLanguage: secondLanguage,
    firstSynthLanguageCode: firstSynthLanguageCode,
    secondSynthLanguageCode: secondSynthLanguageCode,
    languageCode: languageCode,
    totalEntries: totalEntries,
    firstLanguageBackgroundColor: backgroundColors[firstLanguage],
    firstLanguageTextColor: textColors[firstLanguage],
    secondLanguageBackgroundColor: backgroundColors[secondLanguage],
    secondLanguageTextColor: textColors[secondLanguage]

  }, function(settings) {

    // After language settings have been set then transform the page.

  	setupLanguages();

    // Indicate that the options were properly saved.
    
    var saveButton = document.getElementById('save');
    
    setTimeout(function() {
      document.querySelector('body').classList.remove('show_options');
    }, 500);

  });

}

document.getElementById('save').addEventListener('click', save_settings);