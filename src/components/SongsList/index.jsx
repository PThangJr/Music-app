import React from "react";
import CardSong from "../../components/CardSong";
import CardSongSkeletons from "../CardSong/loading/CardSongSkeletons";
const SongsList = (props) => {
  const { songs = [], fullInfo = false, isLoading = false } = props;
  // console.log("songs", songs);

  const renderSongsList = () => {
    if (isLoading) {
      // const arr = [];
      // for (let i = 0; i < 19; i++) {
      //   arr.push(i);
      // }
      // return arr.map((item, index) =><CardSongSkeletons />);
      return <CardSongSkeletons totalItems={10} />;
    } else {
      return songs.map((song) => {
        return (
          <CardSong
            fullInfo={fullInfo}
            key={song?._id + Date.now()}
            song={song}
          />
        );
      });
    }
  };
  return <>{renderSongsList()}</>;
};

SongsList.propTypes = {};

export default SongsList;
