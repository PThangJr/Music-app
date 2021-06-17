import axiosClient from "./axiosClient";

const albumsAPI = {
  getAlbums(payload) {
    let playlistSlug = "";
    let params = {};
    if (payload) {
      if (payload.hasOwnProperty("playlistSlug")) {
        playlistSlug = payload.playlistSlug;
      }
      if (payload.hasOwnProperty("params")) {
        params = payload.params;
      }
    }
    const url = `/albums/${playlistSlug}`;
    return axiosClient.get(url, { params });
  },
  getAlbumsOfSinger(payload) {
    let singerSlug = payload?.singerSlug || "";
    const url = `/albums/singer/${singerSlug}`;
    return axiosClient.get(url);
  },
  createAlbum(data) {
    const url = `/albums`;
    return axiosClient.post(url, data);
  },
  deleteAlbum(payload) {
    console.log(`payload`, payload);
    const albumId = payload?.albumId || "";
    const url = `/albums/${albumId}`;
    return axiosClient.delete(url);
  },
  updateAlbum(payload) {
    const albumId = payload?.albumId || "";
    const data = payload?.data || {};
    const url = `/albums/${albumId}`;
    return axiosClient.put(url, data);
  },
};
export default albumsAPI;
