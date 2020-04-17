const path = require('path');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const HistorySchema = new Schema({
  text: String,
  count: { type: Number, default: 0, index: -1 },
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

HistorySchema.index({ text: 1 }, { unique: true });

mongoose.model('History', HistorySchema);

const History = mongoose.model('History');

module.exports = {
  model: History,
  queryOption: {
    range: 'createdAt',
  },
  logLevel: 'info',
};
