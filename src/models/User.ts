import { Schema, model, models, Document } from "mongoose";
import { auditFields } from "@/lib/mongoose-plugins/audit";

export interface IUser extends Document {
  school_id: string;
  name: string;
  username: string;
  password: string;
  role: "admin" | "teacher" | "staff" | "student";
  prifile: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

const userSchema = new Schema<IUser>({
  school_id: { type: String, required: true },
  name: String,
  username: { type: String, unique: true },
  password: String,
  prifile: String,
  role: { type: String, enum: ["admin", "teacher", "staff", "student"] },
  
});

auditFields(userSchema);

export default models.User || model<IUser>("User", userSchema);
