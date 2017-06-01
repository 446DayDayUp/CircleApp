exports.get = (host, path, params) => {
  let esc = encodeURIComponent;
  let query = Object.keys(params)
      .map((k) => esc(k) + '=' + esc(params[k]))
      .join('&');
  return fetch(host + '/' + path + '?' + query);
};

exports.post = (host, path, params) => {
  return fetch(host + '/' + path, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(params)
  });
}