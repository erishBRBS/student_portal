// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.token = null;
        this.user = null;
        this.userRoleName = null;
        this.init();
    }

    init() {
        this.loadAuthData(); // 🔹 Load token & user first
        this.bindEvents();
        console.log('Admin Dashboard initialized!');
        
        // Show welcome alert if logged in
        if (this.user) {
            AlertManager.info(`Welcome ${this.user.first_name || 'Admin'}! System is running smoothly.`);
        } else {
            AlertManager.info('Welcome to Admin Dashboard! System is running smoothly.');
        }

        // Optional: Fetch dashboard data using token
        this.fetchDashboardData();
    }

    // 🔹 Retrieve saved token & user from localStorage
    loadAuthData() {
        this.token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('currentUser');
        this.user = userData ? JSON.parse(userData) : null;
        this.userRoleName = localStorage.getItem('userRoleName');
       

        if (!this.token) {
            AlertManager.warning('You are not logged in. Redirecting to login...');
            setTimeout(() => {
                window.location.href = '/index.html';
            }, 2000);
        } else {
            console.log('✅ Auth Token Loaded:', this.token);
            console.log('👤 Current User:', this.user);
            console.log('👤 userRoleName:', this.userRoleName);

        }
    }

    // 🔹 Example API call using stored token
    async fetchDashboardData() {
        if (!this.token) return;

        try {
            const response = await axios.get('https://dit-rfid.arvin-stg.org/api/v1/admin/dashboard', {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            });

            console.log('📊 Dashboard data:', response.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            if (error.response && error.response.status === 401) {
                AlertManager.error('Session expired. Please log in again.');
                localStorage.removeItem('authToken');
                localStorage.removeItem('currentUser');
                setTimeout(() => {
                    window.location.href = '/index.html';
                }, 2000);
            } else {
                AlertManager.error('Failed to load dashboard data.');
            }
        }
    }

    bindEvents() {
        // Quick action buttons
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.getAttribute('data-action');
                this.handleQuickAction(action);
            });
        });

        // Notification button
        document.querySelector('.notification-btn').addEventListener('click', () => {
            this.showNotifications();
        });

        // Stats cards click events
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('click', () => {
                this.handleStatCardClick(card);
            });
        });
    }

    handleQuickAction(action) {
        const actions = {
            attendance: () => {
                AlertManager.info('Opening Attendance Management...');
                setTimeout(() => {
                    window.location.href = 'admin-attendance.html';
                }, 1000);
            },
            students: () => {
                AlertManager.info('Opening Student Management...');
                setTimeout(() => {
                    window.location.href = 'admin-manage-students.html';
                }, 1000);
            },
            schedule: () => {
                AlertManager.warning('Schedule module is under maintenance');
            },
            announcements: () => {
                AlertManager.info('Opening Announcements Management...');
                setTimeout(() => {
                    window.location.href = 'admin-announcements.html';
                }, 1000);
            }
        };

        if (actions[action]) {
            actions[action]();
        } else {
            AlertManager.error('Action not available');
        }
    }

    handleStatCardClick(card) {
        const statLabel = card.querySelector('.stat-label').textContent;
        const statValue = card.querySelector('.stat-value').textContent;
        AlertManager.info(`Viewing details for: ${statLabel} (${statValue})`);
    }

    showNotifications() {
        AlertManager.info('You have 3 new notifications', 'info', 3000);
        
        // Simulate marking notifications as read
        setTimeout(() => {
            const badge = document.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        }, 2000);
    }

    // Method to simulate system alerts
    simulateSystemAlerts() {
        // Simulate various system alerts
        setTimeout(() => {
            AlertManager.warning('System maintenance scheduled for tonight at 11 PM');
        }, 5000);
        
        setTimeout(() => {
            AlertManager.success('Daily backup completed successfully');
        }, 10000);
    }
}

// Make it available globally
if (typeof window !== 'undefined') {
    window.AdminDashboard = AdminDashboard;
}

document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});
