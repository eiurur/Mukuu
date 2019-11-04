module.exports = class Finder {
  constructor({ model, query, fields, limit, skip, sort, populates }) {
    this.model = model;
    this.query = query;
    this.fields = fields;
    this.limit = Number(limit);
    this.skip = Number(skip);
    this.sort = sort;
    this.populates = populates;
  }

  buildQuery(query) {
    if (this.limit) {
      query = query.limit(this.limit);
    }

    if (this.skip) {
      query = query.skip(this.skip);
    }

    if (this.sort) {
      query = this.buildSort(query);
    }

    if (this.populates) {
      query = this.buildPopulate(query);
    }

    return query;
  }

  buildSort(query) {
    switch (this.sort) {
      case 'updatedAtAsc': {
        query.sort({ createdAt: 1 });
        break;
      }
      case 'updatedAtDesc': {
        query.sort({ createdAt: -1 });
        break;
      }
      case 'retweetCountDesc': {
        query.sort({ retweetCount: -1 });
        break;
      }
      case 'favoriteCountDesc': {
        query.sort({ favoriteCount: -1 });
        break;
      }
      default: {
        query.sort({ createdAt: -1 });
        break;
      }
    }
    return query;
  }

  buildPopulate(query) {
    this.populates.forEach(populate => {
      if (typeof populate === 'string' || populate instanceof String) {
        query = query.populate(populate);
      } else if (Array.isArray(populate)) {
        query = query.populate(populate[0], populate[1]);
      } else if (
        populate instanceof Object &&
        populate.constructor === Object
      ) {
        query = query.populate(populate);
      }
    });
    return query;
  }

  findOne() {
    return new Promise((resolve, reject) => {
      this.buildQuery(this.model.findOne(this.query, this.fields)).exec(
        (err, result) => (err ? reject(err) : resolve(result)),
      );
    });
  }

  find() {
    return new Promise((resolve, reject) => {
      this.buildQuery(this.model.find(this.query, this.fields)).exec(
        (err, result) => (err ? reject(err) : resolve(result)),
      );
    });
  }
};
