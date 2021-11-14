import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const keys = Object.keys(anagrams);

export const pickAnagram = (maxLength = 5, wordsUsed) => {
  const possibleAnagrams = keys.filter(
    (key) => key.length <= maxLength && !wordsUsed.includes(key)
  );

  const key = randomItemFromArray(possibleAnagrams);
  const possibleWords = anagrams[key];
  const possibleWordNames = possibleWords.map((word) => word.name);

  const keyLetters = key.split("");
  let jumble = shuffle(keyLetters).join("");

  // TODO: Confirm this works right
  while (possibleWordNames.includes(jumble)) {
    jumble = shuffle(keyLetters).join("");
  }

  return {
    key,
    jumble,
    possibleWords,
  };
};
