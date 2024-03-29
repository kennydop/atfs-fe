const baseUrl = "http://localhost:5000";

const get = async (url) => {
  const response = await fetch(`${baseUrl}${url}`, {
    credentials: "include",
  });
  const data = await response.json();
  data.success = data.success ?? response.ok;
  return data;
};

const post = async (url, body) => {
  const response = await fetch(`${baseUrl}${url}`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  data.success = data.success ?? response.ok;
  return data;
};

const patch = async (url, body) => {
  const response = await fetch(`${baseUrl}${url}`, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  data.success = data.success ?? response.ok;

  return data;
};

const requests = {
  get,
  post,
  patch,
};

export default requests;
