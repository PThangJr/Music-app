import { configureStore } from "@reduxjs/toolkit";
import playerControlsSlice from "../../features/Player/components/PlayerControls/playerControlsSlice";
import indexSongSlice from "../../features/Player/indexSongSlice";
import songsSlice from "../../features/Player/songsSlice";
import songsOfAlbumSlice from "../../features/PlayerQueue/songsOfAlbumSlice";
import songsPlaySlice from "../../features/PlayerQueue/songsPlaySlice";
import albumsSlice from "../../features/Playlists/albumsSlice";
import songsOfRankingSlice from "../../features/Rank/songsOfRankingSlice";
import songsOfSingerSlice from "../../features/Singers/songsOfSingerSlice";
import albumsListSlice from "../../layouts/Details/pages/AlbumsPage/albumsListSlice";
import playlistDetailSlice from "../../layouts/Details/pages/AlbumsPage/playlistDetailSlice";
import anthologyAlbumsSlice from "../../pages/HomePages/anthologyAlbumsSlice";
import balladUsUkAlbumSlice from "../../pages/HomePages/balladUsUkAlbumSlice";
import playlistsSlice from "../../pages/HomePages/playlistsSlice";

const store = configureStore({
  reducer: {
    songs: songsSlice,
    songsOfAlbum: songsOfAlbumSlice,
    songsOfSinger: songsOfSingerSlice,
    songsOfRanking: songsOfRankingSlice,
    songsPlay: songsPlaySlice,

    playerControls: playerControlsSlice,
    indexSong: indexSongSlice,

    playlists: playlistsSlice,
    playlistDetail: playlistDetailSlice,

    albums: albumsSlice,
    albumsList: albumsListSlice,
    anthologyAlbums: anthologyAlbumsSlice,
    balladUsUkAlbums: balladUsUkAlbumSlice,
  },
});
export default store;
