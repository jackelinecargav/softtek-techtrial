const { getJedis } = require("../functions/get");
const AWS = require("aws-sdk");
const awsMock = require("aws-sdk-mock");

describe("getJedis", () => {
  afterEach(() => {
    awsMock.restore("DynamoDB.DocumentClient");
  });

  it("return jedis", async () => {
    const testData = {
      Items: [
        {
          nombre: "Jackeline Cardenas",
          peso: 75,
          color_cabello: "red",
          altura: 1.60,
          color_piel: "brunette",
          sable_laser: "red",
          id: "8h79poe9-8237-6253-bjf4-00ec191857f6",
          color_ojos: "brown",
          fechaCreacion: 1236548523697,
          año_nacimiento: 1998,
          genero: "female"
        }
      ]
    };

    awsMock.mock("DynamoDB.DocumentClient", "scan", (params, callback) => {
      callback(null, testData);
    });

    const event = {};
    const response = await getJedis(event);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ persons: testData.Items });
  });
});
