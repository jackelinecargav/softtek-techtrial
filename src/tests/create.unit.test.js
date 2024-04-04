const { newJedi } = require("../functions/create");
const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");

describe("newJedi", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("new add Jedi", async () => {
    const fakeEventData = {
      body: JSON.stringify({
        nombre: "Darth Vader",
        altura: 2.03,
        peso: 136,
        color_cabello: "sin cabello",
        color_piel: "blanco",
        color_ojos: "amarillo",
        año_nacimiento: "41.9 BBY",
        genero: "masculino",
        sable_laser: "rojo",
      }),
    };

    awsMock.mock("DynamoDB.DocumentClient", "put", (params, callback) => {
      callback(null, {});
    });

    const response = await newJedi(fakeEventData);

    expect(response.codigoStatus).toBe(200);
    expect(response.mensaje).toBe("¡Que la fuerza te acompañe!");
    expect(response.data).toEqual({
      id: expect.any(String),
      fechaCreacion: expect.any(Number),
      ...JSON.parse(fakeEventData.body),
    });
  });
});
