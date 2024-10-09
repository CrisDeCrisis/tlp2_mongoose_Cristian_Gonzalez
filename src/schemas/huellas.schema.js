import { Schema, model } from "mongoose";

const FingerprintSchema = new Schema({
    hash: {
        type: String,
        required: true
    },
    algorithm: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const FingerprintModel = model("Fingerprints", FingerprintSchema);