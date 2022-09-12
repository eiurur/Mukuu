const { DLSite } = require('mizu');
const { seaquencer } = require('../../lib/seaquencer');
const { validate, takeRandom, querystring } = require('../../lib/add');
const ModelProviderFactory = require('../../models/modelProviderFactory');

module.exports = class AddController {
  static get(req, res) {
    seaquencer(
      req,
      res,
      (async (params) => {
        validate(params);

        const { term, range, type, category, sub, aid, count = 20 } = params;

        const key = querystring({
          term,
          type,
          category,
          range,
          sub,
          aid,
        });

        const addProvider = ModelProviderFactory.create('add');
        const query = { key };
        const searchOption = {};
        const cache = await addProvider.findOne(query, searchOption);
        if (cache) {
          // console.log("cache:", cache);
          const works = JSON.parse(cache.works);
          if (Array.isArray(works) && works.length) {
            return takeRandom(works, count);
          }
        }

        const initial = { term };
        const options = {
          type,
          category,
          range,
          sub,
          affiliateId: aid,
          limit: 50,
        };
        const servive = new DLSite(initial);
        const works = await servive.scrape({
          amount: -1,
          options,
        });
        const entity = {
          query: { key },
          data: {
            key,
            works: JSON.stringify(works),
          },
          options: { new: true, upsert: true },
        };
        await addProvider.findOneAndUpdate(
          entity.query,
          entity.data,
          entity.options
        );
        return takeRandom(works, count);
      })(req.params)
    );
  }
};
