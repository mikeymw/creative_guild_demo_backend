import Router from "@koa/router";
const router = new Router();

import v1_0 from "./v1.0";

router.use(
    "/v1.0",
    v1_0.routes(),
    v1_0.allowedMethods(),
);

export default router;