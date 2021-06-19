import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useRouteMatch } from "react-router-dom";
import { fetchCategories } from "../../features/Categories/categoriesSlice";
import "./styles.scss";
const Sidebar = (props) => {
  const { displaySidebar, toggleSidebar } = props;
  const isMatchCategories = useRouteMatch({ path: "/categories" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  const categories = useSelector((state) => state.categories);
  const [subCategories, setSubCategories] = useState(false);
  const handleToggleSubSidebar = (type) => {
    setSubCategories(!subCategories);
  };
  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };
  return (
    <div
      className={classNames("sidebar", { "sidebar--active": displaySidebar })}
    >
      <ul
        className={classNames("sidebar-list", {
          "sidebar-list--active": displaySidebar,
        })}
      >
        <div className="sidebar-list-header">
          <h3 className="sidebar-list-header__heading">Menu</h3>
          <p className="icon" onClick={handleToggleSidebar}>
            <i className="fas fa-times"></i>
          </p>
        </div>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/"
            exact
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-house-user"></i>
            </p>
            Trang chủ
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/rank"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-chart-bar"></i>
            </p>
            Bảng xếp hạng
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/songs"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-music"></i>
            </p>
            Bài hát
          </NavLink>
        </li>
        <li className={"sidebar-item"}>
          <div
            className={classNames("sidebar-item-main", {
              "sidebar-link--active": isMatchCategories,
            })}
          >
            <NavLink
              activeClassName="sidebar-link--active"
              to="/categories"
              className="sidebar-link sidebar-item__link"
              onClick={handleToggleSidebar}
              exact
            >
              <p className="icon">
                <i className="fas fa-archive"></i>
              </p>
              Thể loại
            </NavLink>
            <p
              className={classNames("sidebar-item-icon-dropdown", {
                "sidebar-item-icon-dropdown--active": subCategories,
              })}
              onClick={() => handleToggleSubSidebar()}
            >
              <i className="fas fa-angle-right"></i>
            </p>
          </div>
          <ul
            className={classNames("sidebar-sub-list", {
              "sidebar-sub-list--active": subCategories,
            })}
          >
            {categories.data.map((category) => {
              return (
                <li
                  key={category._id + "-sidebar"}
                  className="sidebar-sub-item"
                  onClick={handleToggleSidebar}
                >
                  <NavLink
                    activeClassName="sidebar-sub-item__link--active"
                    to={`/categories/${category?.slug}`}
                    className="sidebar-link sidebar-sub-item__link"
                  >
                    <p className="icon">
                      {/* <i className="fas fa-dot-circle"></i> */}
                      <i className="fab fa-fly"></i>
                    </p>
                    {category?.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/albums"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-images"></i>
            </p>
            Albums
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/singers"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-id-card"></i>
            </p>
            Ca sĩ
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/favorites"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-heart"></i>
            </p>
            Favorites
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/auths/register"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-sign-in-alt"></i>
            </p>
            Đăng ký
          </NavLink>
        </li>
        <li className="sidebar-item" onClick={handleToggleSidebar}>
          <NavLink
            activeClassName="sidebar-link--active"
            to="/auths/login"
            className="sidebar-link sidebar-item__link"
          >
            <p className="icon">
              <i className="fas fa-sign-out-alt"></i>
            </p>
            Đăng nhập
          </NavLink>
        </li>
      </ul>
      {displaySidebar && (
        <div className="sidebar-overlay" onClick={handleToggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
