import { Schema, model } from "mongoose";

const EmployeeSchema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    credentials: {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        fingerprint: {
            type: Squema.Types.ObjectId,
            ref: "Fingerprints",
            required: true
        }
    },
    birthdate: { type: Date, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true }
});

export const EmployeeModel = model("Employees", EmployeeSchema);