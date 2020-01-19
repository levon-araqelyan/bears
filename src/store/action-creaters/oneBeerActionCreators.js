import { ONEBEER, ONEBEERSUCCESS } from "../actions/oneBeer";

export function getOneBeerRequest(id) {
  return { type: ONEBEER, payload: { id } };
}

export function getOneBeerRequestSucceed(beer) {
  return { type: ONEBEERSUCCESS, payload: { beer } };
}
