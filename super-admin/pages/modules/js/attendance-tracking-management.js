// Sample data for admins
const admins = [
  {
    id: 0,
    name: "Juan Dela Cruz",
    email: "juan.dela.cruz@university.edu",
    mobile: "+63 912 345 6789",
    role: "Super Admin",
    profilePic: "https://via.placeholder.com/120"
  },
  {
    id: 1,
    name: "Maria Santos",
    email: "maria.santos@university.edu",
    mobile: "+63 917 890 1234",
    role: "Moderator",
    profilePic: "https://via.placeholder.com/120"
  },
  {
    id: 2,
    name: "Robert Lim",
    email: "robert.lim@university.edu",
    mobile: "+63 918 567 4321",
    role: "Viewer",
    profilePic: "https://via.placeholder.com/120"
  }
];

// Sample data for teachers
const teachers = [
  {
    id: 0,
    name: "Dr. Ana Reyes",
    email: "ana.reyes@university.edu",
    mobile: "+63 912 345 6789",
    username: "anareyes",
    department: "BS Information Technology",
    status: "Active",
    profilePic: "https://via.placeholder.com/120"
  },
  {
    id: 1,
    name: "Prof. Carlos Garcia",
    email: "carlos.garcia@university.edu",
    mobile: "+63 917 890 1234",
    username: "carlosgarcia",
    department: "BS Tourism Management",
    status: "Active",
    profilePic: "https://via.placeholder.com/120"
  },
  {
    id: 2,
    name: "Dr. Sofia Martinez",
    email: "sofia.martinez@university.edu",
    mobile: "+63 918 567 4321",
    username: "sofiamartinez",
    department: "BS Business Administration",
    status: "Inactive",
    profilePic: "https://via.placeholder.com/120"
  }
];

// Modal management
const ModalManager = {
  // Open modal
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('show');
    }
  },
  
  // Close modal
  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('show');
    }
  },
  
  // Initialize modal event listeners
  init: function() {
    // Admin modal close buttons
    document.getElementById('closeAdminModal').addEventListener('click', () => {
      this.closeModal('editModal');
    });
    
    document.getElementById('cancelAdminEdit').addEventListener('click', () => {
      this.closeModal('editModal');
    });
    
    // Teacher modal close buttons
    document.getElementById('closeTeacherModal').addEventListener('click', () => {
      this.closeModal('editTeacherModal');
    });
    
    document.getElementById('cancelTeacherEdit').addEventListener('click', () => {
      this.closeModal('editTeacherModal');
    });
    
    // Delete modal close buttons
    document.getElementById('closeDeleteModal').addEventListener('click', () => {
      this.closeModal('deleteModal');
    });
    
    document.getElementById('cancelDelete').addEventListener('click', () => {
      this.closeModal('deleteModal');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
      const adminModal = document.getElementById('editModal');
      const teacherModal = document.getElementById('editTeacherModal');
      const deleteModal = document.getElementById('deleteModal');
      
      if (event.target === adminModal) {
        this.closeModal('editModal');
      }
      if (event.target === teacherModal) {
        this.closeModal('editTeacherModal');
      }
      if (event.target === deleteModal) {
        this.closeModal('deleteModal');
      }
    });
  }
};

// Admin management functions
const AdminManager = {
  // Edit admin
  edit: function(id) {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;
    
    // Populate the form with admin data
    document.getElementById('editId').value = admin.id;
    document.getElementById('editName').value = admin.name;
    document.getElementById('editEmail').value = admin.email;
    document.getElementById('editMobile').value = admin.mobile;
    document.getElementById('editRole').value = admin.role;
    document.getElementById('editProfilePreview').src = admin.profilePic;
    
    // Open the modal
    ModalManager.openModal('editModal');
  },
  
  // Delete admin
  delete: function(id) {
    const admin = admins.find(a => a.id === id);
    if (!admin) return;
    
    // Set delete message
    document.getElementById('deleteMessage').textContent = 
      `Are you sure you want to delete the admin account for ${admin.name}?`;
    
    // Set confirm delete handler
    document.getElementById('confirmDelete').onclick = () => {
      this.confirmDelete(id);
    };
    
    // Open delete modal
    ModalManager.openModal('deleteModal');
  },
  
  // Confirm delete
  confirmDelete: function(id) {
    // In a real application, you would send a delete request to the server
    showAlert('Admin deleted successfully!', 'success');
    ModalManager.closeModal('deleteModal');
  },
  
  // Initialize event listeners
  init: function() {
    // Edit form submission
    document.getElementById('editForm').addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real application, you would send this data to a server
      const adminId = document.getElementById('editId').value;
      showAlert('Admin information updated successfully!', 'success');
      ModalManager.closeModal('editModal');
    });
    
    // Profile picture preview for admin edit form
    const editProfilePic = document.getElementById('editProfilePic');
    const editProfilePreview = document.getElementById('editProfilePreview');
    
    if (editProfilePic && editProfilePreview) {
      editProfilePic.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            editProfilePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    // Add event listeners to admin edit/delete buttons
    document.querySelectorAll('.edit-btn[data-type="admin"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-id'));
        this.edit(id);
      });
    });
    
    document.querySelectorAll('.delete-btn[data-type="admin"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-id'));
        this.delete(id);
      });
    });
  }
};

// Teacher management functions
const TeacherManager = {
  // Edit teacher
  edit: function(id) {
    const teacher = teachers.find(t => t.id === id);
    if (!teacher) return;
    
    // Populate the form with teacher data
    document.getElementById('editTeacherId').value = teacher.id;
    document.getElementById('editTeacherName').value = teacher.name;
    document.getElementById('editTeacherEmail').value = teacher.email;
    document.getElementById('editTeacherMobile').value = teacher.mobile;
    document.getElementById('editTeacherUsername').value = teacher.username;
    document.getElementById('editTeacherDepartment').value = teacher.department;
    document.getElementById('editTeacherStatus').value = teacher.status;
    document.getElementById('editTeacherProfilePreview').src = teacher.profilePic;
    
    // Open the modal
    ModalManager.openModal('editTeacherModal');
  },
  
  // Delete teacher
  delete: function(id) {
    const teacher = teachers.find(t => t.id === id);
    if (!teacher) return;
    
    // Set delete message
    document.getElementById('deleteMessage').textContent = 
      `Are you sure you want to delete the teacher account for ${teacher.name}?`;
    
    // Set confirm delete handler
    document.getElementById('confirmDelete').onclick = () => {
      this.confirmDelete(id);
    };
    
    // Open delete modal
    ModalManager.openModal('deleteModal');
  },
  
  // Confirm delete
  confirmDelete: function(id) {
    // In a real application, you would send a delete request to the server
    showAlert('Teacher deleted successfully!', 'success');
    ModalManager.closeModal('deleteModal');
  },
  
  // Initialize event listeners
  init: function() {
    // Edit form submission
    document.getElementById('editTeacherForm').addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real application, you would send this data to a server
      const teacherId = document.getElementById('editTeacherId').value;
      showAlert('Teacher information updated successfully!', 'success');
      ModalManager.closeModal('editTeacherModal');
    });
    
    // Profile picture preview for teacher edit form
    const editTeacherProfilePic = document.getElementById('editTeacherProfilePic');
    const editTeacherProfilePreview = document.getElementById('editTeacherProfilePreview');
    
    if (editTeacherProfilePic && editTeacherProfilePreview) {
      editTeacherProfilePic.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            editTeacherProfilePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    // Add event listeners to teacher edit/delete buttons
    document.querySelectorAll('.edit-btn[data-type="teacher"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-id'));
        this.edit(id);
      });
    });
    
    document.querySelectorAll('.delete-btn[data-type="teacher"]').forEach(button => {
      button.addEventListener('click', () => {
        const id = parseInt(button.getAttribute('data-id'));
        this.delete(id);
      });
    });
  }
};

// Form handling functions
const FormManager = {
  // Initialize form event listeners
  init: function() {
    // Admin form submission
    const adminForm = document.getElementById('adminForm');
    if (adminForm) {
      adminForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send this data to a server
        showAlert('Admin account created successfully!', 'success');
        adminForm.reset();
      });
    }
    
    // Teacher form submission
    const teacherForm = document.getElementById('teacherForm');
    if (teacherForm) {
      teacherForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real application, you would send this data to a server
        showAlert('Teacher account created successfully!', 'success');
        teacherForm.reset();
      });
    }
    
    // Profile picture preview for admin form
    const profilePic = document.getElementById('profilePic');
    const profilePreview = document.getElementById('profilePreview');
    
    if (profilePic && profilePreview) {
      profilePic.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            profilePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
    
    // Profile picture preview for teacher form
    const teacherProfilePic = document.getElementById('teacherProfilePic');
    const teacherProfilePreview = document.getElementById('teacherProfilePreview');
    
    if (teacherProfilePic && teacherProfilePreview) {
      teacherProfilePic.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            teacherProfilePreview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }
};

// Alert function
function showAlert(message, type) {
  const alertContainer = document.getElementById('alertContainer');
  const alert = document.createElement('div');
  alert.className = `alert alert-${type}`;
  alert.innerHTML = `
    <div class="alert-icon">
      <i class="${type === 'success' ? 'fas fa-check-circle' : 
                 type === 'error' ? 'fas fa-times-circle' : 
                 type === 'warning' ? 'fas fa-exclamation-triangle' : 
                 'fas fa-info-circle'}"></i>
    </div>
    <div class="alert-content">
      <div class="alert-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
      <div class="alert-message">${message}</div>
    </div>
    <button class="alert-close">
      <i class="fas fa-times"></i>
    </button>
    <div class="alert-progress"></div>
  `;
  alertContainer.appendChild(alert);
  
  // Add show class after a small delay
  setTimeout(() => {
    alert.classList.add('show');
  }, 10);
  
  // Close button functionality
  alert.querySelector('.alert-close').addEventListener('click', () => {
    alert.classList.remove('show');
    setTimeout(() => {
      if (alert.parentElement) {
        alert.remove();
      }
    }, 400);
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alert.parentElement) {
      alert.classList.remove('show');
      setTimeout(() => {
        if (alert.parentElement) {
          alert.remove();
        }
      }, 400);
    }
  }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  if (typeof Utils !== 'undefined' && Utils.setCurrentDate) {
    Utils.setCurrentDate();
  }
  
  // Initialize theme manager
  if (typeof ThemeManager !== 'undefined') {
    new ThemeManager();
  }
  
  // Initialize sidebar manager
  if (typeof SidebarManager !== 'undefined') {
    new SidebarManager();
  }
  
  // Initialize modal manager
  ModalManager.init();
  
  // Initialize admin manager
  AdminManager.init();
  
  // Initialize teacher manager
  TeacherManager.init();
  
  // Initialize form manager
  FormManager.init();
  
  console.log('User Management system initialized!');
});