import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../features/Auths/authsSlice";
import { setDisplayPlayerQueue } from "../../pages/HomePages/displayFormSlice";
import HeaderSearch from "./compoents/HeaderSearch";
import "./styles.scss";
const Header = ({ toggleSidebar }) => {
  const auths = useSelector((state) => state.auths);
  const currentSong = useSelector((state) => state.currentSong);
  const prevSongs = useSelector((state) => state.prevSongs);
  const songsPlay = useSelector((state) => state.songsPlay);
  const totalSongs = prevSongs.data.length + songsPlay.data.length;
  const dispatch = useDispatch();
  const { user } = auths;
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleDisplayPlayerQueue = () => {
    dispatch(setDisplayPlayerQueue());
  };
  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };
  return (
    <>
      <header className="header" id="header">
        <div className="container-md ">
          <div className="header-top">
            <div className="button-sidebar">
              <button
                className="btn btn--auto btn--primary"
                onClick={handleToggleSidebar}
              >
                <i className="fas fa-bars"></i>
              </button>
            </div>
            <div className="header-logo hide-on-tablet hide-on-mobile">
              <img
                src="https://creativedesign.rs/cd_app/public/images/products/3313002426527403.jpg"
                alt="logo-mp3"
                className="header-logo__image"
              />
            </div>

            {/* Search */}
            <HeaderSearch />
            {/* */}
            <div className="list-song show-on-mobile">
              <button
                className="btn btn--auto btn--primary"
                onClick={handleDisplayPlayerQueue}
              >
                <i className="fas fa-music"></i>
              </button>
              <span className="number-of-songs">{totalSongs}</span>
            </div>
            {auths.authenticate ? (
              <div className="auth">
                <div onClick={handleLogout}>{user?.username} </div>
              </div>
            ) : (
              <div className="auth hide-on-mobile">
                <Link
                  to="/auths/login"
                  className="auth__link auth__link--login"
                >
                  Login
                </Link>
                <span>/</span>
                <Link
                  to="/auths/register"
                  className="auth__link auth__link--register"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="header-bottom">
            <div className=" show-on-mobile song-info ">
              <span className="song-info__name">{currentSong?.name}</span>
              <span>-</span>
              <span className="song-info__singers">
                {currentSong?.singers.map((singer, index) => (
                  <span key={singer._id + "-header"}>
                    {index > 0 && <span>,</span>}
                    {singer?.name}
                  </span>
                ))}
              </span>
            </div>
            <ul className="menu-list hide-on-mobile hide-on-tablet">
              <li className="menu-item">
                <Link to="/" className="menu-item__link">
                  Trang chủ
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/rank" className="menu-item__link">
                  Bảng xếp hạng
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/categories" className="menu-item__link">
                  Thể loại
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/singers" className="menu-item__link">
                  Ca sĩ
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/albums" className="menu-item__link">
                  Albums
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/songs" className="menu-item__link">
                  Bài hát
                </Link>
              </li>
              <li className="menu-item">
                <Link to="/favorites" className="menu-item__link">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
