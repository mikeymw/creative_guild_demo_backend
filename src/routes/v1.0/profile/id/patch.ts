/*** /v1.0/profile/:id ***/
// modify a profile

import authenticator from "../../../../util/authenticator";
import compose from "koa-compose";
import { Error } from "mongoose";
// mongoose model
import Profile from "../../../../components/Profile/Profile";
// typescript interface
import { BaseProfile } from "../../../../components/Profile/schema/Profile";

const admin = [
    authenticator,
    async ctx => {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const { _id, createdAt, updatedAt } = body;
        let target: BaseProfile;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        try {
            // @ts-ignore
            target = await Profile.retrieve(id);
        } catch (e) {
            ctx.throw(500);
            return;
        }

        for (const prop in body) {
            target[prop] = body[prop];
        }
        
        try {
            // @ts-ignore
            target = target.save();
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
        const { id } = ctx.params;
        const { user } = ctx.state;
        const { body } = ctx.request;
        const { _id, createdAt, updatedAt } = body;
        let target: BaseProfile;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        try {
            // @ts-ignore
            target = await Profile.retrieve(id, user._id);
        } catch (e) {
            ctx.throw(500);
            return;
        }

        for (const prop in body) {
            target[prop] = body[prop];
        }

        try {
            // @ts-ignore
            target = target.save();
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