# Jumbled

_noun_, a spelling game where you need to find all the anagrams before running out of moves.

## Current Status

This game is a work-in-progress.

### Remaining Tasks

- Add acknowledgements for open source data
- Keyboard support for drag+drop
  - https://www.smashingmagazine.com/2018/01/dragon-drop-accessible-list-reordering/
  - https://medium.com/salesforce-ux/4-major-patterns-for-accessible-drag-and-drop-1d43f64ebf09
- Screen reader aria live announcements
- Improved hints system (don't reuse hints, show multiple hints at once)
- Improved success/failure effects
- Improved game rules and game play
- Performance improvements (lazy load jumbles)
- PWA features (and getting in the app stores)
- Branding
  - New Name
  - Logo/icons
  - Real Domain
- Consistent CSS organization
- Home Screen
- Improve UI grammar (singular/plural, including "and" in lists of words)
- Remove slurs and other offensive words from word set

### Bugs

- Starting jumble is sometimes a match
- Grid layout isn't working well. Switch to flex and ditch vh calculator

### Data sources:

- [Wordset Dictionary](https://github.com/wordset/wordset-dictionary/tree/master/data)
- [4000 most common words](http://www.rupert.id.au/resources/4000-most-common-english-words-csv.csv)
- [Plural Nouns](https://github.com/djstrong/nouns-with-plurals/blob/master/noun.csv)
- [Conjugated Verbs](https://github.com/Drulac/English-Verbs-Conjugates/blob/master/verbs-conjugations.json)
