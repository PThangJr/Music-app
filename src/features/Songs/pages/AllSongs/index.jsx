import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../../../components/Card";
import Pagination from "../../../../components/Pagination";
import SongsList from "../../../../components/SongsList";
import { fetchAlbumsSuggestion } from "../../../Albums/albumsSuggestionSlice";
import SongControls from "../../components/SongControls";
import { clearMessageAndErrors, fetchSongs } from "../../songsSlice";
import "./styles.scss";

const AllSongs = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const qs = queryString.parse(location.search, { parseNumbers: true });
  //Redux store
  const songs = useSelector((state) => state.songs);
  const albumsSuggestion = useSelector((state) => state.albumsSuggestion);
  const { isAdmin } = useSelector((state) => state.auths);
  //Pagination
  const { totalPages } = songs.pagination;
  const currentPage = parseInt(qs?.page) || 1;

  useEffect(() => {
    dispatch(fetchSongs({ params: { limit: 15, page: currentPage || 1 } }));
    dispatch(fetchAlbumsSuggestion({ params: { limit: 12 } }));
  }, [currentPage, dispatch]);
  useEffect(() => {
    if (songs.errors) {
      toast.error(songs.errors, {
        onClose: () => dispatch(clearMessageAndErrors()),
      });
    } else if (songs.message) {
      toast.success(songs.message, {
        onClose: () => dispatch(clearMessageAndErrors()),
      });
    }
  }, [dispatch, songs.errors, songs.message]);
  return (
    <div className="songs">
      <div className="songs-header">
        <h3 className="heading-15">Tất cả bài hát</h3>
        {isAdmin && <SongControls />}
      </div>
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <SongsList songs={songs.data} fullInfo isLoading={songs.isLoading} />
          <Pagination currentPage={currentPage} totalPage={totalPages} />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <h3 className="heading-15">Albums gợi ý</h3>
          <div className="row">
            {albumsSuggestion.data.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                >
                  <div className="card-album">
                    <Card
                      linkImage={album.linkImage}
                      title={album.name}
                      descriptions={album.singers}
                      album={album}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllSongs;
