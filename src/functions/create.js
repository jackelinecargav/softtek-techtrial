const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const newJedi = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const {
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    sable_laser,
  } = JSON.parse(event.body);
  const id = v4();
  const fechaCreacion = Date.now();


  console.log("Id creado: ", id);

  const newJedi = {
    id,
    fechaCreacion,
    nombre,
    altura,
    peso,
    color_cabello,
    color_piel,
    color_ojos,
    año_nacimiento,
    genero,
    sable_laser,
  };

  await dynamodb
    .put({
      TableName: "StarWars",
      Item: newJedi,
    })
    .promise();

  return {
    codigoStatus: 200,
    mensaje: "¡Que la fuerza te acompañe!",
    data: newJedi,
  };
};

module.exports = {
  newJedi,
};
