/*

* url:http://localhost:5000
* method: Get
* use: Get method WITHOUT AUTHENTICATION BEARER

*/

function Get(url, body) {
  const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, requestOptions).then(handleResponse);
}

/*

* url:http://localhost:5000
* method: Post
* use: Post method WITHOUT AUTHENTICATION BEARER

*/

function Post(url, body) {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return fetch(url, requestOptions).then(handleResponse);
}

/*

* url:http://localhost:5000
* method: POST_AUTH
* use: POST_AUTH method WITH  AUTHENTICATION BEARER 

*/

function POST_AUTH(url, body) {
  const loginparse = sessionStorage.getItem("login");
  const login = JSON.parse(loginparse);
  const authToken = login !== null && login.accessToken;
  console.log("authentication api", authToken && authToken);

  if (authToken && login == null) {
    window.location.reload();
  } else {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return fetch(url, requestOptions).then(handleResponse);
  }
}

/*

* url:http://localhost:5000
* method: GET_AUTH
* use: GET_AUTH method WITH  AUTHENTICATION BEARER 

*/

function GET_AUTH(url, body) {
  const loginparse = sessionStorage.getItem("login");
  const login = JSON.parse(loginparse);
  const authToken = login !== null && login.accessToken;
  if (authToken && login == null) {
    window.location.reload();
  } else {
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    return fetch(url, requestOptions).then(handleResponse);
  }
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      var error;
      error = data;
      return Promise.reject(error);
    }
    return data;
  });
}

export const api = {
  Get,
  Post,
  POST_AUTH,
  GET_AUTH,
};
