// @ts-nocheck
import { Model, model, Schema } from "mongoose";
import { BaseAlbum, albumSchema } from "./schema/Album";

class Album extends Model {
    constructor(album) {
        super(album);
    };

    static async retrieve(albumId: string | Schema.Types.ObjectId, userId: string) {
        let target: BaseAlbum | null;

        try {
            target = await Album.findOne(albumId);
        } catch (e) {
            throw { status: 500 };
        }

        if (!target) {
            throw { status: 404 };
        }

        if (userId && userId !== target.user.toString()) {
            throw { status: 401 };
        }

        return target;
    }

    get info() {
        const {
            _id,
            user,
            owner,
            title,
            description,
            featured,
            cover,
            images,
            createdAt,
            updatedAt,
        } = this;

        return {
            _id,
            user,
            owner,
            title,
            description,
            featured,
            cover,
            images,
            createdAt,
            updatedAt,
        };
    }
}

export default model<BaseAlbum>(Album, albumSchema, "albums");