const DDB = require("../models/DDB");
const Stripe = require("../models/Stripe");
exports.makeClientPayment = async ctx => {
  try {
    const { name, contactId, email, token, amount, currency } =
      ctx.request.body;
    if (amount < 1) {
      return (ctx.body = {
        code: 400,
        msg: "Invalid amount",
        status: "Failed",
      });
    }
    let customer = await DDB.getStripeCustomerByContactId(contactId);

    const cardDetials = await Stripe.getCardDetials(token);

    const paymentReq = {
      amount: amount,
      currency,
      customer: customer.customerId ? customer.customerId : undefined,
      // payment_method: customer.cardId ? customer.cardId : cardDetials.id,
    };
    if (!Object.keys(customer).length) {
      console.log("===========================Called========================")
      const stripeCustomer = await Stripe.createStripeCustomer({
        name,
        source: token,
        email,
      });
      console.log(`\x1b[44m=========>\x1b[0m >> file: clientPayments.js >> line 33 >> stripeCustomer`, stripeCustomer)

      paymentReq.customer = stripeCustomer.id;
      paymentReq.payment_method = cardDetials.id;
      await DDB.createCustomer({
        name,
        contactId,
        email,
        customerId: stripeCustomer.id,
        cardFingerprint: cardDetials.card.fingerprint,
        lastFourDigit: cardDetials.card.last4,
        cardType: cardDetials.card.brand,
        cardId: cardDetials.card.id,
        cardToken: cardDetials.id,
        cardCountry: cardDetials.card.country,
        cardFunding: cardDetials.card.funding,
        cardExpYear: cardDetials.card.exp_year,
        cardExpMonth: cardDetials.card.exp_month,
        balance: 0,
      });
    } else {
      const customerCards = await Stripe.getCardsByCustomerId(
        customer.customerId,
      );

      const cardExists = customerCards.filter(
        card => card.fingerprint === cardDetials.card.fingerprint,
      );

      if (cardExists.length === 0) {
        const res = await Stripe.addCardToCustomer(customer.customerId, token);
        paymentReq.payment_method = cardDetials.id;
      } else {
        paymentReq.payment_method = customer.cardId;
      }
    }

    const res = await Stripe.createStripePaymentClient(paymentReq);
    ctx.body = {
      status: "ok",
      code: 200,
      data: res,
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

exports.getCustomer = async ctx => {
  try {
    const { contactId } = ctx.request.params;
    const customer = await DDB.getStripeCustomerByContactId(contactId);
    ctx.body = {
      status: "ok",
      code: 200,
      data: customer,
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
