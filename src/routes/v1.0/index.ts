import Router from "@koa/router";
const router = new Router();

import profile from "./profile";
/*** /v1.0/profile ***/
router.use(
    "/profile",
    profile.routes(),
    profile.allowedMethods(),
);


import album from "./album";
/*** /v1.0/album ***/
router.use(
    "/album",
    album.routes(),
    album.allowedMethods(),
)

export default router;