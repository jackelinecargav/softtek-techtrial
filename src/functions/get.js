const AWS = require("aws-sdk");

const getJedis = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const result = await dynamodb.scan({ TableName: "StarWars" }).promise();

  const persons = result.Items;

  return {
    status: 200,
    body: {
      persons,
    },
  };
};

module.exports = {
  getJedis,
};