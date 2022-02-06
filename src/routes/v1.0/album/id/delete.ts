/*** /v1.0/album/:id ***/
// delete an album

import authenticator from "../../../../util/authenticator";
import compose from "koa-compose";
// mongoose model
import Album from "../../../../components/Album/Album";

const admin = [
    authenticator,
    async ctx => {
        const { id: _id } = ctx.params;

        try {
            await Album.deleteOne({ _id });
        } catch (e) {
            ctx.throw(500);
            return;
        }

        ctx.status = 204;
    }
]

const user = [
    authenticator,
    async ctx => {
        const { id } = ctx.params;
        const { user } = ctx.state;

        try {
            // @ts-ignore
            await Album.retrieve(id, user._id);
            await Album.deleteOne({ _id: id });
        } catch ({ status }) {
            ctx.throw(status ?? 500);
            return;
        }

        ctx.status = 204;
    }
]

export default compose(admin.concat(user));