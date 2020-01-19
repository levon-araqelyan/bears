import { BEERACTION, BEERACTIONSUCCESS } from "../actions/beerActions";

export function getBeerRequest(name, page) {
  return { type: BEERACTION, payload: { name, page } };
}

export function getBeerRequestSucceed(beers) {
  return { type: BEERACTIONSUCCESS, payload: { beers } };
}
