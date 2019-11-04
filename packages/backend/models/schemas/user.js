const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
  followersCount: Number,
  friendsCount: Number,
  favouritesCount: Number,
  statusesCount: Number,
  profileBackgroundColor: String,
  profileBackgroundImageUrl: String,
  profileImageUrl: String,
  profileBannerUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model('User', UserSchema);

const User = mongoose.model('User');

module.exports = {
  model: User,
  queryOption: {
    raws: ['_id'],
    range: 'createdAt',
    searchWord: ['name', 'screenName', 'description'],
  },
  populates: [],
};
