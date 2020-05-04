const dayjs = require('dayjs');
const escapeStringRegexp = require('escape-string-regexp');

module.exports = class ConditionBuilder {
  constructor() {
    this.condition = [];
    return this;
  }

  transformCondition(value) {
    if (Array.isArray(value)) return { $in: value };
    return value;
  }

  buildCondition(keys, column) {
    this.condition = [];
    if (!column) return;
    Object.keys(column).forEach((key) => {
      if (keys.includes(key)) {
        const tmp = {};
        tmp[key] = this.transformCondition(column[key]);
        this.condition.push(tmp);
      }
    });
  }

  addRangeCondition(key, from, to) {
    if (!key || (!from && !to)) return;
    const condition = {};
    const range = {};
    condition[key] = range;
    if (from) range.$gte = dayjs(from).startOf('day');
    if (to) range.$lte = dayjs(to).endOf('day');
    this.condition.push(condition);
  }

  addDuring(key, date, term = 'day') {
    if (!key || !date) return;
    const condition = {};
    const range = {};
    condition[key] = range;
    if (date) range.$gte = dayjs(date).startOf(term);
    if (date) range.$lte = dayjs(date).endOf(term);
    this.condition.push(condition);
  }

  // preprocess用(screenName)
  addIncludeWord(keys = [], searchWord = '') {
    const trimedSearchWord = searchWord.trim();
    if (!keys || keys.length < 1 || trimedSearchWord === '') return;
    // const { orWords, andWords } = this.parseSearchWord(trimedSearchWord);
    // const escapedWord = [...orWords, ...andWords]
    //   .map(escapeStringRegexp)
    //   .join('|');
    const escapedWord = trimedSearchWord
      .split(/\s+/)
      .map(escapeStringRegexp)
      .join('|');
    const condition = {};
    condition.$or = keys.map((key) => {
      const tmp = {};
      tmp[key] = new RegExp(`(${escapedWord})`, 'i');
      return tmp;
    });
    this.condition.push(condition);
  }
  addSearchWord(keys = [], searchWord = '') {
    const trimedSearchWord = searchWord.trim();
    if (!keys || keys.length < 1 || trimedSearchWord === '') return;
    const orWords = trimedSearchWord.split(/\s+/).map(escapeStringRegexp);
    const condition = {};
    if (orWords.length > 0) {
      const orCondition = [...orWords].map((word) => {
        return this.buildSearchCondition(keys, word);
      });
      condition.$or = orCondition.flat();
    }
    // const { orWords } = this.parseSearchWord(trimedSearchWord);
    // const condition = {};
    // if (orWords.size > 0) {
    //   const orCondition = [...orWords].map((word) => {
    //     return this.buildSearchCondition(keys, word);
    //   });
    //   condition.$or = orCondition.flat();
    // }
    // if (andWords.size > 0) {
    //   const andCondition = [...andWords].map((word) => {
    //     return this.buildSearchCondition(keys, word);
    //   });
    //   condition.$and = andCondition.flat();
    // }
    this.condition.push(condition);
  }

  parseSearchWord(searchWord) {
    const orWords = new Set();
    const andWords = new Set();
    const words = searchWord.split(/\s+/);
    if (words && Array.isArray(words)) {
      let prev = '';
      while (words.length > 0) {
        const cur = words.shift();
        if (prev.toLocaleLowerCase() === 'or') {
          if (cur !== '') {
            orWords.add(cur);
          }
        } else if (cur.toLocaleLowerCase() === 'or') {
          if (prev !== '') {
            andWords.delete(prev);
            orWords.add(prev);
          }
        } else {
          if (cur !== '') {
            andWords.add(cur);
          }
        }
        prev = cur;
      }
    }
    return {
      orWords,
      andWords,
    };
  }

  buildSearchCondition(keys = [], word = '') {
    const escapedWord = escapeStringRegexp(word);
    return keys.map((key) => {
      const tmp = {};
      tmp[key] = new RegExp(escapedWord, 'i');
      return tmp;
    });
  }
};
