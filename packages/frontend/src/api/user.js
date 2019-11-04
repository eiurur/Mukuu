import axios from 'axios';

const VERSION = 'v1';
const API_ROOT = `/api/${VERSION}`;

export default {
  async fetch(params) {
    const { data } = await axios.get(`${API_ROOT}/users`, {
      params
    });
    return data;
  }
};
