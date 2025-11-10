// src/lib/mongoose-plugins/audit.ts
import { Schema } from "mongoose";

export function auditFields(schema: Schema) {
  // Add fields
  schema.add({
  school_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: String, default: null },
  updated_at: { type: Date, default: Date.now },
  updated_by: { type: String, default: null },
});

  // Set timestamps on create
  schema.pre("save", function (next) {
    if (this.isNew) {
      this.created_at = new Date();
    }
    this.updated_at = new Date();
    next();
  });

  // Set timestamps on update operations
  schema.pre(["updateOne", "findOneAndUpdate"], function (next) {
    this.set({ updated_at: new Date() });
    next();
  });
}