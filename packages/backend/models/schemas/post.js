const path = require('path');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// #
// Schemaインタフェースを通してモデルの定義を行う
// #
const MediaScheme = new Schema({
  idStr: String,
  url: String,
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
});
const PostSchema = new Schema({
  idStr: {
    type: String,
    unique: true,
    index: true,
  },
  text: String,
  entities: String,
  favoriteCount: { type: Number, default: 0 },
  retweetCount: { type: Number, default: 0 },
  medias: [MediaScheme],
  postedBy: {
    type: ObjectId,
    ref: 'User',
    index: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

PostSchema.index(
  {
    idStr: 1,
    postedBy: 1,
  },
  { unique: true },
);

mongoose.model('Post', PostSchema);

const Post = mongoose.model('Post');

module.exports = {
  model: Post,
  queryOption: {
    raws: ['_id', 'postedBy'],
    range: 'createdAt',
    searchWord: ['name', 'screenName', 'text'],
  },
  populates: ['postedBy'],
};
