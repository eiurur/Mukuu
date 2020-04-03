const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const logger = require(path.join('..', 'logger'))();
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
  }

  // preprocess: [{ model: 'User', in: ['screenName'], use: '_id', key: 'postedBy' }],
  async preprocess(query = {}) {
    let conditions = [];
    if (!this.queryOption.preprocess) {
      return conditions;
    }
    if (query.searchWord === undefined || query.searchWord === '') {
      return conditions;
    }

    for (let process of this.queryOption.preprocess) {
      console.log(process, query);
      if (process.model) {
        const builder = new ConditionBuilder();
        builder.addSearchWord(process.in, query.searchWord);
        console.log(builder.condition);
        const q =
          builder.condition.length === 0 ? {} : { $and: builder.condition };

        const { model } = SchemeFactory.create(process.model);
        const params = Object.assign({
          model: model,
          query: q,
          // populates: this.populates,
        });
        const finder = new Finder(params);
        const list = await finder.find();
        const tmp = {};
        tmp[process.key] = { $in: list.map(item => item[process.use]) };
        conditions.push(tmp);
      }
    }
    return conditions;
  }

  aggregate(query = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} aggregate`);
    logger.info('query  : ', JSON.stringify(query));
    return this.model.aggregate(query).exec();
  }

  async count(query = {}, searchOption = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} count`);
    logger.info('query  : ', JSON.stringify(query));
    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, query.searchWord);

    const extendConditions = await this.preprocess(query);
    const conditions = builder.condition.map(condition => {
      if (condition.$or) condition.$or = condition.$or.concat(extendConditions);
      return condition;
    });
    const q = conditions.length === 0 ? {} : { $and: conditions };
    logger.info(JSON.stringify(q));

    const params = Object.assign(
      {
        model: this.model,
        query: q,
        populates: this.populates,
      },
      searchOption,
    );
    const finder = new Finder(params);
    return finder.count();
  }

  async find(query = {}, searchOption = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} find`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('searchOption: ', searchOption);

    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, query.searchWord);
    const extendConditions = await this.preprocess(query);
    const conditions = builder.condition.map(condition => {
      if (condition.$or) condition.$or = condition.$or.concat(extendConditions);
      return condition;
    });
    const q = conditions.length === 0 ? {} : { $and: conditions };
    logger.info(JSON.stringify(q));

    const params = Object.assign(
      {
        model: this.model,
        query: q,
        populates: this.populates,
      },
      searchOption,
    );
    const finder = new Finder(params);
    return finder.find();
  }

  findOne(query = {}, fields = {}, options = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} find`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('fields : ', fields);
    logger.info('options: ', options);
    return this.model.findOne(query, fields, options);
  }

  findByIdAndUpdate(_id, data, options) {
    logger.info(`DBBaseProvider ${this.model.modelName} findByIdAndUpdate`);
    logger.info('_id    : ', _id);
    logger.info('data   : ', data);
    logger.info('options: ', options);
    console.time(`${this.model.modelName} findByIdAndUpdate`);
    return this.model.findByIdAndUpdate(_id, data, options);
  }

  findOneAndUpdate(query, data, options) {
    logger.info(`DBBaseProvider ${this.model.modelName} findOneAndUpdate`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('data   : ', data);
    logger.info('options: ', options);
    return this.model.findOneAndUpdate(query, data, options);
  }

  update(query, data, options) {
    logger.info(`DBBaseProvider ${this.model.modelName} update`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('data   : ', data);
    logger.info('options: ', options);
    return this.model.update(query, data, options);
  }

  remove(query, data, options) {
    logger.info(`DBBaseProvider ${this.model.modelName} remove`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('data   : ', data);
    logger.info('options: ', options);
    return this.model.remove(query);
  }
};
