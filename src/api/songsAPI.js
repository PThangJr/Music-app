import axiosClient from "./axiosClient";

const songsAPI = {
  getSongs(payload) {
    const params = payload?.params;
    const url = "/songs";
    return axiosClient.get(url, { params });
  },
  getSongsOfRanking(payload) {
    let params;
    if (payload) {
      params = payload.params;
    }
    const url = "/songs/ranking";
    return axiosClient.get(url, { params });
  },
  getSongsOfSinger(payload) {
    const singerSlug = payload?.singerSlug || "";
    const url = `/songs/singer/${singerSlug}`;
    return axiosClient.get(url);
  },
  getSongsOfAlbum(payload) {
    let albumSlug = payload?.albumSlug || "";
    const url = `/albums/songs/${albumSlug}`;
    return axiosClient.get(url);
  },
};
export default songsAPI;
