import { CLEARFAVORITE, FAVORITE } from "../actions/favorite";

export function getFavoriteCard(fav) {
  return { type: FAVORITE, payload: { fav } };
}

export function clearFavoriteCard(fav) {
  return { type: CLEARFAVORITE, payload: { fav } };
}
