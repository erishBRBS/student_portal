class AuthModel {
  constructor(data) {
    this.id = data.id;
    this.full_name = data.full_name;
    this.email = data.email;
    this.mobile_number = data.mobile_number;
    this.image_path = data.image_path;
    this.username = data.username;
    this.user_role_id = data.user_role_id;
    this.user_permission_id = data.user_permission_id;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    // Nested models
    this.role = data.role ? new Role(data.role) : null;
    this.permission = data.permission ? new Permission(data.permission) : null;
  }
}

class Role {
  constructor(data) {
    this.id = data.id;
    this.roleName = data.role_name;
    this.isDeleted = data.is_deleted;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}

class Permission {
  constructor(data) {
    this.id = data.id;
    this.permissionName = data.permission_name;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
