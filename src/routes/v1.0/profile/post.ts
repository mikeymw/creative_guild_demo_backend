/*** /v1.0/profile ***/
// created a new profile

import authenticator from "../../../util/authenticator";
import compose from "koa-compose";
import { Error } from "mongoose";
// mongoose model
import Profile from "../../../components/Profile/Profile";
// typescript interface
import { BaseProfile } from "../../../components/Profile/schema/Profile";

const admin = [
    authenticator,
    async ctx => {
        const { body } = ctx.request;
        const { _id, createdAt, updatedAt } = body;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        let target: BaseProfile = new Profile(body);

        try {
            // @ts-ignore
            target = await target.save();
        } catch (e) {
            console.log(e);

            if (e instanceof Error.ValidationError) {
                ctx.status = 400;
            } else {
                ctx.throw(500);
            }

            return;
        }

        ctx.status = 201;
        ctx.type = "application/json";
        // @ts-ignore
        ctx.body = target.info;
    }
]

const user = [
    authenticator,
    async ctx => {
        const { body } = ctx.request;
        const { user } = ctx.state;
        const { _id, createdAt, updatedAt } = body;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        let target: BaseProfile = new Profile(body);
        target.user = user._id;

        try {
            // @ts-ignore
            target = await target.save();
        } catch (e) {
            console.log(e);

            if (e instanceof Error.ValidationError) {
                ctx.status = 400;
            } else {
                ctx.throw(500);
            }

            return;
        }

        ctx.status = 201;
        ctx.type = "application/json";
        // @ts-ignore
        ctx.body = target.info;
    }
]

export default compose(admin.concat(user));