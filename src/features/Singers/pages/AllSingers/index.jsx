import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSinger from "../../../../components/CardSinger";
import SingerControls from "../../components/SingerControls";
import { fetchSingers } from "../../singersSlice";
import CardSkeletons from "../../../../components/Card/loading/CardSkeletons";
import Pagination from "../../../../components/Pagination";
import queryString from "query-string";
import { useLocation } from "react-router";
const AllSingers = () => {
  const { isAdmin } = useSelector((state) => state.auths);
  const dispatch = useDispatch();
  //Pagination
  const location = useLocation();
  const { page, limit } = queryString.parse(location.search, {
    parseNumbers: true,
  });
  //
  useEffect(() => {
    dispatch(
      fetchSingers({
        params: {
          limit: limit || 24,
          page,
        },
      })
    );
  }, [dispatch, limit, page]);
  const singers = useSelector((state) => state.singers);
  const { pagination } = singers;

  return (
    <div className="singers">
      <h3 className="heading-15">Tất cả ca sĩ</h3>
      {isAdmin && <SingerControls />}
      <div className="row">
        {singers.isLoading ? (
          <CardSkeletons
            totalItems={18}
            className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
          />
        ) : (
          singers.data.map((singer) => {
            return (
              <div
                key={singer._id}
                className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
              >
                <CardSinger singer={singer} />
              </div>
            );
          })
        )}
        <Pagination
          currentPage={parseInt(page)}
          totalPage={pagination?.totalPages}
        />
      </div>
    </div>
  );
};

export default AllSingers;
