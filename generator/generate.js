const fs = require("fs");

const minLength = 3;
const maxLength = 12;

const dictionary = JSON.parse(
  fs.readFileSync("./generator/dictionary.json", "utf8")
);

let words = Object.keys(dictionary).filter(
  (word) => word.length <= maxLength && word.length >= minLength
);

const anagrams = [];

words.forEach((word) => {
  const sorted = word.split("").sort().join("");

  if (anagrams[sorted]) {
    anagrams[sorted].push(word);
  } else {
    anagrams[sorted] = [word];
  }
});

console.log(Object.keys(anagrams).length);

const topAnagrams = Object.keys(anagrams)
  .filter((key) => anagrams[key].length > 2)
  .reduce((cur, key) => {
    return Object.assign(cur, { [key]: anagrams[key] });
  }, {});

console.log(Object.keys(topAnagrams).length);

fs.writeFileSync(
  "./src/js/generated/anagrams.json",
  JSON.stringify(topAnagrams, null, 2),
  "utf8"
);
