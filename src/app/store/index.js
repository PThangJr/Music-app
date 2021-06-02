import { configureStore } from "@reduxjs/toolkit";
import albumsSlice from "../../features/Albums/albumsSlice";
import authorsSlice from "../../features/Authors/authorsSlice";
import authsSlice from "../../features/Auths/authsSlice";
import categoriesSlice from "../../features/Categories/categoriesSlice";
import playerControlsSlice from "../../features/Player/components/PlayerControls/playerControlsSlice";
import currentSongSlice from "../../features/Player/currentSongSlice";
import prevSongsSlice from "../../features/PlayerQueue/prevSongsSlice";
import songsPlaySlice from "../../features/PlayerQueue/songsPlaySlice";
import playlistDetailSlice from "../../features/Playlists/playlistDetailSlice";
import playlistsSlice from "../../features/Playlists/playlistsSlice";
import songsOfRankingSlice from "../../features/Rank/songsOfRankingSlice";
import singersSlice from "../../features/Singers/singersSlice";
import songsSlice from "../../features/Songs/songsSlice";
import albumsListSlice from "../../layouts/Details/pages/AlbumsPage/albumsListSlice";
import anthologyAlbumsSlice from "../../pages/HomePages/anthologyAlbumsSlice";
import balladUsUkAlbumSlice from "../../pages/HomePages/balladUsUkAlbumSlice";
import displayFormSlice from "../../pages/HomePages/displayFormSlice";

const store = configureStore({
  reducer: {
    displayForm: displayFormSlice,

    songs: songsSlice,
    songsOfRanking: songsOfRankingSlice,
    songsPlay: songsPlaySlice,
    currentSong: currentSongSlice,
    prevSongs: prevSongsSlice,

    categories: categoriesSlice,

    singers: singersSlice,

    authors: authorsSlice,
    playerControls: playerControlsSlice,

    playlists: playlistsSlice,
    playlistDetail: playlistDetailSlice,

    albums: albumsSlice,
    albumsList: albumsListSlice,
    anthologyAlbums: anthologyAlbumsSlice,
    balladUsUkAlbums: balladUsUkAlbumSlice,

    auths: authsSlice,
  },
});
export default store;
