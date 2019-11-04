const util = require('util');
const crypto = require('crypto');

const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

const createParams = params => {
  const result = [];
  for (const k in params) {
    const v = params[k];
    result.push(`${k}=${v}`);
  }
  return result.join('&');
};

const createHash = (key, algorithm) => {
  algorithm = algorithm || 'sha256';
  return crypto
    .createHash(algorithm)
    .update(key)
    .digest('hex');
};
const createUID = (size, base) => {
  size = size || 32;
  base =
    base || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const len = base.length;
  const buf = [];
  let i = 0;

  while (i < size) {
    buf.push(base[Math.floor(Math.random() * len)]);
    ++i;
  }
  return buf.join('');
};

const random = array => {
  return array[Math.floor(Math.random() * array.length)];
};

module.exports = {
  sleep,
  createParams,
  createHash,
  createUID,
  random,
};
