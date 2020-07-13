function get(url, headers, cb) {
  fetch(url, {
    method: 'GET',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log('HTTP GET Response:: ', response);
      cb(null, response);
    })
    .catch((error) => {
      console.log('upload error', error);
      cb(error, null);
    });
}

function post(url, headers, payload, cb) {
  fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => {
      // console.log('HTTP POST Response:: ', response);
      cb(null, response);
    })
    .catch((error) => {
      // console.log("upload error", error);
      cb(error, null);
    });
}

module.exports = {
  get,
  post,
};
