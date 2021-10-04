import axios from "axios";

const createRequest = (path, id) => {
  const URL = `https://rickandmortyapi.com/api${path}/${id}`;

  axios.get(URL);
};

export default createRequest;
