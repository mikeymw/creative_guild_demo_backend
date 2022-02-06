/*** /v1.0/profile ***/
// get profiles
// route query params:
// user=<user_id>, name=<string>, phone=<number>, email=<string>,
// start=<number>, count=<number>, order=<string>

import compose from "koa-compose";
// mongoose model
import Profile from "../../../components/Profile/Profile";
// typescript interface
import { BaseProfile } from "../../../components/Profile/schema/Profile";

const visitor = [
    async ctx => {
        const { start, count, order } = ctx.query;
        const keys = ["user", "name", "phone", "email"];
        const query: Record<string, any> = {};
        let skip = parseInt(start);
        let limit = parseInt(count);
        let countDocFn;
        let targets: (BaseProfile | Record<string, any>)[];
        let total: number;

        for (const key in ctx.query) {
            if (keys.includes(key)) {
                query[key] = ctx.query[key];
            }
        }

        countDocFn = Object.keys(query).length ? Profile.countDocuments(query) : Profile.estimatedDocumentCount();

        if (!skip) {
            skip = 0;
        }

        if (!limit || limit > 20) {
            limit = 20;
        }

        try {
            const responses = await Promise.all([
                Profile.find(query).skip(skip).limit(limit).sort({ name: order === "desc" ? -1 : 1 }),
                countDocFn,
            ]);

            targets = responses[0];
            total = responses[1];
        } catch (e) {
            console.log(e);
            ctx.throw(500);
            return;
        }

        // mongoose's find methods returns an empty array if no document is matched
        if (targets.length) {
            // @ts-ignore
            targets = targets.map(profile => profile.info);
        }

        ctx.status = 200;
        ctx.type = "application/json";
        ctx.body = { targets, total };
    }
]

export default compose(visitor);