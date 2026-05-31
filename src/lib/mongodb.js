import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    const error = new Error(
      "Please define MONGODB_URI in .env.local or Vercel environment variables"
    );
    error.code = "MONGODB_URI_MISSING";
    throw error;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      dbName: process.env.MONGODB_DB || "sss-recruitments",
      serverSelectionTimeoutMS: 10000,
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}

export function getDatabaseErrorResponse(error) {
  if (error?.code === "MONGODB_URI_MISSING") {
    return {
      status: 500,
      message:
        "Database is not configured. Add MONGODB_URI in Vercel Production environment variables and redeploy.",
    };
  }

  if (
    error?.code === 8000 ||
    error?.message?.toLowerCase().includes("authentication failed")
  ) {
    return {
      status: 500,
      message: "Database authentication failed. Check username/password in MONGODB_URI.",
    };
  }

  if (
    error?.name === "MongoServerSelectionError" ||
    error?.name === "MongooseServerSelectionError" ||
    error?.name === "MongoNetworkError"
  ) {
    return {
      status: 503,
      message:
        "Database connection failed. Check MongoDB Atlas Network Access and allow Vercel connections.",
    };
  }

  if (error?.name === "ValidationError") {
    return {
      status: 400,
      message: "Submitted data is invalid. Please check the form details.",
    };
  }

  return {
    status: 500,
    message: "Something went wrong while saving the enquiry.",
  };
}
