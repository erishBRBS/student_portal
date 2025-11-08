// Class data
const classData = {
  'WEB101-A': {
    code: 'WEB101',
    name: 'Web Development',
    section: 'Section A',
    room: 'Room 301',
    students: 32
  },
  'DB201-B': {
    code: 'DB201',
    name: 'Database Management',
    section: 'Section B',
    room: 'Room 205',
    students: 28
  },
  'PROG101-C': {
    code: 'PROG101',
    name: 'Programming Fundamentals',
    section: 'Section C',
    room: 'Room 402',
    students: 30
  },
  'NET301-D': {
    code: 'NET301',
    name: 'Network Administration',
    section: 'Section D',
    room: 'Lab 102',
    students: 25
  }
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  setupEventListeners();
  loadNotifications();
});

function setupEventListeners() {
  // View switching
  document.getElementById('tableViewBtn').addEventListener('click', () => switchView('table'));
  document.getElementById('listViewBtn').addEventListener('click', () => switchView('list'));
  
  // Class block click events
  document.querySelectorAll('.class-block').forEach(block => {
    block.addEventListener('click', (e) => {
      const course = e.currentTarget.getAttribute('data-course');
      const section = e.currentTarget.getAttribute('data-section');
      const day = e.currentTarget.getAttribute('data-day');
      const time = e.currentTarget.getAttribute('data-time');
      viewClassDetails(course, section, day, time);
    });
  });
  
  // Schedule item click events
  document.querySelectorAll('.schedule-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const course = e.currentTarget.getAttribute('data-course');
      const section = e.currentTarget.getAttribute('data-section');
      const day = e.currentTarget.getAttribute('data-day');
      const time = e.currentTarget.getAttribute('data-time');
      viewClassDetails(course, section, day, time);
    });
  });
  
  // Modal close button
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  
  // View student list button
  document.getElementById('viewStudentListBtn').addEventListener('click', viewStudentList);
  
  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');
  
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  document.addEventListener('click', (event) => {
    if (window.innerWidth < 992 && 
        !sidebar.contains(event.target) && 
        !menuToggle.contains(event.target) &&
        sidebar.classList.contains('open')) {
      sidebar.classList.remove('open');
    }
  });

  // Dark mode toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
  
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

  // Close modal with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  // Close modal when clicking outside
  document.getElementById('classModal').addEventListener('click', function(event) {
    if (event.target === this) {
      closeModal();
    }
  });

  // Notification system
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDropdown = document.getElementById('notificationDropdown');

  if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notificationDropdown.classList.toggle('active');
    });

    // Close notification dropdown when clicking outside
    document.addEventListener('click', () => {
      notificationDropdown.classList.remove('active');
    });
  }
}

// View switching
function switchView(view) {
  const tableView = document.getElementById('tableView');
  const listView = document.getElementById('listView');
  const buttons = document.querySelectorAll('.view-btn');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  
  if (view === 'table') {
    tableView.style.display = 'block';
    listView.classList.remove('active');
    document.getElementById('tableViewBtn').classList.add('active');
  } else {
    tableView.style.display = 'none';
    listView.classList.add('active');
    document.getElementById('listViewBtn').classList.add('active');
  }
}

// View class details
function viewClassDetails(courseCode, section, day, time) {
  const key = `${courseCode}-${section}`;
  const data = classData[key];
  
  if (data) {
    document.getElementById('courseCode').textContent = data.code;
    document.getElementById('courseName').textContent = data.name;
    document.getElementById('section').textContent = data.section;
    document.getElementById('schedule').textContent = `${day} ${time}`;
    document.getElementById('room').textContent = data.room;
    document.getElementById('students').textContent = data.students + ' Students';
    
    document.getElementById('classModal').classList.add('active');
  }
}

// Close modal
function closeModal() {
  document.getElementById('classModal').classList.remove('active');
}

// View student list
function viewStudentList() {
  closeModal();
  alert('Redirecting to student list page...');
}

// Notification system
function loadNotifications() {
  const notifications = [
    { id: 1, type: 'grade', message: 'Grade submission deadline approaching for Web Dev 101', time: '1 hour ago', unread: true },
    { id: 2, type: 'announcement', message: 'New announcement posted by Admin', time: '3 hours ago', unread: true },
    { id: 3, type: 'system', message: 'System maintenance scheduled for tonight', time: '1 day ago', unread: false }
  ];

  const notificationList = document.getElementById('notificationList');
  if (!notificationList) return;
  
  notificationList.innerHTML = notifications.map(notification => `
    <div class="notification-item ${notification.unread ? 'unread' : ''}">
      <div class="notification-content">
        <div class="notification-icon" style="background-color: ${getNotificationColor(notification.type)}">
          <i class="${getNotificationIcon(notification.type)}"></i>
        </div>
        <div>
          <p class="notification-message">${notification.message}</p>
          <p class="notification-time">${notification.time}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function getNotificationIcon(type) {
  const icons = {
    grade: 'fas fa-file-alt',
    announcement: 'fas fa-bullhorn',
    system: 'fas fa-cog',
    message: 'fas fa-envelope'
  };
  return icons[type] || 'fas fa-bell';
}

function getNotificationColor(type) {
  const colors = {
    grade: '#ff9800',
    announcement: '#2196f3',
    system: '#9c27b0',
    message: '#4caf50'
  };
  return colors[type] || '#757575';
}