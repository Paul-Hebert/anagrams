import { randomItemFromArray, shuffle } from "./utils.js";
import { anagrams } from "./generated/anagrams.js";
const anagramKeys = Object.keys(anagrams);

export const pickAnagram = (maxLength = 5) => {
  const possibleAnagrams = anagramKeys.filter((key) => key.length <= maxLength);
  let jumble = randomItemFromArray(possibleAnagrams);
  let possibleWords = anagrams[jumble];
  console.log(jumble, possibleWords);

  const jumbleArray = jumble.split("");

  jumble = shuffle(jumbleArray).join("");

  // TODO: Sometimes this doesn't work...
  while (possibleWords.includes(jumble)) {
    console.log("jumble matched word");
    jumble = shuffle(jumbleArray).join("");
  }

  return {
    jumble,
    possibleWords,
  };
};
