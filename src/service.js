import axios from 'axios';

const get = async ({ url }) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    console.error(response);
  }
  console.log(response);
  return response.data;
};

const post = async ({ url, data }) => {
  const response = await axios.post(url, data);
  if (response.status !== 200) {
    console.error(response);
  }
  console.log(response);
  return response.data;
};

export const connect = async (phoneNumber, email) => {
  const url = `${process.env.REACT_APP_SERVER_BASE}/initiate`;
  const data = {
    email,
    phoneNumber,
  };
  const json = await post({ url, data });
  console.log(json);
  return json.status;
};

export const getToken = async () => {
  const url = `${process.env.REACT_APP_SERVER_BASE}/connection${window.location.search}`;
  const json = await get({ url });
  console.log(json);
  return json;
};
