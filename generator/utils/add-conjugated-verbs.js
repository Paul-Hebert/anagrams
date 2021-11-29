const fs = require("fs");

module.exports = (dictionary) => {
  const verbs = JSON.parse(
    fs.readFileSync(`./generator/data/conjugated-verbs.json`, "utf8")
  );

  verbs.forEach((verb) => {
    const verbName = verb["verb"];
    let dictionaryEntry = dictionary[verbName];

    if (dictionaryEntry) {
      dictionaryEntry.isConjugation = true;
      let verbConjugations = [];
      let verbKeys = Object.keys(verb);

      verbKeys.forEach((key) => {
        if (key !== "verb" && Array.isArray(verb[key])) {
          verbConjugations = [...verbConjugations, ...verb[key]];
        }
      });

      verbConjugations = removeDuplicates(verbConjugations);

      const addedConjugations = [];

      verbConjugations.forEach((conjugation) => {
        if (!addedConjugations.includes(conjugation)) {
          addedConjugations.push(conjugation);
          dictionary[conjugation] = dictionaryEntry;
        }
      });
    }
  });

  return dictionary;
};

const removeDuplicates = (array) => {
  return [...new Set(array)];
};
