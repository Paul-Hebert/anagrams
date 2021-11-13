module.exports = (dictionary) => {
  let words = Object.keys(dictionary).filter((word) => word.length > 2);

  const anagrams = {};

  words.forEach((word) => {
    const sorted = word.split("").sort().join("");

    const meaningsData = dictionary[word].meanings;

    if (meaningsData) {
      const meanings = meaningsData.map((meaning) => {
        return {
          definition: meaning.def,
          speechPart: meaning.speech_part,
          synonyms: meaning.synonyms,
        };
      });

      const wordData = {
        name: word,
        meanings,
      };

      if (anagrams[sorted] && typeof anagrams[sorted] === "object") {
        anagrams[sorted].push(wordData);
      } else {
        anagrams[sorted] = [wordData];
      }
    }
  });

  return anagrams;
};
