const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const AddSchema = new Schema({
  key: {
    type: String,
    unique: true,
    index: true,
  },
  works: {
    type: String,
  },
});

mongoose.model('Add', AddSchema);

const Add = mongoose.model('Add');

module.exports = {
  model: Add,
  queryOption: {
    raws: ['_id'],
    searchWord: ['key'],
  },
};
