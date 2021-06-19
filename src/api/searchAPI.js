import axiosClient from "./axiosClient";

const searchAPI = {
  search(payload) {
    // console.log(`payload`, payload);
    const url = "/search";
    return axiosClient.post(
      url,
      { keyword: payload.keyword },
      { params: payload?.params }
    );
  },
  getSearch(payload) {
    const params = payload?.params;
    const url = "/search";
    return axiosClient.get(url, { params });
  },
};
export default searchAPI;
