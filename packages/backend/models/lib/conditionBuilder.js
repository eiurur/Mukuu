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
    const { orWords, andWords } = ConditionBuilder.parseSearchWord(
      trimedSearchWord,
    );
    const escapedWord = [...orWords, ...andWords]
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
  addSearchWord(keys = [], { orWords, andWords }) {
    this.addOrSearchWord(keys, orWords);
    this.addAndSearchWord(keys, andWords);
  }

  addOrSearchWord(keys = [], words = new Set()) {
    if (!keys || keys.length < 1) return;
    const condition = {};
    if (words.size > 0) {
      const orCondition = this.buildSearch(keys, [...words], {
        type: 'or',
      });
      condition.$or = orCondition;
    }
    if (condition.$or) {
      this.condition.push(condition);
    }
  }
  addAndSearchWord(keys = [], words = new Set()) {
    if (!keys || keys.length < 1) return;
    const condition = {};
    if (words.size > 0) {
      const andCondition = this.buildSearch(keys, [...words], {
        type: 'and',
      });
      condition.$and = andCondition;
    }
    if (condition.$and) {
      this.condition.push(condition);
    }
  }

  static parseSearchWord(searchWord = '') {
    const orWords = new Set();
    const andWords = new Set();
    const words = searchWord.split(/\s+/);
    if (words && Array.isArray(words)) {
      const escapedWords = words.map(escapeStringRegexp);
      let prev = '';
      while (escapedWords.length > 0) {
        const cur = escapedWords.shift();
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

  buildSearch(keys = [], words = [], { type }) {
    const escapedWords = words.map(escapeStringRegexp);
    if (type === 'and') {
      // ref:https://qiita.com/n4o847/items/dbcd0b8af3781d221424
      return keys
        .map((key) => {
          return escapedWords.map((word) => {
            const tmp = {};
            const reg = `(?=.*${word})`;
            tmp[key] = new RegExp(`${reg}`, 'i');
            return tmp;
          });
        })
        .flat();
    }
    if (type === 'or') {
      const reg = escapedWords.join('|');
      return keys.map((key) => {
        const tmp = {};
        tmp[key] = new RegExp(`${reg}`, 'i');
        return tmp;
      });
    }
    return [];
  }
};
