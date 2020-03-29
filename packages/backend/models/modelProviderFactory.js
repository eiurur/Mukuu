const ModelProvider = require('./modelProvider');
const { History, User, Post } = require('./schemas');

module.exports = class ModelProviderFactory {
  static create(name) {
    switch (name.toLowerCase()) {
      case 'history':
        return new ModelProvider(History);
      case 'user':
        return new ModelProvider(User);
      case 'post':
        return new ModelProvider(Post);
      default:
        return null;
    }
  }
};
