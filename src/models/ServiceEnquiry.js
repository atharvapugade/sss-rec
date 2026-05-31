import mongoose from "mongoose";

const ServiceEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    countryCode: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    method: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    requirement: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Pending", "Closed"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.ServiceEnquiry ||
  mongoose.model("ServiceEnquiry", ServiceEnquirySchema);
