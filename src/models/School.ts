import { Schema, model, models, Document } from "mongoose";
import { auditFields } from "@/lib/mongoose-plugins/audit";

export interface ISchool extends Document {
  school_id: string;
  name: string;
  address?: string;
  phone?: string;
  logo?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

const schoolSchema = new Schema<ISchool>({
  name: { type: String, required: true },
  address: String,
  phone: String,
    logo: String,
});

auditFields(schoolSchema);

export default models.School || model<ISchool>("School", schoolSchema);