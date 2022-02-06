import Router from "@koa/router";
const router = new Router();

import id from "./id";
/*** /v1.0/profile/:id ***/
router.use(
    "/:id",
    id.routes(),
    id.allowedMethods()
);

import get from "./get";
router.get("/", get);

import post from "./post";
router.post("/", post);

export default router;