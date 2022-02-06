// @ts-nocheck
import { Model, model, Schema } from "mongoose";
import { BaseProfile, profileSchema } from "./schema/Profile";

class Profile extends Model {
    constructor(profile) {
        super(profile);
    };

    static async retrieve(profileId: string | Schema.Types.ObjectId, userId: string) {
        let target: BaseProfile | null;

        try {
            target = await Profile.findOne(profileId);
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
            name,
            phone,
            email,
            biography,
            avatar,
            createdAt,
            updatedAt,
        } = this;

        return {
            _id,
            user,
            name,
            phone,
            email,
            biography,
            avatar,
            createdAt,
            updatedAt,
        };
    }
}

export default model<BaseProfile>(Profile, profileSchema, "profiles");