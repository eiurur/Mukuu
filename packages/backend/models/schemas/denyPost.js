const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const DenyPostSchema = new Schema({
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

mongoose.model('DenyPost', DenyPostSchema);

const DenyPost = mongoose.model('DenyPost');

module.exports = {
  model: DenyPost,
  queryOption: {
    raws: ['_id'],
    searchWord: ['idStr'],
  },
};
