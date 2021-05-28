import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Playlists from "../../../../features/Playlists";
import { fetchAlbumsList } from "./albumsListSlice";
import { fetchPlaylistDetail } from "./playlistDetailSlice";
import "./styles.scss";
const AlbumsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { playlistSlug } = params;
  useEffect(() => {
    dispatch(fetchAlbumsList({ playlistSlug }));
    dispatch(fetchPlaylistDetail({ playlistSlug }));
  }, [dispatch, playlistSlug]);
  const albumsList = useSelector((state) => state.albumsList);
  const playlistDetail = useSelector((state) => state.playlistDetail);

  return (
    <div className="albums">
      <Playlists
        col="col-xl-2-5 col-lg-3 col-md-3 col-sm-4 col-xs-6 col-6"
        name={playlistDetail.data?.name}
        albums={albumsList.data}
      />
    </div>
  );
};

export default AlbumsPage;
