const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { ConditionBuilder, Finder } = require('./lib');
const SchemeFactory = require('./schemaFactory');

const uri = process.env.DB_URI;
const db = mongoose.connect(
  uri,
  async(err)=>{
      if(err) throw err;
      console.log("conncted to db")
  }
)

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
  async preprocess(query = {}) {
    let conditions = [];
    if (!this.queryOption.preprocess) {
      return conditions;
    }
    if (query.searchWord === undefined || query.searchWord === '') {
      return conditions;
    }

    for (let process of this.queryOption.preprocess) {
      if (process.model) {
        const builder = new ConditionBuilder();
        builder.addSearchWord(process.columns, query.searchWord);
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
        tmp[process.key] = {
          $in: list.map((item) => item[process.identifier]),
        };
        conditions.push(tmp);
      }
    }
    return conditions;
  }

  aggregate(query = []) {
    this.logger.debug(`DB ${this.model.modelName} aggregate`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    return this.model.aggregate(query).exec();
  }

  async count(query = {}, searchOption = {}) {
    this.logger.debug(`DB ${this.model.modelName} count`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query.column);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, query.searchWord);

    const extendConditions = await this.preprocess(query);
    const conditions = builder.condition.map((condition) => {
      if (condition.$or) condition.$or = condition.$or.concat(extendConditions);
      return condition;
    });
    const q = conditions.length === 0 ? {} : { $and: conditions };
    // this.logger.debug(JSON.stringify(q));

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
    this.logger.debug(`DB ${this.model.modelName} find`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    // this.logger.debug('searchOption: ', searchOption);

    const builder = new ConditionBuilder();
    builder.buildCondition(this.queryOption.raws, query.column);
    builder.addRangeCondition(this.queryOption.range, query.from, query.to);
    builder.addSearchWord(this.queryOption.searchWord, query.searchWord);
    const extendConditions = await this.preprocess(query);
    const conditions = builder.condition.map((condition) => {
      if (condition.$or) condition.$or = condition.$or.concat(extendConditions);
      return condition;
    });
    const q = conditions.length === 0 ? {} : { $and: conditions };
    // this.logger.debug(JSON.stringify(q));

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
    this.logger.debug(`DB ${this.model.modelName} find`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    // this.logger.debug('fields : ', fields);
    // this.logger.debug('options: ', options);
    return this.model.findOne(query, fields, options);
  }

  findByIdAndUpdate(_id, data, options) {
    this.logger.debug(`DB ${this.model.modelName} findByIdAndUpdate`);
    // this.logger.debug('_id    : ', _id);
    // this.logger.debug('data   : ', data);
    // this.logger.debug('options: ', options);
    console.time(`${this.model.modelName} findByIdAndUpdate`);
    return this.model.findByIdAndUpdate(_id, data, options);
  }

  findOneAndUpdate(query, data, options) {
    this.logger.debug(`DB ${this.model.modelName} findOneAndUpdate`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    // this.logger.debug('data   : ', data);
    // this.logger.debug('options: ', options);
    return this.model.findOneAndUpdate(query, data, options);
  }

  update(query, data, options) {
    this.logger.debug(`DB ${this.model.modelName} update`);
    // this.logger.debug('query  : ', JSON.stringify(query));
    // this.logger.debug('data   : ', data);
    // this.logger.debug('options: ', options);
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
