import { Schema, model, models, Document } from "mongoose";
import { auditFields } from "@/lib/mongoose-plugins/audit";

export interface IStudent extends Document {
  school_id: string;
  name: string;
  class: string;
  roll_no: number;
  created_at: Date;
  updated_at: Date;
}

const studentSchema = new Schema<IStudent>({
  school_id: { type: String, required: true },
  name: String,
  class: String,
  roll_no: Number,
});

auditFields(studentSchema);

export default models.Student || model<IStudent>("Student", studentSchema);
