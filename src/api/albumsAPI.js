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
};
export default albumsAPI;
