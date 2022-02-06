import { Schema } from "mongoose";
import isPhoneNumber from "validator/lib/isMobilePhone";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

export interface BaseProfile {
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId,
    name: string,
    phone: string,
    email: string,
    biography: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
}

export const profileSchema = new Schema<BaseProfile>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: value => isLength(value, { max: 100 }),
        },
        index: true,
    },
    phone: {
        type: String,
        validate: {
            validator: value => isPhoneNumber(value),
        },
        index: true,
    },
    email: {
        type: String,
        validate: {
            validator: value => isEmail(value),
        },
        index: true,
    },
    biography: {
        type: String,
        validate: {
            validator: value => isLength(value, { max: 5000 }),
        },
    },
    avatar: {
        type: String,
    }
}, { timestamps: true });