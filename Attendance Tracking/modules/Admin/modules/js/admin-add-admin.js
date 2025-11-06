/**
 * Admin Add Admin Management
 * Handles adding and managing admin accounts with API integration
 */
class AdminAddAdmin {
    constructor() {
        this.API_BASE_URL = 'http://localhost:3000/api/admin';
        this.init();
    }

    init() {
        this.bindEvents();
        console.log('Admin Add Admin initialized with API integration!');
    }

    bindEvents() {
        // Profile picture upload preview
        const profilePic = document.getElementById('profilePic');
        const profilePreview = document.getElementById('profilePreview');

        profilePic.addEventListener('change', (e) => {
            this.handleProfilePictureUpload(e);
        });

        // Edit profile picture preview
        const editProfilePic = document.getElementById('editProfilePic');
        const editProfilePreview = document.getElementById('editProfilePreview');

        editProfilePic.addEventListener('change', (e) => {
            this.handleEditProfilePictureUpload(e);
        });

        // Form submission handlers
        document.getElementById('adminForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.createAdminAccount();
        });

        document.getElementById('editForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateAdminAccount();
        });

        // Notification button
        document.querySelector('.notification-btn').addEventListener('click', () => {
            this.showNotifications();
        });
    }

    handleProfilePictureUpload(event) {
        const file = event.target.files[0];
        const profilePreview = document.getElementById('profilePreview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    handleEditProfilePictureUpload(event) {
        const file = event.target.files[0];
        const editProfilePreview = document.getElementById('editProfilePreview');
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                editProfilePreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    async createAdminAccount() {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const role = document.getElementById('role').value;
        const profilePic = document.getElementById('profilePreview').src;

        // Validate inputs
        if (!fullName || !email || !username || !password || !role) {
            this.showAlert('Please fill in all required fields', 'error');
            return;
        }

        if (password.length < 8) {
            this.showAlert('Password must be at least 8 characters long!', 'error');
            return;
        }

        if (!this.validateEmail(email)) {
            this.showAlert('Please enter a valid email address', 'error');
            return;
        }

        try {
            // Show loading state
            const submitBtn = document.querySelector('#adminForm button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
            submitBtn.disabled = true;

            // Prepare data for API
            const adminData = {
                fullName,
                email,
                mobile,
                username,
                password,
                role,
                profilePic
            };

            // API call to create admin
            const response = await fetch(`${this.API_BASE_URL}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adminData)
            });

            const result = await response.json();

            if (result.success) {
                this.showAlert('Admin account created successfully!', 'success');
                document.getElementById('adminForm').reset();
                document.getElementById('profilePreview').src = 'https://via.placeholder.com/120';
                
                // Refresh admin list (for future implementation)
                // await this.loadAdmins();
            } else {
                this.showAlert(result.message || 'Failed to create admin account', 'error');
            }

        } catch (error) {
            console.error('Error creating admin:', error);
            this.showAlert('Network error: Could not connect to server', 'error');
        } finally {
            // Restore button state
            const submitBtn = document.querySelector('#adminForm button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Create Admin Account';
            submitBtn.disabled = false;
        }
    }

    async updateAdminAccount() {
        // This will be implemented when we work on the update functionality
        this.showAlert('Admin account updated successfully!', 'success');
        this.closeModal();
    }

    async loadAdmins() {
        try {
            const response = await fetch(this.API_BASE_URL);
            const result = await response.json();
            
            if (result.success) {
                // This will populate the admin table when we implement the list functionality
                console.log('Admins loaded:', result.data);
            }
        } catch (error) {
            console.error('Error loading admins:', error);
        }
    }

    editAdmin(index) {
        document.getElementById('editModal').classList.add('active');
        // In a real application, you would populate the form with data from the admin
    }

    deleteAdmin(index) {
        this.showAlert('Are you sure you want to delete this admin account?', 'warning', 0, true);
    }

    closeModal() {
        document.getElementById('editModal').classList.remove('active');
    }

    confirmDelete() {
        this.showAlert('Admin account deleted successfully!', 'success');
        // Close any open confirmation alerts
        document.querySelectorAll('.alert').forEach(alert => {
            if (alert.querySelector('.alert-actions')) {
                this.removeAlert(alert.id);
            }
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showNotifications() {
        this.showAlert('You have 3 new notifications', 'info');
    }

    // Modern Alert System (keep your existing alert system)
    showAlert(message, type = 'info', duration = 5000, showConfirm = false) {
        const alertContainer = document.getElementById('alertContainer');
        if (!alertContainer) {
            console.warn('Alert container not found');
            return null;
        }
        
        const alertId = 'alert-' + Date.now();
        
        // Alert type configurations
        const alertConfig = {
            success: {
                icon: 'fas fa-check-circle',
                title: 'Success',
                class: 'alert-success'
            },
            info: {
                icon: 'fas fa-info-circle',
                title: 'Information',
                class: 'alert-info'
            },
            warning: {
                icon: 'fas fa-exclamation-triangle',
                title: 'Warning',
                class: 'alert-warning'
            },
            error: {
                icon: 'fas fa-times-circle',
                title: 'Error',
                class: 'alert-error'
            }
        };
        
        const config = alertConfig[type] || alertConfig.info;
        
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${config.class}`;
        alertElement.id = alertId;
        
        let alertContent = `
            <div class="alert-icon">
                <i class="${config.icon}"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">${config.title}</div>
                <div class="alert-message">${message}</div>
            </div>
            <button class="alert-close" onclick="this.closest('.alert').remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        if (showConfirm) {
            alertContent += `
                <div class="alert-actions">
                    <button class="btn btn-danger btn-sm" onclick="adminAddAdmin.confirmDelete()">Confirm</button>
                    <button class="btn btn-secondary btn-sm" onclick="this.closest('.alert').remove()">Cancel</button>
                </div>
            `;
        } else {
            alertContent += `<div class="alert-progress"></div>`;
        }
        
        alertElement.innerHTML = alertContent;
        
        alertContainer.appendChild(alertElement);
        
        // Animate in
        setTimeout(() => {
            alertElement.classList.add('show');
        }, 10);
        
        // Auto remove after duration (only if not a confirmation alert)
        if (duration > 0 && !showConfirm) {
            setTimeout(() => {
                this.removeAlert(alertId);
            }, duration);
        }
        
        return alertId;
    }
    
    removeAlert(alertId) {
        const alertElement = document.getElementById(alertId);
        if (alertElement) {
            alertElement.classList.remove('show');
            alertElement.classList.add('hide');
            
            setTimeout(() => {
                if (alertElement.parentNode) {
                    alertElement.parentNode.removeChild(alertElement);
                }
            }, 400);
        }
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.AdminAddAdmin = AdminAddAdmin;
    window.adminAddAdmin = new AdminAddAdmin();
}

// Global functions for onclick handlers
function editAdmin(index) {
    if (typeof adminAddAdmin !== 'undefined') {
        adminAddAdmin.editAdmin(index);
    }
}

function deleteAdmin(index) {
    if (typeof adminAddAdmin !== 'undefined') {
        adminAddAdmin.deleteAdmin(index);
    }
}

function closeModal() {
    if (typeof adminAddAdmin !== 'undefined') {
        adminAddAdmin.closeModal();
    }
}