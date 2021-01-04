const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const DenyUserSchema = new Schema({
  idStr: {
    type: String,
    unique: true,
    index: true,
  },
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

mongoose.model('DenyUser', DenyUserSchema);

const DenyUser = mongoose.model('DenyUser');

module.exports = {
  model: DenyUser,
  queryOption: {
    raws: ['_id'],
    searchWord: ['idStr'],
  },
};
