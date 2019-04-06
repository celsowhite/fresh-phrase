# About

Fresh Phrase is a Google Chrome Extension built using Vue JS that gives you a random translation each time you open a new tab.

It'll help you stay fresh on a language you have been practicing or are already conversational in. When you hit a new tab take a few seconds to learn a new phrase.

# Languages

Currently available in:

- English -> Brazilian Portuguese
- English -> Spanish.

More will be added as the API's become available. Thanks to [Pearson](http://developer.pearson.com/apis/dictionaries) for providing an extensive dictionary API. Their API is currently deprecated so I've included their translation data in this repo as static json files.

# Usage

1. Install in the [Chrome Web Store](https://chrome.google.com/webstore/detail/fresh-phrase/efddjajgkbcnlojnmbcnmckcmhibginc?hl=en-US).
2. Open a new tab.
3. Set your language translation settings.
4. Learn!

# Development

You are more than welcome to contribute to this extension. Especially if you have ideas for including more languages!

1. Clone this repo.
2. Install dependencies.

```bash
npm install
```

3. Serve with hot reload at localhost:8080.

```bash
npm run dev
```

# Build

To see the app live in a new tab then follow the below instructions:

1. Create a minified production ready version of the app in the 'dist' folder.

```bash
npm run build
```

2. Go to your Chrome extensions page Window > Extensions or (chrome://extensions/).
3. Turn on Developer Mode.
4. Load the unpacked extension 'dist' folder.

# Future Features

- More languages
- Ability to select type of phrase (business, leisure, sports, politics, etc.).
- Ability to practice a set group of phrases for a given time period. (For those that learn better through constant repetition.)
