const appPort = process.env.APP_PORT;
const appHost = process.env.APP_HOST || "localhost";
const env = process.env.APP_ENV;
const dbEndpoint = process.env.DYNAMO_ENDPOINT;
const awsRegion = process.env.AWS_REGION;
const stripeTable = process.env.STRIPE_TABLE;
const stripeAdapter = process.env.FS_STRIPE_ADAPTER;
const variables = {
  appPort,
  appHost,
  env,
  dbEndpoint,
  awsRegion,
  stripeTable,
  stripeAdapter
};

module.exports = variables;
