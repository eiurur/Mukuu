const { DenyPost, DenyUser, SearchHistory, User, Post } = require('./schemas');

module.exports = class SchemaFactory {
  static create(name) {
    switch (name.toLowerCase()) {
      case 'denypost':
        return DenyPost;
      case 'denyuser':
        return DenyUser;
      case 'searchhistory':
        return SearchHistory;
      case 'user':
        return User;
      case 'post':
        return Post;
      default:
        return null;
    }
  }
};
