import React from "react";
import "./styles.scss";
import Slide from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
const Trending = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
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
        },
      },
    ],
  };
  const albums = useSelector((state) => state.albums);

  return (
    <div className="trending">
      <Slide {...settings}>
        {albums.data.map((album) => {
          return (
            <div key={`${album._id} album`} className="trending-item">
              <Card title={album.name} linkImage={album.linkImage} />
            </div>
          );
        })}
      </Slide>
    </div>
  );
};

export default Trending;
