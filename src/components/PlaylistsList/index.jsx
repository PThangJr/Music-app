import React from "react";
import { Link } from "react-router-dom";
import Card from "../Card";
import "./styles.scss";
const PlaylistsList = (props) => {
  let {
    name = "",
    albums = [],
    playlist = {},
    col = "",
    isLoading = false,
    isAdmin = false,
    isHaveSingers = false,
  } = props;
  return (
    <div className="playlists">
      <h3 className="playlists-header heading-15">
        <Link
          to={`/playlists/${playlist?.slug}`}
          className="playlists-header-link"
        >
          {playlist?.name || name}
          <p className="icon">
            <i className="fas fa-chevron-right"></i>
          </p>
        </Link>
      </h3>
      <div className="row">
        {!isLoading
          ? albums.map((album) => {
              return (
                <div
                  key={album._id + "-playlists"}
                  className={col || "col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6"}
                >
                  <Card album={album} isAdmin={isAdmin} />
                </div>
              );
            })
          : [1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <div
                  key={index + "-playlists"}
                  className={col || "col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6"}
                >
                  <Card isHaveSingers={isHaveSingers} />
                </div>
              );
            })}

        {/* {props.children} */}
      </div>
    </div>
  );
};

export default PlaylistsList;
