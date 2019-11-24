import axios from 'axios';

const VERSION = 'v1';
const API_ROOT = `/api/${VERSION}`;

export default {
  async fetch(params) {
    const { data, request } = await axios.get(`${API_ROOT}/users`, {
      params,
    });
    return { url: request.responseURL, data };
  },
  async fetchCount(params) {
    const { data, request } = await axios.get(`${API_ROOT}/users/count`, {
      params,
    });
    return { url: request.responseURL, count: data.count };
  },
};
