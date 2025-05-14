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

  // TODO: マルチ対応
  addHigher(key, higher) {
    if (!key || !higher) return;
    const condition = {};
    const range = {};
    condition[key] = range;
    if (higher) range.$gte = higher;
    this.condition.push(condition);
  }

  addRangeCondition(key, from, to) {
    if (!key || (!from && !to)) return;
    const condition = {};
    const range = {};
    condition[key] = range;
    if (from) range.$gte = dayjs(from).startOf('day').toISOString();
    if (to) range.$lte = dayjs(to).endOf('day').toISOString();
    this.condition.push(condition);
  }

  addDuring(key, date, term = 'day') {
    if (!key || !date) return;
    const condition = {};
    const range = {};
    condition[key] = range;
    if (date) range.$gte = dayjs(date).startOf(term).toISOString();
    if (date) range.$lte = dayjs(date).endOf(term).toISOString();
    this.condition.push(condition);
  }

  addSearchWord(keys = [], searchWord = '') {
    if (!keys || keys.length < 1 || searchWord === '') return;

    const SPACE_PATTERN = /[\s\u3000]+/;
    const words = searchWord.split(SPACE_PATTERN).filter(word => word !== '');
    const escapedWords = words.map(escapeStringRegexp);

    if (escapedWords.length > 1) {
      const andConditions = [];
      escapedWords.forEach(word => {
        const regexConditions = keys.map(key => ({ [key]: new RegExp(word, 'i') }));
        andConditions.push({ $or: regexConditions });
      });
      this.condition.push({ $and: andConditions });
    } else if (escapedWords.length === 1) {
      const orConditions = keys.map(key => ({ [key]: new RegExp(escapedWords[0], 'i') }));
      this.condition.push({ $or: orConditions });
    }
  }
};
