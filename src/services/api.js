import axios from "axios";

const API_SERVER_URL = process.env.REACT_APP_API_URL;

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  const url = API_SERVER_URL + path;
  return new Promise((resolve, reject) => {
    return axios[method](url, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}
