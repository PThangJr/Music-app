import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPlaylists } from "../../playlistsSlice";

const AllPlaylists = () => {
  const dispatch = useDispatch();
  const playlists = useSelector((state) => state.playlists);
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);
  console.log(playlists);

  return <div>All Playlists</div>;
};

export default AllPlaylists;
