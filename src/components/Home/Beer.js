import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import style from "./Cards.module.css";
import { getBoolianForSinglePage } from "../../store/action-creaters/closePageActionCreator";
import RandomBeer from "./RandomBeer";

class Cards extends React.Component {
  closeOnePage = () => {
    const { getBoolianForSinglePageActionCreator } = this.props;

    getBoolianForSinglePageActionCreator();
  };

  render() {
    const { beer } = this.props;
    return (
      <div className={style.singlBeer}>
        <div className={style.beerInfo}>
          <div>
            <button className={style.but} onClick={this.closeOnePage} type="button">
              X
            </button>
          </div>
          <div>
            <img className={style.oneImg} src={beer[0].image_url} alt="oneImg" />
            <div className={style.text}>
              <h2 className={style.name}>{beer[0].name}</h2>
              <p>{beer[0].tagline}</p>
              <p className={style.spa}>
                <span>
                  <b> IBU:</b>
                  {beer[0].ibu}
                </span>
                <span>
                  <b>ABV:</b>
                  {beer[0].abv}
                </span>
                <span>
                  <b>EBC:</b>
                  {beer[0].ebc}
                </span>
              </p>
              <p>{beer[0].description}</p>
              <div>
                <h3 className={style.h}>
                  <b>Best served with:</b>
                </h3>
                <ul>
                  {beer[0].food_pairing.map(ing => (
                    <li key={ing}>{ing}</li>
                  ))}
                </ul>
              </div>
            </div>
            <RandomBeer />
          </div>
        </div>
      </div>
    );
  }
}

Cards.propTypes = {
  getBoolianForSinglePageActionCreator: PropTypes.func.isRequired,
  beer: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  beer: state.beerReducer.beer
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      getBoolianForSinglePageActionCreator: getBoolianForSinglePage
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Cards);
