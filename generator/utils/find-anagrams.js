module.exports = (dictionary) => {
  let words = Object.keys(dictionary).filter((word) => word.length > 2);

  const anagrams = {};

  words.forEach((word) => {
    const sorted = word.split("").sort().join("");

    if (anagrams[sorted] && typeof anagrams[sorted] === "object") {
      anagrams[sorted].push(word);
    } else {
      anagrams[sorted] = [word];
    }
  });

  return anagrams;
};
