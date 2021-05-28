import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/Card";
import { fetchAlbums } from "./albumsSlice";
import "./styles.scss";
const Playlists = (props) => {
  let { name = "", linkName = "", type = "", albums = [], col = "" } = props;
  const params = useParams();
  type = params.albumSlug || type;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchAlbums({ playlistSlug: type }));
  // }, [dispatch, type]);
  return (
    <div className="playlists">
      <h3 className="playlists-header heading-15">
        <Link to={linkName}>{name}</Link>
      </h3>
      <div className="row">
        {albums.map((album) => {
          return (
            <div
              key={album._id}
              className={col || "col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-6"}
            >
              <Card
                title={album.name}
                linkImage={album.linkImage}
                linkTitle={`/albums/${album.slug}`}
                descriptions={album.singers}
                titleSlug={album.slug}
                // slugTitle={album.slug}
                // handleChooseAlbum={handleChooseAlbum}
              />
            </div>
          );
        })}

        {props.children}
      </div>
    </div>
  );
};

export default Playlists;
