export class StudentAuth {
  constructor(data) {
    this.id = data.id;
    this.full_name = data.full_name;
    this.email = data.email;
    this.mobile_number = data.mobile_number;
    this.username = data.username;
    this.user_role = "Student"; // simple string
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    // Optional: dummy permission object to avoid errors
    this.permission = {
      id: 1,
      permissionName: "student_basic_access",
      createdAt: new Date(),
      updatedAt: new Date()
    };
  }
}


