import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Card from "../../../../components/Card";
import CardSkeletons from "../../../../components/Card/loading/CardSkeletons";
import Pagination from "../../../../components/Pagination";
import SongsList from "../../../../components/SongsList";
import { fetchAlbums } from "../../../Albums/albumsSlice";
import { fetchSongs } from "../../../Songs/songsSlice";
const CategoryDetail = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { limit, page } = queryString.parse(location.search);
  //Store
  const songs = useSelector((state) => state.songs);
  const albums = useSelector((state) => state.albums);
  // console.log(`albums`, albums);
  //
  useEffect(() => {
    dispatch(
      fetchSongs({
        params: {
          limit: limit || 15,
          page: page || 1,
          category: params.categorySlug,
        },
      })
    );
    dispatch(
      fetchAlbums({ params: { limit: 12, category: params.categorySlug } })
    );
  }, [dispatch, limit, page, params.categorySlug]);
  return (
    <div className="category-detail">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <h3 className="heading-15">Bài hát</h3>
          <div className="row">
            <SongsList songs={songs.data} isLoading={songs.isLoading} />
            <Pagination
              currentPage={parseInt(page)}
              totalPage={songs.pagination?.totalPages}
              pageRangeDisplay={5}
            />
          </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
          <h3 className="heading-15">Albums gợi ý</h3>
          <div className="row">
            {albums.isLoading ? (
              <CardSkeletons
                totalItems={8}
                className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
              />
            ) : (
              albums.data.map((album) => {
                return (
                  <div
                    key={album._id}
                    className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                  >
                    <div className="card-album">
                      <Card album={album} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryDetail.propTypes = {};

export default CategoryDetail;
