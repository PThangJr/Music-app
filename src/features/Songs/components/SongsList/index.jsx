import React from "react";
import CardSong from "../../../../components/CardSong";

const SongsList = (props) => {
  const { songs } = props;

  return (
    <ul className="songs-list">
      {songs.map((song, index) => {
        return (
          <li key={song._id + "-ranking"} className="rank-item">
            <div className={`rank-number rank-number--${index + 1}`}>
              {index + 1}
            </div>
            <CardSong fullInfo song={song} />
          </li>
        );
      })}
    </ul>
  );
};

SongsList.propTypes = {};

export default SongsList;
