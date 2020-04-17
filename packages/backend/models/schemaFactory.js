const { History, SearchHistory, User, Post } = require('./schemas');

module.exports = class SchemaFactory {
  static create(name) {
    switch (name.toLowerCase()) {
      case 'history':
        return History;
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
