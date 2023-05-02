const axios = require("axios");
const path = require('path');

const logger = require(path.join('..', '..', 'logger'))('cron');
const ModelProviderFactory = require('../../models/modelProviderFactory');

(async () => {
  logger.info('UPDATE USER ICON DATABASE');

  const userProvider = ModelProviderFactory.create('user');

  const query = {};
  const searchOption = {};
  const users = await userProvider.find(query, searchOption);
  logger.info('update users count : ', users.length);
  for (const user of users) {
    try {
      // console.log(user.profileBackgroundImageUrl);
      // console.log(user.profileImageUrl);
      // console.log(user.profileBannerUrl);
      let profileImage = null;
      let profileBanner = null;
      try {
        profileImage = await axios.get(user.profileImageUrl, { responseType: 'arraybuffer' });
      } catch (err) {

      }
      try {
        profileBanner = await axios.get(user.profileBannerUrl, { responseType: 'arraybuffer' });
      } catch (err) {

      }
      const profileImageUrlBase64 = profileImage ? Buffer.from(profileImage.data).toString('base64') : user.profileBannerUrlBase64 || null;
      const profileBannerUrlBase64 = profileBanner ? Buffer.from(profileBanner.data).toString('base64') : user.profileBannerUrlBase64 || null;
      const entity = {
        query: { idStr: user.idStr },
        data: Object.assign(user, {
          profileImageUrlBase64,
          profileBannerUrlBase64,
        }),
        options: { new: true, upsert: true },
      };
      const dbUser = await userProvider.findOneAndUpdate(
        entity.query,
        entity.data,
        entity.options,
      );
      // logger.info('update  : ', JSON.stringify(dbUser));
    } catch (e) {
      logger.info(e);
    }
  }
})();
