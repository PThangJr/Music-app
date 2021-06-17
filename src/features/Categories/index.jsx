import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
export const Categories = () => {
  return (
    <div className="categories">
      <div className="categories-header">
        <h3 className="heading-15 categories-header__heading">Thể loại</h3>
      </div>
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
          <Link
            to="/"
            className="card-category"
            style={{
              backgroundImage:
                "url('https://photo-zmp3.zadn.vn/cover/9/a/d/c/9adcf62c1562be1b0de00358329c2b7f.jpg')",
            }}
          >
            <div className="card-category__info">Nhạc EDM</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
