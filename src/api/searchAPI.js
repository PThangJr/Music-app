import axiosClient from "./axiosClient";

const searchAPI = {
  search(keyword) {
    const url = "/search";
    return axiosClient.post(url, keyword);
  },
};
export default searchAPI;
