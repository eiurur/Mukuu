const path = require('path');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const SearchHistoryCacheSchema = new Schema({
  cacheKey: { type: String, index: true },
  histories: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
    index: -1,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    index: -1,
  },
});

mongoose.model('SearchHistoryCache', SearchHistoryCacheSchema);

const SearchHistoryCache = mongoose.model('SearchHistoryCache');

module.exports = {
  model: SearchHistoryCache,
  queryOption: {
    range: 'createdAt',
  },
  logLevel: 'info',
};
