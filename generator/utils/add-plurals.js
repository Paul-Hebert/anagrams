const {parse} = require('csv-parse/sync');
const fs = require("fs");

module.exports = (dictionary) => {
  const pluralsRaw = fs.readFileSync(`./generator/data/plural-nouns.csv`, "utf8");
  const plurals = parse(pluralsRaw);
  // console.log(plurals);

  const keys = Object.keys(dictionary);
  const addedPlurals = [];

  plurals.forEach(word => {
    const singular = word[0];
    const plural = word[1];
    if(
        keys.includes(singular) 
        && !keys.includes(plural) 
        && !addedPlurals.includes(plural)
    ) {
      addedPlurals.push(plural);

      let dictionaryEntry = dictionary[singular];
      dictionaryEntry.isPlural = true;

      dictionary[plural] = dictionaryEntry;
    }
  })

  return dictionary;
}