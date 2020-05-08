const path = require('path');
const util = require('util');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { ConditionBuilder, Finder } = require('./lib');
const SchemeFactory = require('./schemaFactory');

const uri = process.env.MONGODB_URI;
const db = mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

module.exports = class ModelProvider {
  constructor(Schema) {
    this.model = Schema.model;
    this.populates = Schema.populates;
    this.queryOption = Schema.queryOption;
    this.logger = require(path.join('..', 'logger'))();
    this.logger.level = Schema.logLevel || 'debug';
  }

  get schema() {
    return this.model;
  }

  // preprocess: [{ model: 'User', in: ['screenName'], use: '_id', key: 'postedBy' }],
  async preprocess({ orWords, andWords }) {
    let conditions = [];
    if (!this.queryOption.preprocess) {
      return conditions;
    }
    const o = await this.buildPreProcessCondition(orWords, {
      operation: '$or',
    });
    const a = await this.buildPreProcessCondition(andWords, {
      operation: '$and',
    });
    if (o) conditions.push(o);
    if (a) conditions.push(a);
    return conditions;
  }
  async buildPreProcessCondition(words, { operation }) {
    let conditions = [];
    if (!this.queryOption.preprocess) {
      return null;
    }
    if (words.size === 0) {
      return null;
    }
    for (let process of this.queryOption.preprocess) {
      if (!process.model) continue;
      const { pattern, columns, key, identifier } = process;

      const pWords = new Set();
      if (words.size > 0) {
        [...words].map((word) => {
          const matches = [...word.matchAll(pattern.reg)];
          for (let match of matches) {
            const word = match[pattern.useIndex];
            pWords.add(word);
            const removeWord = match[pattern.removeIndex];
            words.delete(removeWord);
          }
        });
      }
      const builder = new ConditionBuilder();
      builder.addAndSearchWord(columns, pWords);
      if (builder.condition.length === 0) continue;
      const q = { $and: builder.condition };

      const { model } = SchemeFactory.create(process.model);
      const params = Object.assign({
        model: model,
        query: q,
      });
      const finder = new Finder(params);
      const list = await finder.find();
      const tmp = {};
      tmp[key] = {
        $in: list.map((item) => item[identifier]),
      };
      conditions.push(tmp);
      console.log(conditions);
    }
    if (!conditions.length) {
      return null;
    }
    const condition = {};
    condition[operation] = conditions;
    return condition;
  }
  async buildFinder(query = {}, searchOption = {}) {
    const { orWords, andWords } = ConditionBuilder.parseSearchWord(
      query.searchWord,
    );
    const extendConditions = await this.preprocess({ orWords, andWords });
    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query.column);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, { orWords, andWords });
    const conditions = builder.condition;
    const q =
      conditions.length === 0 && extendConditions.length === 0
        ? {}
        : { $and: [...conditions, ...extendConditions] };
    this.logger.debug(JSON.stringify(q));
    console.log('q: ', util.inspect(q, false, null));

    const params = Object.assign(
      {
        model: this.model,
        query: q,
        populates: this.populates,
      },
      searchOption,
    );
    const finder = new Finder(params);
    return finder;
  }

  aggregate(query = []) {
    this.logger.debug(`DB ${this.model.modelName} aggregate`);
    this.logger.debug('query  : ', JSON.stringify(query));
    return this.model.aggregate(query).exec();
  }

  async count(query = {}, searchOption = {}) {
    this.logger.debug(`DB ${this.model.modelName} count`);
    this.logger.debug('query  : ', JSON.stringify(query));
    const finder = await this.buildFinder(query, searchOption);
    return finder.count();
  }

  async find(query = {}, searchOption = {}) {
    this.logger.debug(`DB ${this.model.modelName} find`);
    this.logger.debug('query  : ', JSON.stringify(query));
    this.logger.debug('searchOption: ', searchOption);
    const finder = await this.buildFinder(query, searchOption);
    return finder.find();
  }

  findOne(query = {}, fields = {}, options = {}) {
    this.logger.debug(`DB ${this.model.modelName} find`);
    this.logger.debug('query  : ', JSON.stringify(query));
    this.logger.debug('fields : ', fields);
    this.logger.debug('options: ', options);
    return this.model.findOne(query, fields, options);
  }

  findByIdAndUpdate(_id, data, options) {
    this.logger.debug(`DB ${this.model.modelName} findByIdAndUpdate`);
    this.logger.debug('_id    : ', _id);
    this.logger.debug('data   : ', data);
    this.logger.debug('options: ', options);
    console.time(`${this.model.modelName} findByIdAndUpdate`);
    return this.model.findByIdAndUpdate(_id, data, options);
  }

  findOneAndUpdate(query, data, options) {
    this.logger.debug(`DB ${this.model.modelName} findOneAndUpdate`);
    this.logger.debug('query  : ', JSON.stringify(query));
    this.logger.debug('data   : ', data);
    this.logger.debug('options: ', options);
    return this.model.findOneAndUpdate(query, data, options);
  }

  update(query, data, options) {
    this.logger.debug(`DB ${this.model.modelName} update`);
    this.logger.debug('query  : ', JSON.stringify(query));
    this.logger.debug('data   : ', data);
    this.logger.debug('options: ', options);
    return this.model.update(query, data, options);
  }

  remove(query, data, options) {
    this.logger.debug(`DB ${this.model.modelName} remove`);
    this.logger.debug('query  : ', JSON.stringify(query));
    this.logger.debug('data   : ', data);
    this.logger.debug('options: ', options);
    return this.model.remove(query);
  }
};
