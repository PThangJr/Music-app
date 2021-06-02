import axiosClient from "./axiosClient";

const authsAPI = {
  login(payload) {
    const url = "/auths/login";
    return axiosClient.post(url, payload);
  },
};
export default authsAPI;
