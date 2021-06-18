import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import PlaylistsList from "../../../../components/PlaylistsList";
import SongsList from "../../../../components/SongsList";
import { fetchAlbums } from "../../../Albums/albumsSlice";
import { fetchSongs } from "../../../Songs/songsSlice";
import { fetchPlaylistDetail } from "../../playlistDetailSlice";

const PlaylistDetail = () => {
  const dispatch = useDispatch();
  const { playlistSlug } = useParams();

  useEffect(() => {
    const randomPage = Math.floor(Math.random() * 4 + 1);
    console.log(`randomPage`, randomPage);
    dispatch(fetchSongs({ params: { limit: 8, page: randomPage } }));
    dispatch(fetchAlbums({ playlistSlug }));
    dispatch(fetchPlaylistDetail({ playlistSlug }));
  }, [dispatch, playlistSlug]);
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state) => state.albums);
  const playlistDetail = useSelector((state) => state.playlistDetail);

  return (
    <div className="details">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12">
          <div className="row">
            <PlaylistsList
              col="col-xl-2-5 col-lg-3 col-md-4 col-sm-6 col-6"
              albums={albums.data}
              isLoading={albums.isLoading}
              playlist={playlistDetail.data}
            />
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12">
          <div className="songs-suggestion">
            <h3 className="songs-suggestion__heading heading-15">
              Bài hát gợi ý
            </h3>
            <SongsList songs={songs.data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistDetail;
