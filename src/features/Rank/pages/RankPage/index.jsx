import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rank from "../..";
import {
  fetchLoadMoreSongsOfRanking,
  fetchSongsOfRanking,
} from "../../songsOfRankingSlice";
const RankPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongsOfRanking({ params: { limit: 20 } }));
  }, [dispatch]);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const { pagination, isLoadingMore } = songsOfRanking;
  const handleLoadMore = () => {
    dispatch(
      fetchLoadMoreSongsOfRanking({
        params: { limit: 20, page: pagination.page + 1 },
      })
    );
  };
  return (
    <div className="rank-page">
      <Rank
        songs={songsOfRanking.data}
        isLoading={songsOfRanking.isLoading}
        handleLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
    </div>
  );
};

export default RankPage;
