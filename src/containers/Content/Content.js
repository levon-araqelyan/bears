import React from "react";
import { withRouter } from "react-router";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { navigationService } from "../../services/navigationService";
import Home from "../../components/Home/Home";
import Favorite from "../../components/Favorite/Favorite";

const Content = ({ history }) => {
  navigationService.setHistory({ ...history });

  return (
    <Switch>
      <Route path="/(|home)/" component={Home} />
      <Route path="/(|favorite)/" component={Favorite} />
    </Switch>
  );
};

Content.propTypes = {
  history: PropTypes.object
};

Content.defaultProps = {
  history: {}
};

export default withRouter(Content);
