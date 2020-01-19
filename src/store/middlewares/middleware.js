import { call, all } from "redux-saga/effects";
import { beersSagas } from "../../Saga/beersSaga";

export default function* middleware() {
  yield all([call(beersSagas)]);
}
