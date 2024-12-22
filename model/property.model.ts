import { Amenities } from "@/types/Amenities";
import {
  Commercial,
  Condition,
  Plot,
  Purpose,
  Residential,
  Unit,
} from "@/types/property";
import { Schema, model, Document, models } from "mongoose";

export interface Property extends Document {
  purpose: Purpose;
  propertyType: Residential | Commercial | Plot;
  address: {
    city: string;
    area: string;
  };
  street: string;
  size: {
    value: number;
    unit: Unit;
  };
  bedrooms: number;
  bathrooms: number;
  PropertyName: string;
  slug: string;
  condition: Condition;
  price: number;
  amenities?: Array<Amenities>;
  description?: string;
  images: string[];
  FacebookVideoLink?: string;
  isFeatured?: boolean;
  discount?: number;
  createdAt?: Date; // Auto-generated for tracking
  updatedAt?: Date;
}

const propertySchema = new Schema<Property>({
  purpose: { type: String, required: true },
  propertyType: { type: String, required: true },
  address: {
    city: { type: String, required: true },
    area: { type: String, required: true },
  },
  street: { type: String, required: true },
  size: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  bedrooms: {
    type: Number, // Store all values as strings
    required: true,
  },
  bathrooms: {
    type: Number, // Store all values as strings
    required: true,
  },
  PropertyName: { type: String, required: true }, //
  slug: { type: String, required: true },
  condition: { type: String, required: true }, //
  price: { type: Number, required: [true, "Price is required"], default: 0 },
  amenities: [
    {
      id: { type: String },
      name: { type: String },
      count: { type: Number },
      isToggle: { type: Boolean },
      icon: { type: String },
    },
  ], //
  description: { type: String }, //
  images: [{ type: String }], //
  FacebookVideoLink: { type: String, default: "" },
  isFeatured: { type: Boolean, default: false }, //
  discount: {
    type: Number,
    default: 0, // Default to 0 if no discount is provided
    min: 0, // Optional: Minimum discount value
  }, //
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

propertySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Property = models.Property || model<Property>("Property", propertySchema);

export default Property;
