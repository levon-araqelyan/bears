import axios from "axios";

export function request(method, url, data) {
  return axios({
    method,
    url,
    data
  });
}
