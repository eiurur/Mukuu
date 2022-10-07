const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

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
  text: { type: String, index: 1 },
  entities: String,
  favoriteCount: { type: Number, default: 0, index: -1 },
  retweetCount: { type: Number, default: 0, index: -1 },
  totalCount: { type: Number, default: 0, index: -1 },
  quotedStatuses: [ // 引用ツイート(サイト内)
    {
      type: ObjectId,
      ref: 'Post',
    },
  ],
  quoted: String, // 引用ツイート(raw_json),
  inReply: String,
  isReply: {
    type: Boolean,
    default: false,
  },
  selfRegister: {
    type: Boolean,
    default: false,
  }, // 手動登録か否か
  medias: [MediaScheme],
  postedBy: {
    type: ObjectId,
    ref: 'User',
    index: 1,
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
  text: 1,
  postedBy: 1,
});

// const explain = require('mongoose-explain');
// PostSchema.plugin(explain);

mongoose.model('Post', PostSchema);

const Post = mongoose.model('Post');

module.exports = {
  model: Post,
  queryOption: {
    raws: ['_id', 'postedBy', 'isReply'],
    range: 'createdAt',
    higher: "retweetCount",
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
    hint: { text: 1, postedBy: 1 },
  },
  populates: [
    // 1階層まで
    'postedBy',
    'quotedStatuses',
    // 2階層まで
    { path: 'quotedStatuses', populate: { path: 'postedBy' } },
    {
      path: 'quotedStatuses',
      populate: { path: 'quotedStatuses', populate: { path: 'postedBy' } },
    },
    // {
    //   recursive: 3,
    //   path: 'quotedStatuses',
    //   keys:  [
    //     'quotedStatuses',
    //     'postedBy'
    //   ]
    // },
  ],
};
