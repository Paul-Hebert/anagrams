const fs = require("fs");

const minLength = 3;
const maxLength = 20;

let words = JSON.parse(fs.readFileSync("./generator/10000-words.json", "utf8"));

words = words.filter(
  (word) => word.length <= maxLength && word.length >= minLength
);

const anagrams = [];

words.forEach((word) => {
  if (typeof word !== "string") return;
  const sorted = word.split("").sort().join("");

  // console.log(anagrams[sorted])

  if (anagrams[sorted] && typeof anagrams[sorted] === "object") {
    anagrams[sorted].push(word);
  } else {
    anagrams[sorted] = [word];
  }
});

console.log(Object.keys(anagrams).length);

const topAnagrams = Object.keys(anagrams)
  .filter((key) => anagrams[key].length > 1)
  .reduce((cur, key) => {
    return Object.assign(cur, { [key]: anagrams[key] });
  }, {});

console.log(Object.keys(topAnagrams).length);

fs.writeFileSync(
  "./src/js/generated/anagrams.js",
  `export const anagrams = ${JSON.stringify(topAnagrams, null, 2)}`,
  "utf8"
);
