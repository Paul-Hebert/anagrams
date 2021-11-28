const fs = require("fs");
const mergeLetters = require("./utils/merge-letters.js");
const findAnagrams = require("./utils/find-anagrams.js");

/**
 * Settings
 */

const minMatches = 2;
const minLength = 3;

/**
 * Merge individual letter JSON files into one big dictionary
 */
console.log(`Merging letter JSON files.`);

const dictionary = mergeLetters();

fs.writeFileSync(
  "./generator/intermediary-steps/all-words.json",
  JSON.stringify(dictionary, null, 2),
  "utf8"
);

const wordsLength = Object.keys(dictionary).length;
console.log(`${wordsLength} words merged and written to all-words.json`);

/**
 * Find sets of anagrams in our dictionary
 */
console.log(`Finding anagrams.`);

const anagrams = findAnagrams(dictionary, minLength);

fs.writeFileSync(
  "./generator/intermediary-steps/anagrams.json",
  JSON.stringify(anagrams, null, 2),
  "utf8"
);

const anagramsLength = Object.keys(anagrams).length;
console.log(
  `${anagramsLength} anagram sets found and written to anagrams.json`
);

/**
 * Filter down our anagrams to find a higher quality set of matches
 */
console.log(`Filtering anagrams by number of matches.`);

const filteredAnagrams = Object.keys(anagrams)
  .filter((key) => anagrams[key].length >= minMatches)
  .reduce((cur, key) => {
    return Object.assign(cur, { [key]: anagrams[key] });
  }, {});

fs.writeFileSync(
  "./generator/intermediary-steps/filtered-anagrams-1.json",
  JSON.stringify(filteredAnagrams, null, 2),
  "utf8"
);

const filteredAnagramsLength = Object.keys(filteredAnagrams).length;
console.log(
  `Filtered down to ${filteredAnagramsLength} sets and written to filtered-anagrams-1.json`
);

/**
 * Filter down our anagrams by checking for common words
 */
console.log(`Filtering anagrams by checking they contain common words.`);

const commonWords = JSON.parse(
  fs.readFileSync(`./generator/data/common-words.json`, "utf8")
);

const topAnagrams = Object.keys(filteredAnagrams)
  .filter((key) => {
    const anagram = filteredAnagrams[key];
    let isCommon = false;
    anagram.forEach((word) => {
      if (commonWords.includes(word.name)) {
        isCommon = true;
      }
    });
    return isCommon;
  })
  .reduce((cur, key) => {
    return Object.assign(cur, { [key]: filteredAnagrams[key] });
  }, {});

fs.writeFileSync(
  "./generator/intermediary-steps/filtered-anagrams-2.json",
  JSON.stringify(topAnagrams, null, 2),
  "utf8"
);

const topAnagramsLength = Object.keys(topAnagrams).length;
console.log(
  `Filtered down to ${topAnagramsLength} sets and written to filtered-anagrams-2.json`
);

/**
 * Output JS Module
 */
console.log(`Outputting JS Module.`);

fs.writeFileSync(
  "./src/js/generated/anagrams.js",
  `export const anagrams = ${JSON.stringify(topAnagrams)}`,
  "utf8"
);

console.log(`Created anagrams.js module.`);
