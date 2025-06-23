const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require('./british-only.js');

class Translator {

  // Helper method to capitalize first letter
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Helper method to reverse a dictionary
  reverseDictionary(dict) {
    const reversed = {};
    for (const [key, value] of Object.entries(dict)) {
      reversed[value] = key;
    }
    return reversed;
  }

  // Method to translate American to British
  translateAmericanToBritish(text) {
    let translatedText = text;
    const translations = [];

    // Handle American titles FIRST (remove periods)
    for (const [american, british] of Object.entries(americanToBritishTitles)) {
      // Create patterns for both capitalized and lowercase versions
      const patterns = [
        american, // lowercase: "mr."
        this.capitalizeFirstLetter(american) // capitalized: "Mr."
      ];
      
      for (const pattern of patterns) {
        // Use regex that matches titles followed by space (not word boundary due to period)
        const regex = new RegExp('\\b' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=\\s)', 'g');
        
        // Check if pattern exists and replace it
        const matches = translatedText.match(regex);
        if (matches) {
          const replacement = pattern[0] === pattern[0].toUpperCase() 
            ? this.capitalizeFirstLetter(british) 
            : british;
          
          translatedText = translatedText.replace(regex, replacement);
          translations.push({ original: pattern, translation: replacement });
        }
      }
    }

    // Handle American-only phrases
    const americanOnlyEntries = Object.entries(americanOnly).sort((a, b) => b[0].length - a[0].length);
    for (const [american, british] of americanOnlyEntries) {
      const regex = new RegExp('\\b' + american.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      translatedText = translatedText.replace(regex, (match) => {
        const isCapitalized = match[0] === match[0].toUpperCase();
        const replacement = isCapitalized ? this.capitalizeFirstLetter(british) : british;
        translations.push({ original: match, translation: replacement });
        return replacement;
      });
    }

    // Handle American to British spelling
    for (const [american, british] of Object.entries(americanToBritishSpelling)) {
      const regex = new RegExp('\\b' + american + '\\b', 'gi');
      translatedText = translatedText.replace(regex, (match) => {
        const isCapitalized = match[0] === match[0].toUpperCase();
        const replacement = isCapitalized ? this.capitalizeFirstLetter(british) : british;
        translations.push({ original: match, translation: replacement });
        return replacement;
      });
    }

    // Handle time format (12:30 -> 12.30)
    translatedText = translatedText.replace(/(\d{1,2}):(\d{2})/g, (match, hours, minutes) => {
      const replacement = `${hours}.${minutes}`;
      translations.push({ original: match, translation: replacement });
      return replacement;
    });

    return { translatedText, translations };
  }

  // Method to translate British to American
  translateBritishToAmerican(text) {
    let translatedText = text;
    const translations = [];

    // Handle British titles FIRST (add periods)
    const reversedTitles = this.reverseDictionary(americanToBritishTitles);
    for (const [british, american] of Object.entries(reversedTitles)) {
      // Create patterns for both capitalized and lowercase versions
      const patterns = [
        british, // lowercase: "mr"
        this.capitalizeFirstLetter(british) // capitalized: "Mr"
      ];
      
      for (const pattern of patterns) {
        // Check for the pattern followed by space (not followed by period)
        const regex = new RegExp('\\b' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=\\s)(?!\\.)', 'g');
        const matches = translatedText.match(regex);
        if (matches) {
          const replacement = pattern[0] === pattern[0].toUpperCase() 
            ? this.capitalizeFirstLetter(american) 
            : american;
          
          translatedText = translatedText.replace(regex, replacement);
          translations.push({ original: pattern, translation: replacement });
        }
      }
    }

    // Handle British-only phrases
    const britishOnlyEntries = Object.entries(britishOnly).sort((a, b) => b[0].length - a[0].length);
    for (const [british, american] of britishOnlyEntries) {
      const regex = new RegExp('\\b' + british.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
      translatedText = translatedText.replace(regex, (match) => {
        const isCapitalized = match[0] === match[0].toUpperCase();
        const replacement = isCapitalized ? this.capitalizeFirstLetter(american) : american;
        translations.push({ original: match, translation: replacement });
        return replacement;
      });
    }

    // Handle British to American spelling
    const reversedSpelling = this.reverseDictionary(americanToBritishSpelling);
    for (const [british, american] of Object.entries(reversedSpelling)) {
      const regex = new RegExp('\\b' + british + '\\b', 'gi');
      translatedText = translatedText.replace(regex, (match) => {
        const isCapitalized = match[0] === match[0].toUpperCase();
        const replacement = isCapitalized ? this.capitalizeFirstLetter(american) : american;
        translations.push({ original: match, translation: replacement });
        return replacement;
      });
    }

    // Handle time format (12.30 -> 12:30)
    translatedText = translatedText.replace(/(\d{1,2})\.(\d{2})/g, (match, hours, minutes) => {
      const replacement = `${hours}:${minutes}`;
      translations.push({ original: match, translation: replacement });
      return replacement;
    });

    return { translatedText, translations };
  }

  // Method to highlight translations
  highlightTranslations(originalText, translations) {
    let highlightedText = originalText;
    
    // Sort translations by length (longest first) to avoid partial replacements
    const sortedTranslations = translations.sort((a, b) => b.original.length - a.original.length);
    
    for (const { original, translation } of sortedTranslations) {
      // For titles ending with period, use lookahead for space
      if (original.endsWith('.')) {
        const regex = new RegExp('\\b' + original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=\\s)', 'g');
        highlightedText = highlightedText.replace(regex, `<span class="highlight">${translation}</span>`);
      } else {
        // For other words, use word boundaries
        const regex = new RegExp('\\b' + original.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
        highlightedText = highlightedText.replace(regex, `<span class="highlight">${translation}</span>`);
      }
    }
    
    return highlightedText;
  }

  // Main translate method
  translate(text, locale) {
    if (!text) {
      return { error: "No text to translate" };
    }

    if (!locale) {
      return { error: "Required field(s) missing" };
    }

    if (locale !== 'american-to-british' && locale !== 'british-to-american') {
      return { error: "Invalid value for locale field" };
    }

    if (text.trim() === '') {
      return { error: "No text to translate" };
    }

    let result;
    if (locale === 'american-to-british') {
      result = this.translateAmericanToBritish(text);
    } else {
      result = this.translateBritishToAmerican(text);
    }

    // If no translations were made
    if (result.translations.length === 0) {
      return { 
        text: text, 
        translation: "Everything looks good to me!" 
      };
    }

    // Return with highlighting
    const highlighted = this.highlightTranslations(text, result.translations);
    
    return {
      text: text,
      translation: highlighted
    };
  }
}

module.exports = Translator;