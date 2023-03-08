const DDB = require("../models/DDB");
const Stripe = require("../models/Stripe");
exports.directPayment = async ctx => {
  try {
    const { contactId, amount, currency } = ctx.request.body;

    const customer = await DDB.getStripeCustomerByContactId(contactId);

    const payment = await Stripe.createStripePaymentDirect({
      customer: customer.customerId,
      amount: amount * 100,
      currency,
      paymentType: "direct",
      peymentMethod: customer.cardId,
    });

    ctx.body = {
      status: "ok",
      code: 200,
      data: payment,
      message: "success",
    };
  } catch (error) {
    ctx.body = {
      status: "Error",
      code: 500,
      error,
    };
  }
};
