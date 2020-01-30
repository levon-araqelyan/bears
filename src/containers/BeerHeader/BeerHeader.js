import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import style from "./Header.module.css";
import { navigationService } from "../../services/navigationService";
import { getBeerRequest } from "../../store/action-creaters/beerActionCreators";
import { getFilterFavorite } from "../../store/action-creaters/favoriteFilterActionCreator";
import { debounceService } from "../../services/debounceService";
import { getInputLogic } from "../../store/action-creaters/inputLogicActionCreator";

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      whichInput: "The Beer Bank",
      value: "",
      page: 2
    };
  }

  handleKeyDown = ({ currentTarget: { value } }) => {
    this.handleDebouncedChangeOfInput(value);

    this.changeValue(value);
  };

  handleDebouncedChangeOfInput = debounceService(value => {
    const { getBeerRequestActionCreator, getInputLogicActionCreator } = this.props;

    getInputLogicActionCreator();

    if (value) {
      getBeerRequestActionCreator(value, 1);
    }
  }, 1000);

  handleKeyDownFavorite = ({ currentTarget: { value } }) => {
    const favorites = Object.values(JSON.parse(window.localStorage.getItem("favorite")) || {});
    const newFav = {};
    const { getFilterFavoriteActionCreator } = this.props;

    favorites.forEach(fav => {
      if (fav.name.indexOf(value) !== -1) {
        newFav[fav.id] = fav;
      }
    });

    getFilterFavoriteActionCreator(newFav);

    this.changeValue(value);
  };

  changeValue = value => {
    this.setState({ value, page: 2 });
  };

  favorite = () => {
    navigationService.navigate("favorite");
    this.setState({ whichInput: "Find Your Favorite Hear", value: "" });
  };

  debounceScrolling = debounceService(() => {
    const { hasData } = this.props;
    const bootom = document.documentElement.getBoundingClientRect().bottom;
    const height = document.documentElement.clientHeight;

    if (bootom < height + 500 && hasData) {
      const { getBeerRequestActionCreator } = this.props;
      const { value, page } = this.state;

      getBeerRequestActionCreator(value, page);
      this.setState({ page: page + 1 });
    }
  }, 300);

  componentDidMount() {
    window.addEventListener("scroll", this.debounceScrolling);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.debounceScrolling);
  }

  render() {
    const { whichInput, value } = this.state;
    const resultsFlag = window.location.pathname.includes("/home");

    return (
      <div className={style.header}>
        <div className={style.inp}>
          <h2>{whichInput}</h2>
          <input onChange={resultsFlag ? this.handleKeyDown : this.handleKeyDownFavorite} value={value} />
        </div>
        <div className={style.page}>
          <button className={style.link}>
            <a href="home" className={style.href}>
              HOME
            </a>
          </button>
          <button onClick={this.favorite} className={style.link} type="button">
            <span>FAVORITE</span>
          </button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  getBeerRequestActionCreator: PropTypes.func,
  hasData: PropTypes.bool.isRequired,
  getInputLogicActionCreator: PropTypes.func.isRequired,
  getFilterFavoriteActionCreator: PropTypes.func.isRequired
};

Header.defaultProps = {
  getBeerRequestActionCreator: () => {}
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBeerRequestActionCreator: getBeerRequest,
      getInputLogicActionCreator: getInputLogic,
      getFilterFavoriteActionCreator: getFilterFavorite
    },
    dispatch
  );

const mapStateToProps = state => ({
  hasData: state.beerReducer.hasData
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
