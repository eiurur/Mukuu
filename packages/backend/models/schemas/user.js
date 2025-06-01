const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  idStr: {
    type: String,
    unique: true,
    index: true,
  },
  name: String,
  screenName: String,
  url: String,
  description: String,
  protected: Boolean,
  followersCount: {
    type: Number,
    index: -1,
  },
  postCount: {
    type: Number,
    index: -1,
  },
  friendsCount: Number,
  favouritesCount: Number,
  statusesCount: Number,
  profileBackgroundColor: String,
  profileBackgroundImageUrl: String,
  profileImageUrl: String,
  profileBannerUrl: String,
  profileImageUrlBase64: String,
  profileBannerUrlBase64: String,
  not_exist: {
    type: Boolean,
    defalt: false,
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

UserSchema.index({
  name: 1,
  screenName: 1,
  description: 1,
});

mongoose.model('User', UserSchema);

const User = mongoose.model('User');

module.exports = {
  model: User,
  queryOption: {
    raws: ['_id'],
    range: 'createdAt',
    searchWord: ['name', 'screenName', 'description'],
    hint: { name: 1, screenName: 1, description: 1 },
  },
  populates: [],
};
