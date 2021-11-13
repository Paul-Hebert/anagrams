import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

export const pickAnagram = (maxLength = 5) => {
  const possibleAnagrams = anagramKeys.filter((key) => key.length <= maxLength);

  const anagramKey = randomItemFromArray(possibleAnagrams);
  const possibleWords = anagrams[anagramKey];

  const anagramKeyLetters = anagramKey.split("");
  let jumble = shuffle(anagramKeyLetters).join("");

  // TODO: Sometimes this doesn't work...
  // while (possibleWords.includes(jumble)) {
  // console.log("jumble matched word");
  // jumble = shuffle(anagramKeyLetters).join("");
  // }

  return {
    jumble,
    possibleWords,
  };
};
