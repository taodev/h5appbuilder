import fetch from 'dva/fetch';
import reqwest from 'reqwest';
import { message } from 'antd';
import { loginInfo } from '../services/login';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}

export function westRequest(requestUrl, data) {
  reqwest({
    url: requestUrl,
    method: 'post',
    data: {
      ...data,
    },
    type: 'json',
    headers: {
      'X-H5APP-ACCOUNT': loginInfo.username,
      'X-H5APP-TOKEN': loginInfo.token,
    },
  }).then(response => ({ response }))
    .fail((err, msg) => {
      message.error(err, msg);
    });
}

export function westRequestForm(requestUrl, data) {
  reqwest({
    url: requestUrl,
    method: 'post',
    data: {
      ...data,
    },
  }).then(checkStatus)
    .then(parseJSON)
    .then(response => ({ response }))
    .catch(err => ({ err }));
}
