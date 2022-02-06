/*** /v1.0/album ***/
// created a new album

import authenticator from "../../../util/authenticator";
import compose from "koa-compose";
import { Error } from "mongoose";
// mongoose model
import Album from "../../../components/Album/Album";
import Profile from "../../../components/Profile/Profile";
// typescript interface
import { BaseAlbum } from "../../../components/Album/schema/Album";

const admin = [
    authenticator,
    async ctx => {
        const { body } = ctx.request;
        const { _id, createdAt, updatedAt } = body;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        let target: BaseAlbum = new Album(body);

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
        const { _id, createdAt, updatedAt, owner } = body;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        if (!owner) {
            ctx.status = 400;
            return;
        }

        try {
            // @ts-ignore
            await Profile.retrieve(owner, user._id);  // verify the owner which is the <profile_id>
        } catch (e) {
            ctx.throw(e);
            return;
        }

        let target: BaseAlbum = new Album(body);
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