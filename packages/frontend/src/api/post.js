import axios from "axios";
import times from "@/plugins/times";

const VERSION = "v1";
const API_ROOT = `/api/${VERSION}`;

export default {
  async fetch(params) {
    if (params.from) params.from = times(params.from).format("YYYY-MM-DD");
    if (params.to) params.to = times(params.to).format("YYYY-MM-DD");
    const { data, request } = await axios.post(`${API_ROOT}/posts/list`, {
      data: params
    });
    return { url: request.responseURL, data };
  },
  async fetchCount(params) {
    if (params.from) params.from = times(params.from).format("YYYY-MM-DD");
    if (params.to) params.to = times(params.to).format("YYYY-MM-DD");
    const { data, request } = await axios.post(`${API_ROOT}/posts/count`, {
      data: params
    });
    return { url: request.responseURL, count: data.count };
  },
  async register(params) {
    const { data, request } = await axios.post(`${API_ROOT}/posts/register`, params);
    return { url: request.responseURL, data };
  },
  async aggregate(params) {
    const { data, request } = await axios.post(`${API_ROOT}/posts/aggregate`, {
      data: params
    });
    return { url: request.responseURL, data };
  }
};
