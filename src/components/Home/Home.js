import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import Cards from "./Cards";
import Beer from "./Beer";
import { updateFavorite } from "../../store/action-creaters/updateBeersPageActionCreator";

function Home(props) {
  const { showBeer, updateFavoriteActionCreator } = props;
  useEffect(() => {
    const favorites = JSON.parse(window.localStorage.getItem("favorite")) || {};

    updateFavoriteActionCreator(favorites);
  }, []);

  return (
    <React.Fragment>
      {showBeer && <Beer />}
      <Cards favoriteOrHom />
    </React.Fragment>
  );
}
const mapStateToProps = state => ({
  showBeer: state.beerReducer.showBeer
});
const mapDispatchToProps = dispatcher =>
  bindActionCreators(
    {
      updateFavoriteActionCreator: updateFavorite
    },
    dispatcher
  );

Home.propTypes = {
  showBeer: PropTypes.bool.isRequired,
  updateFavoriteActionCreator: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
