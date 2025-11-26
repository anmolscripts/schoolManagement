export type AccessPermission = {
  view: boolean;
  update: boolean;
  edit: boolean;
};

export type RoleType = {
  _id: string;
  role_id: string;
  school_id: string;
  role_name: string;
  role_type: string;
  remark?: string;
  access: Record<string, AccessPermission>;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
}


