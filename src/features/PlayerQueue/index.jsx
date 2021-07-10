import classNames from "classnames";
import React, { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import SongsList from "../../components/SongsList";
import { setDisplayPlayerQueue } from "../../pages/HomePages/displayFormSlice";
import { setPlayerControls } from "../Player/components/PlayerControls/playerControlsSlice";
import { removeCurrerntSong, setCurrentSong } from "../Player/currentSongSlice";
import {
  removePrevSongs,
  removePrevSongsExceptCurrentSong,
  setPrevSongs,
  updatePrevSongs,
} from "./prevSongsSlice";
import {
  removeNextSongs,
  setSongsPlay,
  unshiftSongList,
  updateSongList,
} from "./songsPlaySlice";
import { toast } from "react-toastify";

import "./styles.scss";

const PlayerQueue = () => {
  const songsPlay = useSelector((state) => state.songsPlay);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const displayForm = useSelector((state) => state.displayForm);
  const playerControls = useSelector((state) => state.playerControls);

  const songsList = songsPlay.data;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!prevSongs.data.length) {
      const [firstSong, ...otherSongs] = songsPlay.data;
      if (firstSong) {
        dispatch(setPrevSongs(firstSong));
        dispatch(setCurrentSong(firstSong));
        const otherSongsFilter = otherSongs.filter(
          (song) => song._id !== firstSong._id
        );
        dispatch(setSongsPlay(otherSongsFilter));
      }
    }
  }, [dispatch, prevSongs.data, songsPlay.data]);

  // const handleFavoriteSong = (e) => {
  //   e.stopPropagation();
  // };
  const handleClosePlayerQueue = () => {
    dispatch(setDisplayPlayerQueue({ playerQueue: false }));
  };
  const handleRemovePrevSongs = () => {
    if (window.confirm("Bạn có muốn xoá danh sách phát hiện tại?")) {
      if (playerControls.isPlaying) {
        dispatch(removePrevSongsExceptCurrentSong({ currentSong }));
      } else {
        dispatch(removePrevSongs());
        dispatch(setPlayerControls({ isPlaying: false }));
        dispatch(removeCurrerntSong());
      }
    }
  };
  const handleRemoveSongsPlay = () => {
    if (window.confirm("Bạn có muốn xoá danh sách phát tiếp theo?")) {
      dispatch(removeNextSongs());
    }
  };
  const handleDragEnd = (result) => {
    // console.log(result);

    if (!result.destination) {
      let songDeleted;
      if (result.source.droppableId === "songsPlay") {
        const newSongsPlayData = [...songsPlay.data];
        songDeleted = newSongsPlayData.splice(result.source.index, 1);
        dispatch(updateSongList(newSongsPlayData));
      } else if (
        result.source.droppableId === "prevSongs" &&
        result.draggableId !== currentSong._id
      ) {
        const newPrevSongsData = [...prevSongs.data];
        songDeleted = newPrevSongsData.splice(result.source.index, 1);
        dispatch(updatePrevSongs(newPrevSongsData));
      }
      toast.error(
        `🎵 Gỡ bài hát "${songDeleted[0].name}" khỏi Danh sách phát`,
        {
          autoClose: 1500,
        }
      );
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    //Remove
    if (
      result.source.droppableId === "songsPlay" &&
      result.destination.droppableId === "songsPlay"
    ) {
      // console.log(songsPlay.data.splice(result.source.index, 1));
      const newSongsPlayData = [...songsPlay.data];
      const songPlayDeleted = newSongsPlayData.splice(result.source.index, 1);
      newSongsPlayData.splice(result.destination.index, 0, ...songPlayDeleted);
      dispatch(updateSongList(newSongsPlayData));
      return;
    }
    if (
      result.source.droppableId === "songsPlay" &&
      result.destination.droppableId === "prevSongs" &&
      result.destination.index < prevSongs.data.length
    ) {
      const newSongsPlayData = [...songsPlay.data];
      const newPrevSongsData = [...prevSongs.data];
      const songPlayDeleted = newSongsPlayData.splice(result.source.index, 1);
      newPrevSongsData.splice(result.destination.index, 0, ...songPlayDeleted);
      dispatch(updatePrevSongs(newPrevSongsData));
      dispatch(updateSongList(newSongsPlayData));
      return;
    }
    if (
      result.source.droppableId === "prevSongs" &&
      result.destination.droppableId === "prevSongs"
    ) {
      // console.log(songsPlay.data.splice(result.source.index, 1));
      if (result.source.index === prevSongs.data.length - 1) {
        const newPrevSongsData = [...prevSongs.data];
        const prevSongsDeleted = newPrevSongsData.splice(
          result.destination.index,
          prevSongs.data.length - 1 - result.destination.index
        );
        // console.log(result.destination.index, prevSongsDeleted);
        // newPrevSongsData.splice(
        //   result.destination.index,
        //   0,
        //   prevSongs.data[prevSongs.data.length - 1]
        // );
        // prevSongsDeleted.pop();
        // console.log(prevSongsDeleted);
        dispatch(unshiftSongList(prevSongsDeleted));
        dispatch(updatePrevSongs(newPrevSongsData));
        return;
      }
      if (!(result.destination.index === prevSongs.data.length - 1)) {
        const newPrevSongsData = [...prevSongs.data];
        const prevSongDeleted = newPrevSongsData.splice(result.source.index, 1);
        newPrevSongsData.splice(
          result.destination.index,
          0,
          ...prevSongDeleted
        );
        dispatch(updatePrevSongs(newPrevSongsData));
        return;
      }
      return;
    }
    if (
      result.source.droppableId === "prevSongs" &&
      result.destination.droppableId === "songsPlay" &&
      result.draggableId !== currentSong._id
    ) {
      const newSongsPlayData = [...songsPlay.data];
      const newPrevSongsData = [...prevSongs.data];
      const prevSongDeleted = newPrevSongsData.splice(result.source.index, 1);
      newSongsPlayData.splice(result.destination.index, 0, ...prevSongDeleted);
      dispatch(updatePrevSongs(newPrevSongsData));
      dispatch(updateSongList(newSongsPlayData));
      return;
    }
  };
  return (
    <div
      className={classNames("player-queue", {
        "player-queue--active": displayForm.playerQueue,
      })}
    >
      <div className="player-queue-header">
        <p
          className="icon icon-close-player-queue"
          onClick={handleClosePlayerQueue}
        >
          <i className="fas fa-times"></i>
        </p>
        <h3 className="player-queue-header__heading">Danh sách phát</h3>
      </div>
      <div className="player-queue-box">
        <DragDropContext onDragEnd={handleDragEnd}>
          <ul className="player-queue-list">
            {currentSong._id && (
              <div className="player-queue-list-header">
                <h3 className="player-queue-list-header__heading">
                  Bài hát đang phát
                </h3>
                <p
                  className="player-queue-list-header__remove"
                  onClick={handleRemovePrevSongs}
                >
                  Xoá ds phát
                </p>
              </div>
            )}
            <SongsList
              droppableId="prevSongs"
              songs={prevSongs.data}
              sortable
            />
          </ul>
          <ul className="player-queue-list">
            {songsList.length > 0 && (
              <div className="player-queue-list-header">
                <h3 className="player-queue-list-header__heading">
                  Bài hát tiếp theo
                </h3>
                <p
                  className="player-queue-list-header__remove"
                  onClick={handleRemoveSongsPlay}
                >
                  Xoá tất cả
                </p>
              </div>
            )}
            <SongsList droppableId="songsPlay" songs={songsList} sortable />
          </ul>
          {/* <List /> */}
          {/* {currentSong._id && <SongsSuggestion />} */}
        </DragDropContext>
      </div>
    </div>
  );
};

export default PlayerQueue;
