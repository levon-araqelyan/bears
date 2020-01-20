import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { request } from "../services/requestService";
import { getBeerRequestSucceed } from "../store/action-creaters/beerActionCreators";
import { BEERACTION } from "../store/actions/beerActions";
import { getOneBeerRequestSucceed } from "../store/action-creaters/oneBeerActionCreators";
import { ONEBEER } from "../store/actions/oneBeer";
import { getRandomBeerRequestSucceed } from "../store/action-creaters/randomBeerActionCreator";
import { RANDOMBEER } from "../store/actions/randomBeer";

export function* getBeers({ payload }) {
  try {
    const { name, page } = payload;
    const { data } = yield call(request, "GET", `https://api.punkapi.com/v2/beers?beer_name=${name}&page=${page}&per_page=10`, {});

    yield put(getBeerRequestSucceed(data));
  } catch (error) {
    console.log(error);
  }
}

function* getSingleBeer(action) {
  try {
    const { id } = action.payload;
    const { data } = yield call(request, "GET", `https://api.punkapi.com/v2/beers/${id}`, {});
    yield put(getOneBeerRequestSucceed(data));
  } catch (e) {
    console.log(e);
  }
}
function* getRandomBeer() {
  try {
    const { data } = yield call(request, "GET", `https://api.punkapi.com/v2/beers/random`, {});
    yield put(getRandomBeerRequestSucceed(data));
  } catch (e) {
    console.log(e);
  }
}

export function* beersSagas() {
  yield all([takeLatest(BEERACTION, getBeers), takeLatest(ONEBEER, getSingleBeer), takeEvery(RANDOMBEER, getRandomBeer)]);
}
