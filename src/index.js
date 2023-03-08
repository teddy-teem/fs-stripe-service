require("dotenv").config();
const variables = require("./variables");
const koa = require("koa");
const cors = require("koa2-cors");
const koaBody = require("koa-body");
const router = require("./routes");
const app = new koa();

app.use(koaBody());
app.use(cors({ origin: "*" }));
app.use(router.routes());

app.listen(variables.appPort, () => {
	 console.log(
		 `>>>>>>>>>Listening on ${variables.appHost}:${variables.appPort}, in ${variables.env}`
	 );
	 console.log(
		 `>>>>>>>>>Check response ( http://${variables.appHost}:${variables.appPort}/health )`
	 );
});