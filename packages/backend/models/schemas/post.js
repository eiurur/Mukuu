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
  text: { type: String, index: true },
  entities: String,
  favoriteCount: { type: Number, default: 0, index: -1 },
  retweetCount: { type: Number, default: 0, index: -1 },
  totalCount: { type: Number, default: 0, index: -1 },
  selfRegister: {
    type: Boolean,
    default: false,
  }, // 手動登録か否か
  medias: [MediaScheme],
  postedBy: {
    type: ObjectId,
    ref: 'User',
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

PostSchema.index(
  {
    idStr: 1,
    postedBy: 1,
  },
  { unique: true },
);

PostSchema.index({
  text: true,
  postedBy: 1,
});

// PostSchema.index({
//   text: true,
//   createdAt: -1,
// });
// PostSchema.index({
//   text: true,
//   favoriteCount: -1,
// });
// PostSchema.index({
//   text: true,
//   retweetCount: -1,
// });
// PostSchema.index({
//   text: true,
//   totalCount: -1,
// });
// PostSchema.index({
//   text: true,
//   postedBy: 1,
//   createdAt: -1,
// });
// PostSchema.index({
//   text: true,
//   postedBy: 1,
//   favoriteCount: -1,
// });
// PostSchema.index({
//   text: true,
//   postedBy: 1,
//   retweetCount: -1,
// });
// PostSchema.index({
//   text: true,
//   postedBy: 1,
//   totalCount: -1,
// });

// const explain = require('mongoose-explain');
// mongoose.set('debug', true);
// PostSchema.plugin(explain);

mongoose.model('Post', PostSchema);

const Post = mongoose.model('Post');

module.exports = {
  model: Post,
  queryOption: {
    raws: ['_id', 'postedBy'],
    range: 'createdAt',
    preprocess: [
      {
        model: 'User',
        pattern: {
          reg: /(@([0-9a-zA-Z_]+))/g,
          useIndex: 2,
          removeIndex: 1,
        },
        columns: ['screenName'],
        identifier: '_id',
        key: 'postedBy',
      },
    ],
    searchWord: ['text'],
    hint: { text: 1 },
  },
  populates: ['postedBy'],
};
