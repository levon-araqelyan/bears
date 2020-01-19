import { BEERACTIONSUCCESS } from "../actions/beerActions";
import { INPUTLOGIC } from "../actions/inputLogic";
import { ONEBEERSUCCESS } from "../actions/oneBeer";
import { CLOSEONEPAGE } from "../actions/closePage";
import { RANDOMBEERSUCCESS } from "../actions/randomBeer";
import { CLEARFAVORITE, FAVORITE } from "../actions/favorite";
import { UPDATEBEERSPAGE, UPDATEFAVORITE } from "../actions/updateBeersPage";
import { FAVORITEFILTER } from "../actions/favoriteFilter";

const initialState = {
  beers: [],
  beer: [],
  random: [],
  hasData: true,
  favorite: {},
  showBeer: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case BEERACTIONSUCCESS: {
      const tempState = { ...state };
      tempState.beers = [...tempState.beers];
      tempState.hasData = !!payload.beers.length;

      tempState.beers.push(...payload.beers);

      return tempState;
    }
    case ONEBEERSUCCESS: {
      const tempState = { ...state };

      tempState.beer = [...payload.beer];
      tempState.showBeer = true;

      return tempState;
    }
    case FAVORITE: {
      const tempState = { ...state };

      tempState.beers = [...tempState.beers];
      tempState.favorite = { ...tempState.favorite };
      tempState.favorite[payload.fav.id] = payload.fav;

      return tempState;
    }
    case UPDATEBEERSPAGE: {
      const tempState = { ...state };
      tempState.favorite = { ...payload.obj };

      return tempState;
    }
    case UPDATEFAVORITE: {
      const tempState = { ...state };

      tempState.favorite = { ...payload.obj };

      return tempState;
    }
    case CLEARFAVORITE: {
      const tempState = { ...state };

      tempState.favorite = { ...tempState.favorite };
      delete tempState.favorite[payload.fav.id];

      return tempState;
    }
    case RANDOMBEERSUCCESS: {
      const tempState = { ...state };
      tempState.random = [...tempState.random];
      tempState.random.push(...payload.randomBeer);

      return tempState;
    }
    case CLOSEONEPAGE: {
      const tempState = { ...state };
      tempState.showBeer = false;
      tempState.random = [...tempState.random];
      tempState.random = [];

      return tempState;
    }
    case INPUTLOGIC: {
      const tempState = { ...state };

      tempState.beers = [];
      tempState.true = true;

      return tempState;
    }
    case FAVORITEFILTER: {
      const tempState = { ...state };

      tempState.favorite = { ...tempState.favorite };
      tempState.favorite = { ...payload.favArray };

      return tempState;
    }
    default:
      return state;
  }
};
