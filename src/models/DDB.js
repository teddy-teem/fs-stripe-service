const AWS = require("aws-sdk");
const variables = require("../variables");
AWS.config.update({
  region: variables.awsRegion,
  endpoint: "http://localhost:8001",
});
const docClient = new AWS.DynamoDB.DocumentClient();
exports.getStripeCustomerByContactId = async contactId => {
  const params = {
    TableName: variables.stripeTable,
    Key: { contactId },
  };
  const data = await docClient
    .get(params)
    .promise()
    .then(res => res);
  // .catch(err => console.log(err));
  return data.Item || {};
};

exports.createCustomer = async data => {
  const params = {
    TableName: variables.stripeTable,
    Item: data,
  };
  const res = await docClient
    .put(params)
    .promise()
    .then(res => res);
  // .catch(err => console.log(err));
  return res;
};

exports.getStripeCustomerByCustomerId = async customerId => {
  const params = {
    TableName: variables.stripeTable,
  };
  const customer = await docClient.scan(params).promise();
  console.log("🚀 ~ file: DDB.js ~ line 43 ~ customer", customer);
  return customer.Items.filter(item => item.customerId === customerId)[0] || {};
};

exports.updateBalanceByContactId = async (contactId, newBalance) => {
  const params = {
    TableName: variables.stripeTable,
    Key: { contactId },
    UpdateExpression: "Set balance = :newBalance",
    ExpressionAttributeValues: {
      ":newBalance": newBalance,
    },
  };
  return docClient.update(params).promise();
};
