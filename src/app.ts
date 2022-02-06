import Koa from "koa";
const app = new Koa();

app.proxy = true;

import helmet from "koa-helmet";
import router from "./routes";

app
    .use(helmet())
    .use(router.routes())
    .use(router.allowedMethods());

app.on("error", (e) => {
    console.error(e);
});

export default app;
