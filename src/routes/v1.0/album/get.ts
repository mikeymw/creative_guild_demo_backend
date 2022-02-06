/*** /v1.0/album ***/
// get albums
// route query params:
// owner=<string>, title=<number>, featured=<boolean>,
// start=<number>, count=<number>, sort=<string>, order=<string>

import compose from "koa-compose";
// mongoose model
import Album from "../../../components/Album/Album";
// typescript interface
import { BaseAlbum } from "../../../components/Album/schema/Album";

const visitor = [
    async ctx => {
        const { owner, start, count, sort, order } = ctx.query;
        const keys = ["title", "featured"];
        const query: Record<string, any> = { owner };
        const sortQuery = { [keys.includes(sort) ? sort : "title"]: order === "desc" ? -1 : 1 };
        let skip = parseInt(start);
        let limit = parseInt(count);
        let targets: (BaseAlbum | Record<string, any>)[];
        let total: number;

        for (const key in ctx.query) {
            if (keys.includes(key)) {
                query[key] = ctx.query[key];
            }
        }

        if (!skip) {
            skip = 0;
        }

        if (!limit || limit > 20) {
            limit = 20;
        }

        try {
            const responses = await Promise.all([
                Album.find(query).skip(skip).limit(limit).sort(sortQuery),
                Album.countDocuments(query),
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