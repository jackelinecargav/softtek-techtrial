const axios = require("axios");

const getAdd = async () => {

  const response = await axios.get(
    `https://swapi.py4e.com/api/`
  );
  const data = response.data;
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

const getFilms = async () => {

    const response = await axios.get(
      `https://swapi.py4e.com/api/films/1`
    );
    const data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
};

module.exports = {
  getAdd,
  getFilms,
};
