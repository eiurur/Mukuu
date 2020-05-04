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

  addSearchWord(keys = [], searchWord = '') {
    if (!keys || keys.length < 1 || searchWord === '') return;

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

    if (orWords.size) {
      const orCondition = [...orWords].map((word) => {
        searchWord = searchWord.replace(word, '');
        return this.buildSearchCondition(keys, word);
      });
      this.condition.push({ $or: orCondition });
    }
    if (andWords.size) {
      const andCondition = [...andWords].map((word) => {
        searchWord = searchWord.replace(word, '');
        return this.buildSearchCondition(keys, word);
      });
      this.condition.push({ $and: andCondition });
    }
    // console.log(JSON.stringify([...orWords]));
    // console.log(JSON.stringify([...andWords]));
  }

  buildSearchCondition(keys = [], word = '') {
    const escapedWord = escapeStringRegexp(word);
    const condition = {};
    condition.$or = keys.map((key) => {
      const tmp = {};
      tmp[key] = new RegExp(escapedWord, 'i');
      return tmp;
    });
    return condition;
  }
};
