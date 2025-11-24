import { Schema, model, models, Document } from "mongoose";
import { auditFields } from "@/lib/mongoose-plugins/audit";

export interface ISideMenu extends Document {
  school_id: string;
  sideMenu_id: string;
  name: string;
  url?: string;
  parent_id?: string;
  logo?: string;
  created_at: Date;
  updated_at: Date;
  created_by?: string;
  updated_by?: string;
}

const sideMenuSchema = new Schema<ISideMenu>({
  school_id: { type: String, required: true },  // 🔥 REQUIRED
  sideMenu_id: { type: String, required: true }, // Optional but recommended
  name: { type: String, required: true },
  url: String,
  parent_id: String,
  logo: String,
});

// add audit fields
auditFields(sideMenuSchema);

export default models.SideMenu || model<ISideMenu>("SideMenu", sideMenuSchema);
