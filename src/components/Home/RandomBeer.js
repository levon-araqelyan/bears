import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import style from "./Cards.module.css";

function RandomBeer({ random }) {
  return (
    <div className={style.grid}>
      {random.map(ran => (
        <div className={style.randomCard} key={ran.name}>
          <img className={style.randomImg} src={ran.image_url} alt="randomImg" />
          <p>{ran.name}</p>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = state => ({
  random: state.beerReducer.random
});

RandomBeer.propTypes = {
  random: PropTypes.array.isRequired
};

export default connect(mapStateToProps, null)(RandomBeer);
