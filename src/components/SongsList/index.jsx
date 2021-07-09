import React from "react";
import CardSong from "../../components/CardSong";
import CardSongSkeletons from "../CardSong/loading/CardSongSkeletons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const SongsList = (props) => {
  const {
    songs = [],
    fullInfo = false,
    isLoading = false,
    sortable = false,
    droppableId,
  } = props;

  const renderSongsList = () => {
    if (isLoading) {
      return <CardSongSkeletons totalItems={10} />;
    } else {
      return songs.map((song) => {
        return (
          <CardSong
            fullInfo={fullInfo}
            key={song?._id + Date.now()}
            song={song}
            sortable={sortable}
          />
        );
      });
    }
  };

  if (sortable) {
    return (
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {songs.map((song, index) => (
              <Draggable key={song._id} index={index} draggableId={song._id}>
                {(provided) => (
                  <CardSong song={song} sortable provided={provided} />
                )}
              </Draggable>
            ))}
          </div>
        )}
        {/* {renderSongsList()} */}
      </Droppable>
    );
  }
  return <>{renderSongsList()}</>;
};

SongsList.propTypes = {};

export default SongsList;
