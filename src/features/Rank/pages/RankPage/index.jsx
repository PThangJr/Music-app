import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rank from "../..";
import { fetchSongsOfRanking } from "../../songsOfRankingSlice";

const RankPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSongsOfRanking({ params: { limit: 20 } }));
  }, [dispatch]);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);

  return <Rank songs={songsOfRanking.data} />;
};

export default RankPage;
