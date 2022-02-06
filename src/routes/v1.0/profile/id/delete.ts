/*** /v1.0/profile/:id ***/
// delete a profile

import authenticator from "../../../../util/authenticator";
import compose from "koa-compose";
// mongoose model
import Profile from "../../../../components/Profile/Profile";

const admin = [
    authenticator,
    async ctx => {
        const { id: _id } = ctx.params;

        try {
            await Profile.deleteOne({ _id });
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
            await Profile.retrieve(id, user._id);
            await Profile.deleteOne({ _id: id });
        } catch ({ status }) {
            ctx.throw(status ?? 500);
            return;
        }

        ctx.status = 204;
    }
]

export default compose(admin.concat(user));

