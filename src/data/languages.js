import portugueseData from './english-portuguese.json';
import spanishData from './english-spanish.json';

// Language Codes

export const languageCodes = {
  brep: {
    code: 'brep',
    originalTextLanguage: 'english',
    translatedTextLanguage: 'portuguese',
    totalEntries: 8000,
    translations: portugueseData,
  },
  laes: {
    code: 'laes',
    originalTextLanguage: 'english',
    translatedTextLanguage: 'spanish',
    totalEntries: 8000,
    translations: spanishData,
  },
};

// Languages

export const languages = {
  english: {
    code: 'english',
    backgroundColor: '#2942dc',
    color: '#FFFFF',
    flag: 'usa.svg',
    voice: 'Samantha',
  },
  portuguese: {
    code: 'portuguese',
    backgroundColor: '#239e46',
    color: '#f7f409',
    flag: 'brazil.svg',
    voice: 'Luciana',
  },
  spanish: {
    code: 'spanish',
    backgroundColor: '#0067c6',
    color: '#fffff',
    flag: 'panama.svg',
    voiceName: 'Juan',
  },
};
