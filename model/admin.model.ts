// models/admin.ts
import { Schema, model, models } from "mongoose";

const adminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default models.Admin || model("Admin", adminSchema);
