import Router from "@koa/router";
const router = new Router();

import get from "./get";
router.get("/", get);

import patch from "./patch";
router.patch("/", patch);

import del from "./delete";
router.delete("/", del);

export default router;