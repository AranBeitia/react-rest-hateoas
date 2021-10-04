import axios from "axios";

const getApi = (url) => {
  axios
    .get(url)
    .then((response) => {
      response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default getApi;
