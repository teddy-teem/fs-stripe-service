const router = require("koa-router");
const healthController = require("./controllers/healthController");
const clientController = require("./controllers/clientPayments");
const directPaymentController = require("./controllers/directPayments");
const webhook = require("./controllers/webhook");
const routes = new router();
routes
  .get("/health", healthController.health)
  .post("/client-payment", clientController.makeClientPayment)
  .post("/webhook", webhook.processWebhook)
  .get("/customer/:contactId", clientController.getCustomer)
  .post("/direct-payment", directPaymentController.directPayment);
module.exports = routes;
