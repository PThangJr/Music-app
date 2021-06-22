import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSinger from "../../../../components/CardSinger";
import SingerControls from "../../components/SingerControls";
import { fetchSingers } from "../../singersSlice";
import CardSkeletons from "../../../../components/Card/loading/CardSkeletons";
const AllSingers = () => {
  const { isAdmin } = useSelector((state) => state.auths);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSingers());
  }, [dispatch]);
  const singers = useSelector((state) => state.singers);

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
      </div>
    </div>
  );
};

export default AllSingers;
