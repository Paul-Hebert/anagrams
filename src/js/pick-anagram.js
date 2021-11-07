import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

export const pickAnagram = () => {
  let jumble = randomItemFromArray(anagramKeys);
  let possibleWords = anagrams[jumble];
  console.log(jumble, possibleWords);

  const jumbleArray = jumble.split("");

  jumble = shuffle(jumbleArray).join("");

  while (possibleWords.includes(jumble)) {
    jumble = shuffle(jumbleArray).join("");
  }

  return {
    jumble,
    possibleWords,
  };
};
