import { RANDOMBEER, RANDOMBEERSUCCESS } from "../actions/randomBeer";

export function getRandomBeerRequest() {
  return { type: RANDOMBEER, payload: {} };
}

export function getRandomBeerRequestSucceed(randomBeer) {
  return { type: RANDOMBEERSUCCESS, payload: { randomBeer } };
}
