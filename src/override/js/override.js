/*======================
Set Languages Function
======================*/

var setupLanguages = function() {

	chrome.storage.sync.get(function(settings) {

		/*==================================
		Save the users language settings
		==================================*/

		var languageCode;

		var totalEntries;
		
		var firstLanguage;

		var firstLanguageBackgroundColor;

		var firstLanguageTextColor;

		var secondLanguage;

		var secondLanguageBackgroundColor;

		var secondLanguageTextColor;

		// If the users preferences are saved

		if(Object.keys(settings).length !== 0){

			languageCode = settings.languageCode;

			totalEntries = settings.totalEntries;
		
			firstLanguage = settings.firstLanguage;

			firstLanguageBackgroundColor = settings.firstLanguageBackgroundColor;

			firstLanguageTextColor = settings.firstLanguageTextColor;

			secondLanguage = settings.secondLanguage;

			secondLanguageBackgroundColor = settings.secondLanguageBackgroundColor;

			secondLanguageTextColor = settings.secondLanguageTextColor;

		}

		// Else the user has no language preferences then start with the default english -> portuguese

		else {
			languageCode = 'brep';

			totalEntries = 13890;
		
			firstLanguage = 'english';

			firstLanguageBackgroundColor = '#2942dc';

			firstLanguageTextColor = '#ffffff';

			secondLanguage = 'portuguese';

			secondLanguageBackgroundColor = '#239e46';

			secondLanguageTextColor = '#f7f409';
		}

		/*==================================
		Set Language Box Styles
		==================================*/

		document.documentElement.style.setProperty('--first_language_background_color', firstLanguageBackgroundColor);

		document.documentElement.style.setProperty('--first_language_text_color', firstLanguageTextColor);

		document.documentElement.style.setProperty('--second_language_background_color', secondLanguageBackgroundColor);

		document.documentElement.style.setProperty('--second_language_text_color', secondLanguageTextColor);

		/*==================================
		Set Flags
		==================================*/

		var firstFlag = document.getElementById('first_flag');

		var secondFlag = document.getElementById('second_flag');

		var firstFlagURL = chrome.extension.getURL('src/override/img/flags/' + firstLanguage + '_flag.svg');

		var secondFlagURL = chrome.extension.getURL('src/override/img/flags/' + secondLanguage + '_flag.svg');

		firstFlag.setAttribute('src', firstFlagURL);

		secondFlag.setAttribute('src', secondFlagURL);

		/*==================================
		AJAX Request for Translation Data
		==================================*/
		
		// Initialize a new Http Request

		var xhr = new XMLHttpRequest();

		// Create a random number between 10 and the Total amount of entries for a given language combination

		var searchOffset = Math.floor(Math.random() * totalEntries) + 10;

		// Specify details of the request including the API URL

		xhr.open('GET', 'http://api.pearson.com/v2/dictionaries/' + languageCode + '/entries?offset=' + searchOffset + '&limit=30&apiKey=' + config.apiKey + '&apiSecret=' + config.apiSecret, true);

		// Send the request

		xhr.send();

		// Set up the function to process the request

		var processRequest = function() {

			if(xhr.readyState === 4 && xhr.status === 200) {

				// Save response data

				var response = JSON.parse(xhr.responseText);
				console.log(response);
				var results = response.results;

				// Loop through the results until we hit a result that contains an example.

				for(var i=0; i<results.length; i++) {
					console.log(results[i]);
					if(results[i].senses !== null) {
						if(results[i].senses[0].translations !== undefined) {
							if(results[i].senses[0].translations[0].example !== undefined) {
								if(results[i].senses[0].translations[0].example[0].translation !== undefined) {
									if(results[i].senses[0].translations[0].example[0].translation.text[0] !== 'xxx') {
										var translations = results[i].senses[0].translations[0].example[0];
										var firstPhrase = translations.text;
										var secondPhrase = translations.translation.text[0];
										break;
									}
								}
							}
						}
					}
				}

				// Save DOM elements for where to place each phrase

				var firstLanguageText = document.querySelector('.first_language_text span');
				var secondLanguageText = document.querySelector('.second_language_text span');

				// Place the phrases into their containers

				firstLanguageText.innerHTML = firstPhrase;
				secondLanguageText.innerHTML = secondPhrase;
			}
		};

		xhr.addEventListener('readystatechange', processRequest);

	});

};

// Initialize on page load

setupLanguages();

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

  if(firstLanguage === 'english' && secondLanguage === 'portuguese') {
    languageCode = 'brep';
    totalEntries = 13890;
  }
  else if(firstLanguage === 'english' && secondLanguage === 'spanish') {
    languageCode = 'laes';
    totalEntries = 31258;
  }
  else if(firstLanguage === 'portuguese' && secondLanguage === 'english') {
    languageCode = 'brpe';
    totalEntries = 8766;
  }
  else if(firstLanguage === 'spanish' && secondLanguage === 'english') {
    languageCode = 'lase';
    totalEntries = 23729;
  }

  // Set the language selection settings in the storage.

  chrome.storage.sync.set({

    firstLanguage: firstLanguage,
    secondLanguage: secondLanguage,
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

/*======================
Restore Options
On page load set the options selector to the correct value.
======================*/

function restore_options() {
  chrome.storage.sync.get(function(settings) {

    // If the user has language settings then set the default selector value.

    if(Object.keys(settings).length !== 0) {
      languageSelector.value = settings.firstLanguage + '_' + settings.secondLanguage;
    }
    
  });
};

document.addEventListener('DOMContentLoaded', restore_options);

/*======================
Settings Link
======================*/

var settings = document.querySelector('.settings');

var settings_line = document.querySelector('.line_transform');

// Settings link hover transition

settings.addEventListener('mouseenter', function(){
	settings_line.classList.add('move');
});

settings.addEventListener('mouseleave', function(){
	settings_line.classList.remove('move');
});

// Reveal the options page

settings.addEventListener('click', function(){
	var body = document.querySelector('body');
	if(body.classList.contains('show_options')) {
		body.classList.remove('show_options');
	}
	else {
		body.classList.add('show_options');
	}
});