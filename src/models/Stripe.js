const axios = require("axios").default;
const variables = require("../variables");
exports.createStripeCustomer = async data => {
  console.log(
    `\x1b[44m=========>\x1b[0m >> file: Stripe.js >> line 4 >> data`,
    data,
  );
  return axios
    .post(`${variables.stripeAdapter}/create-customer`, data)
    .then(res => res.data.data)
    .catch(e => e.response);
};

exports.createStripePaymentClient = async data => {
  return axios
    .post(`${variables.stripeAdapter}/create-intent/client`, data)
    .then(res => res.data.data)
    .catch(e => e.response);
};
exports.createStripePaymentDirect = async data => {
  return axios
    .post(`${variables.stripeAdapter}/create-intent/direct`, data)
    .then(res => res.data.data)
    .catch(e => e.response);
};

exports.getCardsByCustomerId = async id => {
  return axios
    .get(`${variables.stripeAdapter}/customer/card-details/${id}`)
    .then(res => res.data.data.data)
    .catch(e => e.response);
};

exports.getCardDetials = async id => {
  return axios
    .get(`${variables.stripeAdapter}/card-details/${id}`)
    .then(res => res.data.data)
    .catch(e => e.response);
};

exports.addCardToCustomer = async (id, source) => {
  return axios
    .post(`${variables.stripeAdapter}/add-card/${id}`, { source })
    .then(res => res.data.data)
    .catch(e => e.response);
};
