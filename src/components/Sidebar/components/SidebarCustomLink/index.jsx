import React from "react";
import PropTypes from "prop-types";
import { NavLink, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
const SidebarCustomLink = (props) => {
  const { to, activeOnlyWhenExact } = props;
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });
  return (
    <div className={classNames("sidebar-item-main", { "link-active": match })}>
      <NavLink to={to} className="sidebar-link sidebar-item__link">
        {props.children}
      </NavLink>
    </div>
  );
};

SidebarCustomLink.propTypes = {
  to: PropTypes.string,
  activeOnlyWhenExact: PropTypes.bool,
};

export default SidebarCustomLink;
