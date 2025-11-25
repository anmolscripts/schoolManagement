import { Schema, model, models, Document } from "mongoose";
import { auditFields } from "@/lib/mongoose-plugins/audit";

export interface IRole extends Document {
  role_id: string;
  school_id: string;
  role_name: string;
  remark?: string;
  access: Record<string, { view: boolean; update: boolean; edit: boolean }>;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

const roleSchema = new Schema<IRole>({
  role_id: { type: String, unique: true },
  school_id: { type: String, required: true },
  role_name: { type: String, required: true, unique: true },
  remark: { type: String },
  access: { type: Object, default: {} },
});

auditFields(roleSchema);

export default models.Role || model<IRole>("Role", roleSchema);
