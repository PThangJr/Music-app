import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import ButtonPlayAll from "../../components/Buttons/components/ButtonPlayAll";
import CardSong from "../../components/CardSong";
import SongsList from "../../components/SongsList";
import "./styles.scss";
const Rank = ({ songs = [], isLoading = false }) => {
  //Store
  const currentSong = useSelector((state) => state.currentSong);
  //

  const renderSongsOfRanking = () => {
    if (isLoading) {
      const arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push(i);
      }
      return arr.map((item) => <CardSong key={item + "songs-of-ranking"} />);
    } else {
      return songs.map((song, index) => {
        return (
          <li
            key={song._id + "-ranking"}
            className={classNames("rank-item", {
              "card-song--active": currentSong._id === song._id,
            })}
          >
            <div className={`rank-number rank-number--${index + 1}`}>
              {index + 1}
            </div>
            <CardSong fullInfo song={song} />
          </li>
        );
      });
    }
  };
  return (
    <div className="rank">
      <div className="heading-15 rank-header">
        <h3 className=" rank-header__heading">Bảng xếp hạng</h3>
        <ButtonPlayAll songs={songs} />
      </div>
      <ul className="rank-list">
        <SongsList songs={songs} isLoading={isLoading} />
      </ul>
    </div>
  );
};

export default Rank;
