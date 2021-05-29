import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardSong from "../../components/CardSong";
import { setPlayerControls } from "../Player/components/PlayerControls/playerControlsSlice";
import { setIndexSong } from "../Player/indexSongSlice";
import { updateSongList } from "../PlayerQueue/songsPlaySlice";
import { fetchSongsOfRanking } from "./songsOfRankingSlice";
import "./styles.scss";
const Rank = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      params: {
        limit: 20,
      },
    };
    dispatch(fetchSongsOfRanking(payload));
  }, [dispatch]);
  const songsOfRanking = useSelector((state) => state.songsOfRanking);
  const handlePlaySong = (index, song) => {
    // console.log(song);
    // dispatch(setPlayerControls({ isPlaying: true }));
    // dispatch(updateSongList([song]));
    // dispatch(setIndexSong({ indexCurrentSong: 0 }));
  };
  return (
    <div className="rank">
      <h3 className="rank__heading">Bảng xếp hạng</h3>
      <ul className="rank-list">
        {songsOfRanking.data.map((song, index) => {
          return (
            <li
              key={song._id + "-ranking"}
              onClick={() => handlePlaySong(index, song)}
              className="rank-item"
            >
              <div className={`rank-number rank-number--${index + 1}`}>
                {index + 1}
              </div>
              <CardSong
                fullInfo
                // linkImage={song.linkImage}
                // name={song.name}
                // descriptions={song.singers}
                song={song}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Rank;
