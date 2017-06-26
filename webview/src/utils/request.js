import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(`${response.status} (${response.statusText})`);
  error.response = response;
  throw error;
}

function makeFormValues(data) {
  const formData = new FormData();
  for (const i in data) {
    if (Object.prototype.hasOwnProperty.call(data, i)) {
      formData.append(i, data[i]);
    }
  }

  return formData;
}

export async function post(url, data) {
  const formData = makeFormValues(data);

  return fetch(url, {
    method: 'POST',
    body: formData,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(resp => (resp))
    .catch(error => ({ Code: -1, Message: error.message }));
}
