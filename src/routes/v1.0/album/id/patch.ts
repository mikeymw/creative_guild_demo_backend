/*** /v1.0/album/:id ***/
// modify an album

import authenticator from "../../../../util/authenticator";
import compose from "koa-compose";
import { Error } from "mongoose";
// mongoose model
import Album from "../../../../components/Album/Album";
// typescript interface
import { BaseAlbum } from "../../../../components/Album/schema/Album";

const admin = [
    authenticator,
    async ctx => {
        const { id } = ctx.params;
        const { body } = ctx.request;
        const { _id, createdAt, updatedAt } = body;
        let target: BaseAlbum;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        try {
            // @ts-ignore
            target = await Album.retrieve(id);
        } catch (e) {
            ctx.throw(500);
            return;
        }

        // no partial update for images array, the client must send in an array containing all album images
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
        let target: BaseAlbum;

        if (_id || createdAt || updatedAt) {
            ctx.status = 401;
            return;
        }

        try {
            // @ts-ignore
            target = await Album.retrieve(id, user._id);
        } catch (e) {
            ctx.throw(500);
            return;
        }

        // no partial update for images array, the client must send in an array containing all album images
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