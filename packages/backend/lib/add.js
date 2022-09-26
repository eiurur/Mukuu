const SUB = {
  comic: ['MNG', 'ICG'],
  game: [
    'MOV',
    'RPG',
    'ADV',
    'DNV',
    'ACN',
    'SLN',
    'STG',
    'QIZ',
    'TBL',
    'TYP',
    'PZL',
    'ETC',
  ],
  voice: ['SOU', 'MUS', 'AMT'],
};

const takeRandom = (array = [], n = 0) =>
  array.sort(() => Math.random() - Math.random()).slice(0, n < 0 ? 0 : n);

const querystring = (params) =>
  Object.keys(params)
    .map((key) => `${key}=${params[key]}`)
    .join('&');

const validate = (query) => {
  const { term, range, type, category, sub } = query;
  if (!term) {
    throw new Error(
      '"term" paramter should be "days" or "weeks" or "months" or "total"',
    );
  }
  if (!range) {
    throw new Error('"range" paramter should be "all", "new"');
  }
  if (!type) {
    throw new Error('"type" paramter should be "maniax", "books", "pro"');
  }
  // if (!category) {
  //   throw new Error('"category" paramter should be "comic", "game", "voice"');
  // }
  // if (!SUB[category].includes(sub)) {
  //   throw new Error(
  //     `"sub" parameter should be ${JSON.stringify(SUB[category])}`,
  //   );
  // }
};

module.exports = {
  validate,
  takeRandom,
  querystring,
};