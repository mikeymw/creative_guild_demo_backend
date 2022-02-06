/*** /v1.0/profile/:id ***/
// get a profile

import compose from "koa-compose";
// mongoose model
import Profile from "../../../../components/Profile/Profile";
// typescript interface
import { BaseProfile } from "../../../../components/Profile/schema/Profile";

const visitor = [
    async ctx => {
        const { id } = ctx.params;
        let target: BaseProfile;

        try {
            // @ts-ignore
            target = await Profile.retrieve(id);
        } catch (e) {
            ctx.throw(500);
            return;
        }

        ctx.status = 200;
        ctx.type = "application/json";
        // @ts-ignore
        ctx.body = target.info;
    }
]

export default compose(visitor);