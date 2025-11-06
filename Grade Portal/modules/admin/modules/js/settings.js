class AdminSettings {
  constructor() {
    this.admins = [
      {
        id: 1,
        fullName: 'Admin User',
        email: 'admin@university.edu',
        role: 'super_admin',
        status: 'active',
        created: '2023-01-15'
      },
      {
        id: 2,
        fullName: 'John Smith',
        email: 'john.smith@university.edu',
        role: 'admin',
        status: 'active',
        created: '2023-03-20'
      },
      {
        id: 3,
        fullName: 'Sarah Johnson',
        email: 'sarah.johnson@university.edu',
        role: 'moderator',
        status: 'active',
        created: '2023-05-10'
      },
      {
        id: 4,
        fullName: 'Michael Brown',
        email: 'michael.brown@university.edu',
        role: 'admin',
        status: 'deleted',
        deletedAt: '2023-08-15',
        created: '2023-02-28'
      }
    ];
    
    this.currentTab = 'active';
    this.adminToDelete = null;
    this.adminToRestore = null;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.loadSavedPreferences();
    this.renderAdminList();
    console.log('Admin Settings initialized!');
  }

  bindEvents() {
    // Mobile menu functionality
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }
    
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
      // Check for saved theme preference or respect OS preference
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Set initial theme
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      }
      
      // Toggle theme
      themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
          document.documentElement.removeAttribute('data-theme');
          themeIcon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          themeIcon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'dark');
        }
      });
    }

    // Profile picture upload preview
    const profileUpload = document.getElementById('profileUpload');
    const profilePreview = document.getElementById('profilePreview');

    profileUpload.addEventListener('change', (e) => {
      this.handleProfilePictureUpload(e);
    });

    // Form submission handlers
    document.getElementById('profileForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.saveProfileSettings();
    });

    document.getElementById('preferencesForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.savePreferences();
    });

    document.getElementById('securityForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.updateSecuritySettings();
    });

    // Theme selection dropdown
    document.getElementById('theme').addEventListener('change', (e) => {
      this.handleThemeChange(e.target.value);
    });

    // Password strength indicator
    document.getElementById('newPassword').addEventListener('input', (e) => {
      this.checkPasswordStrength(e.target.value);
    });

    // Notification button
    document.querySelector('.notification-btn').addEventListener('click', () => {
      this.showNotifications();
    });
    
    // Quick search functionality
    const quickSearch = document.getElementById('quickSearch');
    if (quickSearch) {
      quickSearch.addEventListener('input', function(e) {
        // In a real app, this would search across settings
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm) {
          this.showAlert(`Searching for: ${searchTerm}`, 'info');
        }
      }.bind(this));
    }

    // Admin search functionality
    const adminSearch = document.getElementById('adminSearch');
    if (adminSearch) {
      adminSearch.addEventListener('input', (e) => {
        this.filterAdmins(e.target.value);
      });
    }

    // Admin list tabs
    document.querySelectorAll('.admin-list-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        this.switchAdminTab(e.target.getAttribute('data-tab'));
      });
    });

    // Add Admin Modal
    document.getElementById('addAdminBtn').addEventListener('click', () => {
      this.showAddAdminModal();
    });

    document.getElementById('closeAddAdminModal').addEventListener('click', () => {
      this.closeAddAdminModal();
    });

    document.getElementById('cancelAddAdmin').addEventListener('click', () => {
      this.closeAddAdminModal();
    });

    document.getElementById('addAdminForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.processAddAdmin();
    });

    // Delete Admin Modal
    document.getElementById('closeDeleteAdminModal').addEventListener('click', () => {
      this.closeDeleteAdminModal();
    });

    document.getElementById('cancelDeleteAdmin').addEventListener('click', () => {
      this.closeDeleteAdminModal();
    });

    document.getElementById('confirmDeleteAdmin').addEventListener('click', () => {
      this.confirmDeleteAdmin();
    });

    // Restore Admin Modal
    document.getElementById('closeRestoreAdminModal').addEventListener('click', () => {
      this.closeRestoreAdminModal();
    });

    document.getElementById('cancelRestoreAdmin').addEventListener('click', () => {
      this.closeRestoreAdminModal();
    });

    document.getElementById('confirmRestoreAdmin').addEventListener('click', () => {
      this.confirmRestoreAdmin();
    });

    // Close modals when clicking outside
    document.addEventListener('click', (e) => {
      if (e.target === document.getElementById('addAdminModal')) {
        this.closeAddAdminModal();
      }
      if (e.target === document.getElementById('deleteAdminModal')) {
        this.closeDeleteAdminModal();
      }
      if (e.target === document.getElementById('restoreAdminModal')) {
        this.closeRestoreAdminModal();
      }
    });
  }

  handleProfilePictureUpload(event) {
    const file = event.target.files[0];
    const profilePreview = document.getElementById('profilePreview');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        profilePreview.src = e.target.result;
        // In a real app, you would upload to server here
        localStorage.setItem('profilePicture', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfileSettings() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const mobile = document.getElementById('mobile').value;

    // Validate inputs
    if (!fullName || !email) {
      this.showAlert('Please fill in all required fields', 'error');
      return;
    }

    if (!this.validateEmail(email)) {
      this.showAlert('Please enter a valid email address', 'error');
      return;
    }

    // Save to localStorage (in real app, this would be an API call)
    localStorage.setItem('adminFullName', fullName);
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminMobile', mobile);

    this.showAlert('Profile settings saved successfully!', 'success');
  }

  savePreferences() {
    // Save notification preferences
    localStorage.setItem('desktopNotifications', document.getElementById('desktopNotifications').checked);

    this.showAlert('System preferences saved successfully!', 'success');
  }

  updateSecuritySettings() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords
    if (!currentPassword) {
      this.showAlert('Please enter your current password', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      this.showAlert('New passwords do not match!', 'error');
      return;
    }
    
    if (newPassword && newPassword.length < 8) {
      this.showAlert('Password must be at least 8 characters long!', 'error');
      return;
    }

    // Save security preferences
    localStorage.setItem('twoFactorAuth', document.getElementById('twoFactorAuth').checked);
    localStorage.setItem('loginAlerts', document.getElementById('loginAlerts').checked);

    // In a real app, you would make an API call to change the password
    if (newPassword) {
      // Simulate password change
      setTimeout(() => {
        this.showAlert('Security settings updated successfully!', 'success');
        document.getElementById('securityForm').reset();
      }, 1000);
    } else {
      this.showAlert('Security preferences updated successfully!', 'success');
    }
  }

  handleThemeChange(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.classList.replace('fa-moon', 'fa-sun');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
      localStorage.setItem('theme', 'light');
    } else {
      // Auto mode - follow system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
      }
      localStorage.setItem('theme', 'auto');
    }
  }

  checkPasswordStrength(password) {
    // Simple password strength check
    let strength = 0;
    const requirements = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password)
    };

    // Calculate strength
    if (requirements.length) strength += 20;
    if (requirements.lowercase) strength += 20;
    if (requirements.uppercase) strength += 20;
    if (requirements.numbers) strength += 20;
    if (requirements.special) strength += 20;

    // Update strength indicator
    const strengthBar = document.querySelector('.password-strength-bar');
    const strengthContainer = document.querySelector('.password-strength');
    
    if (strengthBar && strengthContainer) {
      strengthBar.style.width = `${strength}%`;
      
      // Remove all classes
      strengthContainer.className = 'password-strength';
      
      // Add appropriate class
      if (strength <= 40) {
        strengthContainer.classList.add('weak');
      } else if (strength <= 80) {
        strengthContainer.classList.add('medium');
      } else {
        strengthContainer.classList.add('strong');
      }
    }
  }

  loadSavedPreferences() {
    // Load profile data
    const savedFullName = localStorage.getItem('adminFullName');
    const savedEmail = localStorage.getItem('adminEmail');
    const savedMobile = localStorage.getItem('adminMobile');
    const savedProfilePic = localStorage.getItem('profilePicture');

    if (savedFullName) document.getElementById('fullName').value = savedFullName;
    if (savedEmail) document.getElementById('email').value = savedEmail;
    if (savedMobile) document.getElementById('mobile').value = savedMobile;
    if (savedProfilePic) document.getElementById('profilePreview').src = savedProfilePic;

    // Load notification preferences
    const desktopNotifications = localStorage.getItem('desktopNotifications');
    const twoFactorAuth = localStorage.getItem('twoFactorAuth');
    const loginAlerts = localStorage.getItem('loginAlerts');
    
    if (desktopNotifications !== null) {
      document.getElementById('desktopNotifications').checked = desktopNotifications === 'true';
    }
    if (twoFactorAuth !== null) {
      document.getElementById('twoFactorAuth').checked = twoFactorAuth === 'true';
    }
    if (loginAlerts !== null) {
      document.getElementById('loginAlerts').checked = loginAlerts === 'true';
    }
    
    // Load theme preference
    const theme = localStorage.getItem('theme');
    if (theme) document.getElementById('theme').value = theme;
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showNotifications() {
    this.showAlert('You have 3 new notifications', 'info');
  }

  // Admin Management Functions
  renderAdminList() {
    const adminList = document.getElementById('adminList');
    const filteredAdmins = this.admins.filter(admin => {
      const matchesTab = this.currentTab === 'active' ? admin.status === 'active' : admin.status === 'deleted';
      return matchesTab;
    });
    
    if (filteredAdmins.length === 0) {
      adminList.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-user-slash"></i>
          <p>No ${this.currentTab === 'active' ? 'active' : 'deleted'} admins found</p>
        </div>
      `;
      return;
    }
    
    adminList.innerHTML = filteredAdmins.map(admin => {
      const initials = admin.fullName.split(' ').map(name => name.charAt(0)).join('');
      const roleLabel = admin.role === 'super_admin' ? 'Super Admin' : 
                       admin.role === 'admin' ? 'Administrator' : 'Moderator';
      
      const statusClass = admin.status === 'active' ? 'status-active' : 
                         admin.status === 'inactive' ? 'status-inactive' : 'status-deleted';
      
      const statusText = admin.status === 'active' ? 'Active' : 
                        admin.status === 'inactive' ? 'Inactive' : 'Deleted';
      
      return `
        <div class="admin-item ${admin.status === 'deleted' ? 'deleted' : ''}">
          <div class="admin-info">
            <div class="admin-avatar-small">${initials}</div>
            <div class="admin-details">
              <div class="admin-name">${admin.fullName}</div>
              <div class="admin-email">${admin.email}</div>
              <div class="admin-role">${roleLabel}</div>
            </div>
          </div>
          <div class="admin-actions">
            <span class="status-badge ${statusClass}">${statusText}</span>
            ${this.currentTab === 'active' ? 
              `<button class="btn btn-danger btn-sm" data-id="${admin.id}" data-action="delete">
                <i class="fas fa-trash"></i> Delete
              </button>` : 
              `<button class="btn btn-success btn-sm" data-id="${admin.id}" data-action="restore">
                <i class="fas fa-undo"></i> Restore
              </button>`
            }
          </div>
        </div>
      `;
    }).join('');
    
    // Add event listeners to action buttons
    adminList.querySelectorAll('button[data-action="delete"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const adminId = parseInt(e.target.closest('button').getAttribute('data-id'));
        this.showDeleteAdminModal(adminId);
      });
    });
    
    adminList.querySelectorAll('button[data-action="restore"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const adminId = parseInt(e.target.closest('button').getAttribute('data-id'));
        this.showRestoreAdminModal(adminId);
      });
    });
  }

  filterAdmins(searchTerm) {
    const adminList = document.getElementById('adminList');
    const adminItems = adminList.querySelectorAll('.admin-item');
    
    adminItems.forEach(item => {
      const name = item.querySelector('.admin-name').textContent.toLowerCase();
      const email = item.querySelector('.admin-email').textContent.toLowerCase();
      
      if (name.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase())) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  switchAdminTab(tab) {
    this.currentTab = tab;
    
    // Update active tab
    document.querySelectorAll('.admin-list-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tab);
    });
    
    // Render appropriate list
    this.renderAdminList();
  }

  // Add Admin Modal Functions
  showAddAdminModal() {
    document.getElementById('addAdminModal').classList.add('active');
  }

  closeAddAdminModal() {
    document.getElementById('addAdminModal').classList.remove('active');
    document.getElementById('addAdminForm').reset();
  }

  processAddAdmin() {
    const fullName = document.getElementById('adminFullName').value;
    const email = document.getElementById('adminEmail').value;
    const role = document.getElementById('adminRole').value;

    // Validate inputs
    if (!fullName || !email || !role) {
      this.showAlert('Please fill in all required fields', 'error');
      return;
    }

    if (!this.validateEmail(email)) {
      this.showAlert('Please enter a valid email address', 'error');
      return;
    }

    // Create new admin object
    const newAdmin = {
      id: this.admins.length + 1,
      fullName,
      email,
      role,
      status: 'active',
      created: new Date().toISOString().split('T')[0]
    };

    // Add to admins array
    this.admins.push(newAdmin);

    // Show success message
    this.showAlert(`Admin ${fullName} added successfully! They will receive an email with login instructions.`, 'success');
    
    // Close modal and refresh admin list
    this.closeAddAdminModal();
    this.renderAdminList();
  }

  // Delete Admin Modal Functions
  showDeleteAdminModal(adminId) {
    this.adminToDelete = adminId;
    document.getElementById('deleteAdminModal').classList.add('active');
  }

  closeDeleteAdminModal() {
    this.adminToDelete = null;
    document.getElementById('deleteAdminModal').classList.remove('active');
  }

  confirmDeleteAdmin() {
    if (this.adminToDelete) {
      // Find admin and update status
      const adminIndex = this.admins.findIndex(admin => admin.id === this.adminToDelete);
      if (adminIndex !== -1) {
        this.admins[adminIndex].status = 'deleted';
        this.admins[adminIndex].deletedAt = new Date().toISOString().split('T')[0];
        
        this.showAlert('Admin has been deleted successfully', 'success');
        this.renderAdminList();
      }
      
      this.closeDeleteAdminModal();
    }
  }

  // Restore Admin Modal Functions
  showRestoreAdminModal(adminId) {
    this.adminToRestore = adminId;
    document.getElementById('restoreAdminModal').classList.add('active');
  }

  closeRestoreAdminModal() {
    this.adminToRestore = null;
    document.getElementById('restoreAdminModal').classList.remove('active');
  }

  confirmRestoreAdmin() {
    if (this.adminToRestore) {
      // Find admin and update status
      const adminIndex = this.admins.findIndex(admin => admin.id === this.adminToRestore);
      if (adminIndex !== -1) {
        this.admins[adminIndex].status = 'active';
        delete this.admins[adminIndex].deletedAt;
        
        this.showAlert('Admin has been restored successfully', 'success');
        this.renderAdminList();
      }
      
      this.closeRestoreAdminModal();
    }
  }

  // Alert system
  showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    const alertClass = {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info'
    }[type];
    
    const alertId = `alert-${Date.now()}`;
    const alertHtml = `
      <div class="alert ${alertClass}" id="${alertId}">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
        <div class="alert-content">
          <span>${message}</span>
          <button onclick="document.getElementById('${alertId}').remove()" class="alert-close">✕</button>
        </div>
      </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      const alert = document.getElementById(alertId);
      if (alert) alert.remove();
    }, 5000);
  }
}

// Initialize the settings page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  new AdminSettings();
});