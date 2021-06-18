import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AllCategories from "./pages/AllCategories";
import CategoryDetail from "./pages/CategoryDetail";
import "./styles.scss";

const Categories = (props) => {
  const match = useRouteMatch();
  return (
    <Switch>
      <Route path={`${match.path}`} exact component={AllCategories} />
      <Route path={`${match.path}/:categorySlug`} component={CategoryDetail} />
    </Switch>
  );
};

Categories.propTypes = {};

export default Categories;
