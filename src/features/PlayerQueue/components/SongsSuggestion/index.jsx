import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSong from "../../../../components/CardSong";
import { setPlayerControls } from "../../../Player/components/PlayerControls/playerControlsSlice";
import { updateSongList } from "../../songsPlaySlice";
import "./styles.scss";
const SongsSuggestion = () => {
  const songs = useSelector((state) => state.songs);
  const songsPlay = useSelector((state) => state.songsPlay);
  const currentSong = useSelector((state) => state.currentSong);
  const dispatch = useDispatch();
  const songsList = songs.data.filter(
    ({ _id: id1 }) => !songsPlay.data.some(({ _id: id2 }) => id2 === id1)
  );
  const handleChooseSong = (song) => {
    dispatch(updateSongList([song]));
    dispatch(setPlayerControls({ isPlaying: true }));
  };
  return (
    <div className=" songs-suggestion">
      <h4 className=" songs-suggestion__heading">Bài hát gợi ý</h4>
      <ul className="player-queue-list">
        {songsList
          .filter((songId) => songId._id !== currentSong._id)
          .map((song, index) => {
            return (
              <React.Fragment key={song._id}>
                <li
                  className={"player-queue-item "}
                  onClick={() => handleChooseSong(song)}
                >
                  <CardSong
                    linkImage={song.linkImage}
                    name={song.name}
                    descriptions={song.singers}
                  />
                  <button className={"btn btn--favorite "}></button>
                </li>
              </React.Fragment>
            );
          })}
      </ul>
    </div>
  );
};

export default SongsSuggestion;
