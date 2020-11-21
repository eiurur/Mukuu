const { DenyPost, SearchHistory, User, Post } = require('./schemas');

module.exports = class SchemaFactory {
  static create(name) {
    switch (name.toLowerCase()) {
      case 'denypost':
        return DenyPost;
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
