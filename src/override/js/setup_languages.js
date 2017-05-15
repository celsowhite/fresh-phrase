/*======================
Set Languages Function
======================*/

// Language function to add phrases to the page

var setupLanguages = function() {

	chrome.storage.sync.get(function(settings) {

		/*==================================
		Save the users language settings
		==================================*/

		var languageCode;

		var firstSynthLanguageCode;

		var secondSynthLanguageCode;

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

			firstSynthLanguageCode = settings.firstSynthLanguageCode;

			secondSynthLanguageCode = settings.secondSynthLanguageCode;

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

			firstSynthLanguageCode = 'pt-BR';

			secondSynthLanguageCode = 'en-US';

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
				var results = response.results;

				// Loop through the results until we hit a result that contains an example.

				for(var i=0; i<results.length; i++) {
					if(results[i].senses !== null) {
						if(results[i].senses[0].translations !== undefined) {
							if(results[i].senses[0].translations[0].example !== undefined) {
								if(results[i].senses[0].translations[0].example[0].translation !== undefined) {
									if(!results[i].senses[0].translations[0].example[0].translation.text[0].includes('xx')) {
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

				// Place the phrases into their containers and set the appropriate language codes
				// So we know what voice to use for speech synthesis

				firstLanguageText.innerHTML = firstPhrase;
				firstLanguageText.dataset.lang = firstSynthLanguageCode;
				secondLanguageText.innerHTML = secondPhrase;
				secondLanguageText.dataset.lang = secondSynthLanguageCode;

			}
		};

		xhr.addEventListener('readystatechange', processRequest);

	});

};

// Initialize on page load

setupLanguages();