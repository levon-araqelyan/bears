import { UPDATEBEERSPAGE, UPDATEFAVORITE } from "../actions/updateBeersPage";

export function updateBeers(obj) {
  return { type: UPDATEBEERSPAGE, payload: { obj } };
}

export function updateFavorite(obj) {
  return { type: UPDATEFAVORITE, payload: { obj } };
}
