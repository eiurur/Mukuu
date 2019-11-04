const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { logger } = require(path.join('..', 'logger'));
const { ConditionBuilder, Finder } = require('./lib');

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

  aggregate(query = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} aggregate`);
    logger.info('query  : ', JSON.stringify(query));
    return this.model.aggregate(query).exec();
  }

  count(query = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} count`);
    logger.info('query  : ', JSON.stringify(query));
    return this.model.count(query).exec();
  }

  find(query = {}, searchOption = {}) {
    logger.info(`DBBaseProvider ${this.model.modelName} find`);
    logger.info('query  : ', JSON.stringify(query));
    logger.info('searchOption: ', searchOption);

    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, query.searchWord);

    const params = Object.assign(
      {
        model: this.model,
        query:
          builder.condition.length === 0 ? {} : { $and: builder.condition },
        populates: this.populates,
      },
      searchOption,
    );
    console.log(JSON.stringify(builder.condition));
    const finder = new Finder(params);
    return finder.find();
    // return this.model.find(query, fields, options);
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
