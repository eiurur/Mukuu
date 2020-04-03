const ModelProvider = require('./modelProvider');
const SchemeFactory = require('./schemaFactory');

module.exports = class ModelProviderFactory {
  static create(name) {
    const schema = SchemeFactory.create(name);
    if (schema) {
      return new ModelProvider(schema);
    }
    return null;
  }
};
