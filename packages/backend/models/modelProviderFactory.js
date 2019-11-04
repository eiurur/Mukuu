const ModelProvider = require('./modelProvider');
const { User, Post } = require('./schemas');

module.exports = class ModelProviderFactory {
  static create(name) {
    switch (name.toLowerCase()) {
      case 'user':
        return new ModelProvider(User);
      case 'post':
        return new ModelProvider(Post);
      default:
        return null;
    }
  }
};
