import AWS from "aws-sdk";

async function getCategoryData() {
  AWS.config.update({
    region: "us-east-1",
    endpoint: "http://localhost:8000",
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: "Categories",
  };

  return docClient.scan(params).promise();
}

export default (context, inject) => {
  inject("getCategoryData", getCategoryData);
};
