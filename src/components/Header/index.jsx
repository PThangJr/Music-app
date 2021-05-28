import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
const Header = () => {
  return (
    <>
      <header className="header" id="header">
        <div className="container-md">
          <div className="row">
            <div className="header-top">
              <div className="header-logo">
                <img
                  src="data:image/png;base64,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"
                  alt="logo-mp3"
                  className="header-logo__image"
                />
              </div>

              <form className="search">
                <input
                  type="text"
                  className="search__input"
                  placeholder="Nhập từ khóa tìm kiếm..."
                />
                <button
                  className="btn btn--primary btn--full-height btn--search search-btn"
                  type="submit"
                >
                  Search
                </button>
              </form>
              <div className="auth">
                Login / Register
                <div className="dark-mode"></div>
              </div>
            </div>
            <div className="header-bottom">
              <ul className="menu-list">
                <li className="menu-item">
                  <Link to="/" className="menu-item__link">
                    Trang chủ
                  </Link>
                </li>
                <li className="menu-item">
                  <a href="/" className="menu-item__link">
                    Bảng xếp hạng
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/" className="menu-item__link">
                    Thể loại
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/" className="menu-item__link">
                    Ca sĩ
                  </a>
                </li>
                <li className="menu-item">
                  <a href="/" className="menu-item__link">
                    Videos
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      {/* <div className="container">
        <ul className="menu-list">
          <li className="menu-item">
            <a href="/" className="menu-item__link">
              Trang chủ
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-item__link">
              Bảng xếp hạng
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-item__link">
              Thể loại
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-item__link">
              Ca sĩ
            </a>
          </li>
          <li className="menu-item">
            <a href="/" className="menu-item__link">
              Videos
            </a>
          </li>
        </ul>
      </div> */}
    </>
  );
};

export default Header;
