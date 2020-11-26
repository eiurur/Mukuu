const ModelProviderFactory = require('../models/modelProviderFactory');
const { acceptedDomains } = require('@mukuu/common/lib/constants');

module.exports = {
  addQuoteStatus: async (post) => {
    if (!post) return;
    // if (post.quotedStatus) return;

    const entities = JSON.parse(post.entities);
    if (entities.media && entities.media.length) return;

    const urls = [...post.text.matchAll(/(https?:\/\/\S+)/g)];
    if (!urls || !urls.length) return;

    const matchedDlLinks = urls.filter((m) =>
      acceptedDomains.some((domain) => m[0].indexOf(domain) !== -1),
    );
    if (!matchedDlLinks.length) return;

    const postProvider = ModelProviderFactory.create('post');

    const quotedStatuses = [];
    for ([dlLink] of matchedDlLinks) {
      if (
        dlLink.indexOf('ux.getuploader.com') !== -1 &&
        dlLink.indexOf('/download/') === -1
      ) {
        continue;
      }
      const postQuery = { searchWord: dlLink };
      const postSearchOption = {
        sort: 'createdAtAsc',
      };
      const [oldest] = await postProvider.find(postQuery, postSearchOption);
      if (oldest && post.idStr !== oldest.idStr) {
        quotedStatuses.push(oldest);
      }
    }
    if (!quotedStatuses.length) return;

    const entity = {
      query: { idStr: post.idStr },
      data: Object.assign(post, {
        quotedStatuses: quotedStatuses.map((post) => post._id),
      }),
      options: { new: true, upsert: true },
    };
    const dbPost = await postProvider.findOneAndUpdate(
      entity.query,
      entity.data,
      entity.options,
    );
  },
};
