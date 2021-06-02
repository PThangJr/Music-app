import axiosClient from "./axiosClient";

const categoriesAPI = {
  getCategories(payload) {
    const params = payload?.params;
    const url = "/categories";
    return axiosClient.get(url, { params });
  },
};
export default categoriesAPI;
