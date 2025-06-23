const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

const translator = new Translator();

suite('Unit Tests', () => {

  suite('American to British English Translation', () => {

    test('Translate "Mangoes are my favorite fruit." to British English', function() {
      const text = 'Mangoes are my favorite fruit.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'favourite');
      assert.include(result.translation, '<span class="highlight">favourite</span>');
    });

    test('Translate "I ate yogurt for breakfast." to British English', function() {
      const text = 'I ate yogurt for breakfast.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'yoghurt');
      assert.include(result.translation, '<span class="highlight">yoghurt</span>');
    });

    test('Translate "We had a party at my friend\'s condo." to British English', function() {
      const text = 'We had a party at my friend\'s condo.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'flat');
      assert.include(result.translation, '<span class="highlight">flat</span>');
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', function() {
      const text = 'Can you toss this in the trashcan for me?';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'bin');
      assert.include(result.translation, '<span class="highlight">bin</span>');
    });

    test('Translate "The parking lot was full." to British English', function() {
      const text = 'The parking lot was full.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'car park');
      assert.include(result.translation, '<span class="highlight">car park</span>');
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', function() {
      const text = 'Like a high tech Rube Goldberg machine.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Heath Robinson device');
      assert.include(result.translation, '<span class="highlight">Heath Robinson device</span>');
    });

    test('Translate "To play hooky means to skip class or work." to British English', function() {
      const text = 'To play hooky means to skip class or work.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'bunk off');
      assert.include(result.translation, '<span class="highlight">bunk off</span>');
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', function() {
      const text = 'No Mr. Bond, I expect you to die.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Mr');
      assert.include(result.translation, '<span class="highlight">Mr</span>');
    });

    test('Translate "Dr. Grosh will see you now." to British English', function() {
      const text = 'Dr. Grosh will see you now.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Dr');
      assert.include(result.translation, '<span class="highlight">Dr</span>');
    });

    test('Translate "Lunch is at 12:15 today." to British English', function() {
      const text = 'Lunch is at 12:15 today.';
      const result = translator.translate(text, 'american-to-british');
      assert.equal(result.text, text);
      assert.include(result.translation, '12.15');
      assert.include(result.translation, '<span class="highlight">12.15</span>');
    });

  });

  suite('British to American English Translation', () => {

    test('Translate "We watched the footie match for a while." to American English', function() {
      const text = 'We watched the footie match for a while.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'soccer');
      assert.include(result.translation, '<span class="highlight">soccer</span>');
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', function() {
      const text = 'Paracetamol takes up to an hour to work.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Tylenol');
      assert.include(result.translation, '<span class="highlight">Tylenol</span>');
    });

    test('Translate "First, caramelise the onions." to American English', function() {
      const text = 'First, caramelise the onions.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'caramelize');
      assert.include(result.translation, '<span class="highlight">caramelize</span>');
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', function() {
      const text = 'I spent the bank holiday at the funfair.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'public holiday');
      assert.include(result.translation, 'carnival');
    });

    test('Translate "I had a bicky then went to the chippy." to American English', function() {
      const text = 'I had a bicky then went to the chippy.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'cookie');
      assert.include(result.translation, 'fish-and-chip shop');
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', function() {
      const text = 'I\'ve just got bits and bobs in my bum bag.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'odds and ends');
      assert.include(result.translation, 'fanny pack');
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', function() {
      const text = 'The car boot sale at Boxted Airfield was called off.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'swap meet');
      assert.include(result.translation, '<span class="highlight">swap meet</span>');
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', function() {
      const text = 'Have you met Mrs Kalyani?';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Mrs.');
      assert.include(result.translation, '<span class="highlight">Mrs.</span>');
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', function() {
      const text = 'Prof Joyner of King\'s College, London.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, 'Prof.');
      assert.include(result.translation, '<span class="highlight">Prof.</span>');
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', function() {
      const text = 'Tea time is usually around 4 or 4.30.';
      const result = translator.translate(text, 'british-to-american');
      assert.equal(result.text, text);
      assert.include(result.translation, '4:30');
      assert.include(result.translation, '<span class="highlight">4:30</span>');
    });

  });

  suite('Highlighting Tests', () => {

    test('Highlight translation in "Mangoes are my favorite fruit."', function() {
      const text = 'Mangoes are my favorite fruit.';
      const result = translator.translate(text, 'american-to-british');
      assert.include(result.translation, '<span class="highlight">favourite</span>');
      assert.notInclude(result.translation, 'favorite');
    });

    test('Highlight translation in "I ate yogurt for breakfast."', function() {
      const text = 'I ate yogurt for breakfast.';
      const result = translator.translate(text, 'american-to-british');
      assert.include(result.translation, '<span class="highlight">yoghurt</span>');
      assert.notInclude(result.translation, 'yogurt');
    });

    test('Highlight translation in "We watched the footie match for a while."', function() {
      const text = 'We watched the footie match for a while.';
      const result = translator.translate(text, 'british-to-american');
      assert.include(result.translation, '<span class="highlight">soccer</span>');
      assert.notInclude(result.translation, 'footie');
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', function() {
      const text = 'Paracetamol takes up to an hour to work.';
      const result = translator.translate(text, 'british-to-american');
      assert.include(result.translation, '<span class="highlight">Tylenol</span>');
      assert.notInclude(result.translation, 'Paracetamol');
    });

  });

});