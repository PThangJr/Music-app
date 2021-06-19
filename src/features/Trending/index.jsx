import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slide from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Card from "../../components/Card";
import { fetchAlbums } from "../Albums/albumsSlice";
import "./styles.scss";
const Trending = () => {
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 3,
    // // slidesToScroll: 4,
    autoplay: true,
    // className: "center",
    // centerMode: true,
    // centerPadding: "100px",
    // adaptiveHeight: true,
    // className: "center",
    // centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 1500,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 993,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          className: "center",
          centerMode: true,
          dots: false,
          speed: 1000,
        },
      },
    ],
  };
  const albums = useSelector((state) => state.albums);
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);
  return (
    <div className="trending">
      <Slide {...settings}>
        {albums.data.map((album) => {
          return (
            <div key={`${album._id} album`} className="trending-item">
              <Card album={album} />
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default Trending;
