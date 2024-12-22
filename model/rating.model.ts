import { Schema, model, models, Document, ObjectId } from "mongoose";

export interface Rating extends Document {
  rating: number;
  review: string;
  UserName: string;
  property: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const ratingSchema = new Schema<Rating>(
  {
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    UserName: { type: String, required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property" },
  },
  { timestamps: true }
);

export default models.Rating || model<Rating>("Rating", ratingSchema);
