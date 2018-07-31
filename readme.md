About
===
Fresh Phrase is a Google Chrome Extension built using Vue JS that gives you a random translation each time you open a new tab. 

It'll help you stay fresh on a language you have been practicing or are already conversational in. When you hit a new tab take a few seconds to learn a new phrase.

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

1. Clone this repo.
2. Create an app on [Pearson](http://developer.pearson.com/) and get an API key.
3. Add your config file api.js to the root config folder. The config should be formatted as follows:
```javascript
module.exports = {
    pearson: {
        apiKey: 'YOUR-PEARSON-API-KEY',
	    apiSecret: 'YOUR-PEARSON-API-SECRET'
    }
}
```
4. Use the following bash scripts to hot reload the app locally.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

Build
===

To see the app live in a new tab then follow the below instructions:

1. npm run build. This will prepare a minified production ready version of the app in the 'dist' folder.
1. Go to your Chrome extensions page Window > Extensions or (chrome://extensions/).
2. Turn on Developer Mode.
3. Load the unpacked extension 'dist' folder.

Future Features
===

* More languages
* Ability to select type of phrase (business, leisure, sports, politics, etc.).
* Ability to practice a set group of phrases for a given time period. (For those that learn better through constant repetition.)
