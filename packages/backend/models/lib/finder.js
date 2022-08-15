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

  // REF: https://stackoverflow.com/questions/66172034/mongoose-sort-breaks-skip-limit
  _allowNumberSort(sort) {
    return Object.assign({}, sort, { _id: -1 });
  }

  buildQuery(query) {
    if (this.sort) {
      query = this.buildSort(query);
    }

    if (!isNaN(this.limit)) {
      query = query.limit(this.limit);
    }

    if (!isNaN(this.skip)) {
      query = query.skip(this.skip);
    }

    if (this.populates) {
      query = this.buildPopulate(query);
    }

    return query;
  }

  buildSort(query) {
    switch (this.sort) {
      case 'updatedAtAsc': {
        query.sort(this._allowNumberSort({ updatedAt: 'asc' }));
        break;
      }
      case 'updatedAtDesc': {
        query.sort(this._allowNumberSort({ updatedAt: 'desc' }));
        break;
      }
      case 'createdAtAsc': {
        query.sort(this._allowNumberSort({ createdAt: 'asc' }));
        break;
      }
      case 'createdAtDesc': {
        query.sort(this._allowNumberSort({ createdAt: 'desc' }));
        break;
      }
      case 'retweetCountDesc': {
        query.sort(this._allowNumberSort({ retweetCount: 'desc' }));
        break;
      }
      case 'favoriteCountDesc': {
        query.sort(this._allowNumberSort({ favoriteCount: 'desc' }));
        break;
      }
      case 'totalCountDesc': {
        query.sort(this._allowNumberSort({ totalCount: 'desc' }));
        break;
      }
      case 'postCountDesc': {
        query.sort(this._allowNumberSort({ postCount: 'desc' }));
        break;
      }
      case 'followersCountDesc': {
        query.sort(this._allowNumberSort({ followersCount: 'desc' }));
        break;
      }
      case 'friendsCountDesc': {
        query.sort(this._allowNumberSort({ friendsCount: 'desc' }));
        break;
      }
      case 'countDesc': {
        query.sort(this._allowNumberSort({ count: 'desc' }));
        break;
      }
      default: {
        query.sort(this._allowNumberSort({ createdAt: 'desc' }));
        break;
      }
    }
    return query;
  }

  buildPopulate(query) {
    this.populates.forEach((populate) => {
      if (typeof populate === 'string' || populate instanceof String) {
        query = query.populate(populate);
      } else if (Array.isArray(populate)) {
        query = query.populate(populate[0], populate[1]);
      } else if (
        populate instanceof Object &&
        populate.constructor === Object
      ) {
        if (populate.recursive) {
          // const root = {}
          // [...Array(populate.recursive).keys()].forEach((i) => {
          //   populate.keys.forEach(key => {
          //     root
          //   })
          //   populate.items.forEach((item) => {
          //     query = query.populate(item);
          //   });
          // });
        } else {
          query = query.populate(populate);
        }
      }
    });
    return query;
  }

  findOne() {
    return new Promise((resolve, reject) => {
      this.buildQuery(this.model.findOne(this.query, this.fields)).exec(
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  }

  find() {
    return new Promise((resolve, reject) => {
      this.buildQuery(this.model.find(this.query, this.fields)).exec(
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  }

  count() {
    return new Promise((resolve, reject) => {
      this.buildQuery(this.model.countDocuments(this.query, this.fields)).exec(
        (err, result) => (err ? reject(err) : resolve(result))
      );
    });
  }
};
