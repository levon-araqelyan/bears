import { FAVORITEFILTER } from "../actions/favoriteFilter";

export function getFilterFavorite(favArray) {
  return { type: FAVORITEFILTER, payload: { favArray } };
}
