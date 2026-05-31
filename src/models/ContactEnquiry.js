import mongoose from "mongoose";

const ContactEnquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
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

export default mongoose.models.ContactEnquiry ||
  mongoose.model("ContactEnquiry", ContactEnquirySchema);
