import axiosClient from "./axiosClient";

const authorsAPI = {
  getAuthors(payload) {
    const params = payload?.params;
    const url = "/authors";
    return axiosClient.get(url, { params });
  },
};
export default authorsAPI;
