/*** /v1.0/album/:id ***/
// get an album

import compose from "koa-compose";
// mongoose model
import Album from "../../../../components/Album/Album";
// typescript interface
import { BaseAlbum } from "../../../../components/Album/schema/Album";

const visitor = [
    async ctx => {
        const { id } = ctx.params;
        let target: BaseAlbum;

        try {
            // @ts-ignore
            target = await Album.retrieve(id);
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