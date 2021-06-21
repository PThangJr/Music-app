import axiosClient from "./axiosClient";

const singersAPI = {
  getSingers(payload) {
    const params = payload?.params;
    const url = "/singers";
    return axiosClient.get(url, { params });
  },
  getSingerDetail(payload) {
    const url = `/singers/${payload.singerSlug}`;
    return axiosClient.get(url);
  },
  getBestRandomSingers(payload) {
    const params = payload?.params;
    const url = "/singers/random";
    return axiosClient.get(url, { params });
  },
  createSinger(data) {
    const url = "/singers";
    return axiosClient.post(url, data);
  },
};
export default singersAPI;
