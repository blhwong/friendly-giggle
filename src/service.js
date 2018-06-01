import axios from 'axios';

const post = async ({ url, data }) => {
  const response = await axios.post(url, data);
  if (response.status !== 200) {
    console.error(response);
  }
  console.log(response);
  return response.data;
};

export const connect = async (phoneNumber = '14696826913', email = 'b.lh.wong@gmail.com') => {
  const url = '/initiate';
  const data = {
    email,
    phoneNumber,
  };
  const json = await post({ url, data });
  console.log(json);
  return json.status;
};

export const getToken = () => {
  console.log(window.location);
  axios.get(`/connection${window.location.search}`)
    .then((response) => {
      console.log(response);
    });
};
