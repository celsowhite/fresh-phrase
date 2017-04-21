About
===
Fresh Phrase is a Google Chrome Extension that gives you a random translation each time you open a new tab. 

It'll help you stay fresh on a lanugage you have been practicing or are already conversational in. When you hit a new tab take a few seconds to learn a new phrase.

Languages
===

Currently available in: 
* English -> Brazilian Portuguese
* English -> Spanish. 

More will be added as the API's become available. Thanks to [Pearson](http://developer.pearson.com/apis/dictionaries) for providing an extensive dictionary API.

Usage
===

1. Install in the [Chrome Web Store](http://celsowhite.com).
2. Open a new tab.
3. Set your language translation settings.
4. Learn!

Development
===

You are more than welcome to contribute to this extension. Especially if you have ideas for including more languages!

1. Download via this repo.
2. Create an app on [Pearson](http://developer.pearson.com/) and get an API key.
3. Add a config.js to the src/override/js folder. The config should be formatted as follows:
```javascript
var config = {
	apiKey: 'YOUR-PEARSON-API-KEY',
	apiSecret: 'YOUR-PEARSON-API-SECRET'
}
```
4. Go to your Chrome extensions page Window > Extenstions or (chrome://extensions/)
5. Turn on Developer Mode
6. Load the unpacked extension folder.

Future Features
===

* More languages
* Ability to select type of phrase (business, liesure, sports, politics, etc.).
* Ability to practice a set group of phrases for a given time period. (For those that learn better through constant repitition.)
