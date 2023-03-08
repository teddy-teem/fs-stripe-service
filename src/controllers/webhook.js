const DDB = require("../models/DDB");
exports.processWebhook = async ctx => {
  try {
    const { type, data } = ctx.request.body;
    console.log("🚀 ~ file: webhook.js ~ line 5 ~ data", data);
    console.log("🚀 ~ file: webhook.js ~ line 5 ~ type", type);
    switch (type) {
      case "payment_intent.succeeded":
        console.log("payment_intent.succeeded");
        break;
      case "charge.succeeded":
        const { amount, customer: customerId } = data.object;

        const customer = await DDB.getStripeCustomerByCustomerId(customerId);
        //Updating customer balance
        if (customer) {
          await DDB.updateBalanceByContactId(
            customer.contactId,
            Number(amount) / 100 + Number(customer.balance)
          );
        }
        break;
      default:
        console.log("Default Case");
    }
    ctx.body = {
      status: "ok",
      code: 200,
      message: "success",
    };
  } catch (error) {
    ctx.body = {
      status: "ok",
      code: 200,
      message: "success",
    };
  }
};
