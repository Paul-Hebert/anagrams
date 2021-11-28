const fs = require("fs");

module.exports = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let mergedLetters = {};

  alphabet.split("").forEach((letter) => {
    const data = fs.readFileSync(`./generator/data/${letter}.json`, "utf8");

    mergedLetters = { ...mergedLetters, ...JSON.parse(data) };
  });

  return mergedLetters;
};
