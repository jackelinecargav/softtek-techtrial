const AWS = require('aws-sdk');
const axios = require("axios");

const getRandomNumber = () => Math.floor(Math.random() * 9) + 1;

const getTranslate = async (event) => {
  const randomId = getRandomNumber();

  try {
    const response = await axios.get(
      `https://swapi.py4e.com/api/people/1`
    );
    const data = response.data;

    const translate = new AWS.Translate();

    const mapping = {
      name: "nombre",
      height: "altura",
      mass: "masa",
      hair_color: "color_cabello",
      skin_color: "color_piel",
      eye_color: "color_ojos",
      birth_year: "año_nacimiento",
      gender: "genero",
      homeworld: "planeta_natal",
      films: "peliculas",
      species: "especies",
      vehicles: "vehiculos",
      starships: "naves_estelares",
      created: "creado",
      edited: "editado",
      url: "enlace",
    };

    const translatedData = {};
    for (const clave in data) {
      try {
        let translatedKey = mapping.hasOwnProperty(clave) ? mapping[clave] : clave;

        const params = {
          SourceLanguageCode: 'auto',
          TargetLanguageCode: 'es',
          Text: data[clave],
        };
        const translationResponse = await translate.translateText(params).promise();
        translatedData[translatedKey] = translationResponse.TranslatedText;
      } catch (error) {
        console.error("Error al traducir:", error);
        translatedData[clave] = data[clave];
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(translatedData),
    };
  } catch (error) {
    console.error("Error al obtener datos de la API de Star Wars:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al obtener datos de la API de Star Wars" }),
    };
  }
};

module.exports = {
  getTranslate,
};
