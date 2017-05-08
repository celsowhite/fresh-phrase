/*======================
Restore Options
On page load set the options selector to the correct value.
======================*/

function restore_options() {
	
	var languageSelector = document.getElementById('language_selector');

	chrome.storage.sync.get(function(settings) {

		// If the user has language settings then set the default selector value.

		if(Object.keys(settings).length !== 0) {
		  languageSelector.value = settings.firstLanguage + '_' + settings.secondLanguage;
		}

	});
};

document.addEventListener('DOMContentLoaded', restore_options);