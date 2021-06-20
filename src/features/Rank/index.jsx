import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import ButtonPlayAll from "../../components/Buttons/components/ButtonPlayAll";
import CardSong from "../../components/CardSong";
import CardSongSkeletons from "../../components/CardSong/loading/CardSongSkeletons";
import { Link } from "react-router-dom";
import "./styles.scss";
const Rank = ({ songs = [], isLoading = false }) => {
  //Store
  const currentSong = useSelector((state) => state.currentSong);
  //

  const renderSongsOfRanking = () => {
    if (isLoading) {
      return <CardSongSkeletons totalItems={10} />;
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
        <Link to="/rank" className=" rank-header__heading">
          Bảng xếp hạng
          <p className="icon">
            <i className="fas fa-chevron-right"></i>
          </p>
        </Link>
        <ButtonPlayAll songs={songs} />
      </div>
      <ul className="rank-list">
        {/* <SongsList songs={songs} isLoading={isLoading} fullInfo /> */}
        {renderSongsOfRanking()}
      </ul>
    </div>
  );
};

export default Rank;
