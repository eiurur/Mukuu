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
    Object.keys(column).forEach(key => {
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
    const escapedWord = escapeStringRegexp(searchWord);
    const condition = {};
    condition.$or = keys.map(key => {
      const tmp = {};
      tmp[key] = new RegExp(escapedWord, 'i');
      return tmp;
    });
    this.condition.push(condition);
  }
};
