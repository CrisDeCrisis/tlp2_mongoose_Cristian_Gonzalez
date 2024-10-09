import { Schema, model } from "mongoose";

const SaleSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employees",
        required: true
    },
    description: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Products",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    date: { type: Date, default: Date.now },
    total: { type: Number, required: true }
});

export const SaleModel = model("Sales", SaleSchema);