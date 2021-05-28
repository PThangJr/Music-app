import axiosClient from "./axiosClient";

const playlistsAPI = {
  getPlaylists(payload) {
    const url = `/playlists`;
    return axiosClient.get(url);
  },
  getPlaylistBySlug(payload) {
    let playlistSlug = payload?.playlistSlug || "";
    const url = `/playlists/${playlistSlug}`;
    return axiosClient.get(url);
  },
};
export default playlistsAPI;
