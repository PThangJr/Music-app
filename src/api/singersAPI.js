import axiosClient from "./axiosClient";

const singersAPI = {
  getSingers(payload) {
    const params = payload?.params;
    const url = "/singers";
    return axiosClient.get(url, { params });
  },
  createSinger(data) {
    const url = "/singers";
    return axiosClient.post(url, data);
  },
};
export default singersAPI;
