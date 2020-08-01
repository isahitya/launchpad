import AWS from "aws-sdk";

async function getCategories() {
  AWS.config.update({
    region: "us-east-1",
    endpoint: "dynamodb.us-east-1.amazonaws.com",
    accessKeyId: "AKIAWNLQSS4NOMJEMUXBFL",
    secretAccessKey: "CSuzpo8Wmh5UYZXdE8eQtAejeMjeCYDw1Sq4VPHL",
  });

  var docClient = new AWS.DynamoDB.DocumentClient();

  var params = {
    TableName: "Categories",
  };

  return docClient.scan(params).promise();
}

export default (context, inject) => {
  inject("getCategories", getCategories);
};
