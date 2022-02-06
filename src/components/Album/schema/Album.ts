import { Schema } from "mongoose";
import isLength from "validator/lib/isLength";

export interface BaseAlbum {
    _id: Schema.Types.ObjectId,
    user: Schema.Types.ObjectId, // the <user_id> of authentication service
    owner: Schema.Types.ObjectId, // the <profile_id>
    title: string,
    description: string,
    featured: boolean,
    cover: string, // album cover image
    images: string[],
    createdAt: Date,
    updatedAt: Date,
}

export const albumSchema = new Schema<BaseAlbum>({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        required: true,
        immutable: true, // if album ownership is transferable, do not set immutable at all
        index: true,
    },
    title: {
        type: String,
        required: true,
        validate: {
            validator: value => isLength(value, { max: 100 }),
        },
        index: true,
    },
    description: {
        type: String,
        validate: {
            validator: value => isLength(value, { max: 5000 }),
        },
    },
    featured: {
        type: Boolean,
        default: false,
        index: true,
    },
    cover: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: value => value.length,
        }
    },
}, { timestamps: true });

albumSchema.index({ createdAt: 1 });