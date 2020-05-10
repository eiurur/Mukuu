const path = require('path');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const SearchHistorySchema = new Schema({
  word: { type: String, index: true },
  postCount: { type: Number, default: 0 },
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

// SearchHistorySchema.index({ createdAt: -1 });

mongoose.model('SearchHistory', SearchHistorySchema);

const SearchHistory = mongoose.model('SearchHistory');

module.exports = {
  model: SearchHistory,
  queryOption: {
    range: 'createdAt',
  },
  logLevel: 'info',
};
