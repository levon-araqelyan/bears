import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import style from "./Cards.module.css";
import { getOneBeerRequest } from "../../store/action-creaters/oneBeerActionCreators";
import { getRandomBeerRequest } from "../../store/action-creaters/randomBeerActionCreator";
import ButtonStar from "../buttonStar/ButtonStar";
import { clearFavoriteCard, getFavoriteCard } from "../../store/action-creaters/favoriteActionCreator";
import { updateBeers } from "../../store/action-creaters/updateBeersPageActionCreator";

class Cards extends React.Component {
  oneBeer = e => {
    const { getOneBeerRequestActionCreators, getRandomBeerRequestActionCreators } = this.props;

    console.log(e.currentTarget.id);
    getOneBeerRequestActionCreators(e.currentTarget.id);
    getRandomBeerRequestActionCreators();
    getRandomBeerRequestActionCreators();
    getRandomBeerRequestActionCreators();
  };

  starOnClick = (e, fav) => {
    e.stopPropagation();
    const { getFavoriteCardActionCreators } = this.props;
    const favorite = JSON.parse(window.localStorage.getItem("favorite")) || {};

    favorite[fav.id] = fav;
    window.localStorage.setItem("favorite", JSON.stringify(favorite));
    getFavoriteCardActionCreators(fav);
  };

  starOffClick = (e, fav) => {
    e.stopPropagation();
    const favorite = JSON.parse(window.localStorage.getItem("favorite"));
    const { clearFavoriteCardActionCreators } = this.props;

    delete favorite[fav.id];
    window.localStorage.setItem("favorite", JSON.stringify(favorite));
    clearFavoriteCardActionCreators(fav);
  };

  render() {
    const { beers, favoriteOrHom, favBeers } = this.props;
    const favoriteId = Object.keys(favBeers);
    const fav = Object.values(favBeers);
    const list = favoriteOrHom ? beers : fav;

    return (
      <div className={style.Beer}>
        {list.map((beer, index) => (
          <button className={style.info} key={beer.id} id={beer.id} onClick={this.oneBeer} type="button">
            <ButtonStar
              onClick={e => this.starOnClick(e, beer)}
              offClick={e => this.starOffClick(e, beer)}
              className={style.star}
              id={beer.id}
              favoriteFlags={favoriteId.indexOf(`${beer.id}`) !== -1}
            />
            <img className={style.img} src={beer.image_url} alt="beer" />
            <p className={style.name}>{beer.name}</p>
          </button>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  beers: state.beerReducer.beers,
  favBeers: state.beerReducer.favorite
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getOneBeerRequestActionCreators: getOneBeerRequest,
      getRandomBeerRequestActionCreators: getRandomBeerRequest,
      getFavoriteCardActionCreators: getFavoriteCard,
      clearFavoriteCardActionCreators: clearFavoriteCard,
      updateBeersActionCreators: updateBeers
    },
    dispatch
  );
};

Cards.propTypes = {
  beers: PropTypes.array.isRequired,
  getOneBeerRequestActionCreators: PropTypes.func.isRequired,
  getRandomBeerRequestActionCreators: PropTypes.func.isRequired,
  getFavoriteCardActionCreators: PropTypes.func.isRequired,
  clearFavoriteCardActionCreators: PropTypes.func.isRequired,
  favoriteOrHom: PropTypes.bool.isRequired,
  favBeers: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
