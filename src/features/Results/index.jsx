import queryString from "query-string";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Card from "../../components/Card";
import CardCategory from "../../components/CardCategory";
import CardSinger from "../../components/CardSinger";
import SpinerLoading from "../../components/Loading/SpinerLoading";
import SongsList from "../../components/SongsList";
import { fetchResults } from "./resultsSlice";
import "./styles.scss";
const Results = (props) => {
  const location = useLocation();
  // const { page } = queryString.parse(location.search);

  const dispatch = useDispatch();
  //Store
  const results = useSelector((state) => state.results);
  const categories = useSelector((state) => state.categories);
  const { songs, albums, singers, songsOfSingers } = results.data;
  useEffect(() => {
    if (location.search) {
      const { keyword, page } = queryString.parse(location.search);
      // dispatch(fetchResults({ keyword, params: { limit: 5, page: 1 } }));
      dispatch(fetchResults({ params: { limit: 7, page, keyword } }));
    }
  }, [dispatch, location.search]);
  if (!results.isSuccess) {
    // console.log(`results.isLoading`, results.isLoading);
    return <SpinerLoading />;
  }
  return (
    <div className="results">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
          <div className="results-header">
            <h3 className="heading-15 results-header__heading">
              Kết quả tìm kiếm
            </h3>
          </div>
          <div className="results-songs">
            <SongsList fullInfo songs={songs} />
            <SongsList fullInfo songs={songsOfSingers} />
            {/* {results.isSuccess === false && <SpinerLoading />} */}
            {/* <Pagination totalPage={10} /> */}
          </div>
          <div className="row">
            {(singers.length && <h3 className="heading-15">Ca sĩ</h3>) || ""}
            {singers.map((singer) => {
              return (
                <div
                  key={singer._id}
                  className="col-xl-2 col-lg-3 col-md-4 col-6"
                >
                  <CardSinger singer={singer} />
                </div>
              );
            })}
          </div>
          <div className="row">
            {(albums.length && <h3 className="heading-15">Album</h3>) || ""}
            {albums.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6"
                >
                  <Card album={album} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-xl-3 col-lg-3">
          <h3 className="heading-15">Thể loại</h3>
          <div className="row">
            {categories.data.map((category) => {
              return (
                <div
                  key={category?._id + "category-page"}
                  className="col-xl-12 col-lg-12 col-md-4 col-sm-4 col-6"
                >
                  <CardCategory
                    key={category?._id + "category-result"}
                    category={category}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Results.propTypes = {};

export default Results;
