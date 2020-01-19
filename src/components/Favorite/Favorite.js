import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { updateFavorite } from "../../store/action-creaters/updateBeersPageActionCreator";
import Cards from "../Home/Cards";
import Beer from "../Home/Beer";

class Favorite extends React.Component {
  componentDidMount() {
    const { updateFavoriteActionCreator } = this.props;
    const favorite = window.localStorage.getItem("favorite");

    updateFavoriteActionCreator(JSON.parse(favorite));
  }

  render() {
    const { showBeer } = this.props;
    return (
      <>
        {showBeer ? <Beer /> : null}
        <Cards favoriteOrHom={false} />
      </>
    );
  }
}

const mapStateToProps = state => ({
  showBeer: state.beerReducer.showBeer
});
const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateFavoriteActionCreator: updateFavorite
    },
    dispatch
  );
};

Favorite.propTypes = {
  updateFavoriteActionCreator: PropTypes.func.isRequired,
  showBeer: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
