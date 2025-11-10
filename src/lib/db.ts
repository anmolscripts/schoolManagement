import mongoose from "mongoose";

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI!;
  if (!uri) throw new Error("❌ MONGODB_URI not found in .env");

  try {
    const conn = await mongoose.connect(uri, { dbName: "school_management" });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}