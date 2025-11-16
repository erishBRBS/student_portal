// Set current date
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('todayDate').textContent = today.toLocaleDateString('en-US', options);

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (event) => {
  if (window.innerWidth < 992 && 
      !sidebar.contains(event.target) && 
      !menuToggle.contains(event.target) &&
      sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }
});

// Dark mode toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

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

// Class data
const classData = {
  'WEB101-A': {
    code: 'WEB101',
    name: 'Web Development',
    professor: 'Prof. Santos',
    schedule: 'MWF 8:00 - 9:30 AM',
    room: 'Room 301',
    section: 'Section A',
    units: 3
  },
  'DB201-B': {
    code: 'DB201',
    name: 'Database Management',
    professor: 'Prof. Reyes',
    schedule: 'MTH 10:00 - 11:30 AM',
    room: 'Room 205',
    section: 'Section B',
    units: 3
  },
  'PROG101-C': {
    code: 'PROG101',
    name: 'Programming Fundamentals',
    professor: 'Prof. Cruz',
    schedule: 'MWF 1:00 - 2:30 PM',
    room: 'Room 402',
    section: 'Section C',
    units: 3
  },
  'NET301-D': {
    code: 'NET301',
    name: 'Network Administration',
    professor: 'Prof. Lim',
    schedule: 'TTH 3:00 - 4:30 PM',
    room: 'Lab 102',
    section: 'Section D',
    units: 3
  }
};

// Attendance Data
const attendanceData = [
  { date: '2025-09-15', timeIn: '07:45 AM', timeOut: '04:00 PM', method: 'RFID' },
  { date: '2025-09-16', timeIn: '08:00 AM', timeOut: '03:50 PM', method: 'Face' },
  { date: '2025-09-17', timeIn: '07:55 AM', timeOut: '04:10 PM', method: 'RFID' },
  { date: '2025-09-18', timeIn: '08:05 AM', timeOut: '04:05 PM', method: 'Face' },
  { date: '2025-09-19', timeIn: '07:50 AM', timeOut: '04:15 PM', method: 'RFID' },
  { date: '2025-09-20', timeIn: '07:58 AM', timeOut: '04:10 PM', method: 'RFID' },
  { date: '2025-09-21', timeIn: '08:05 AM', timeOut: '04:15 PM', method: 'Face' }
];

const tbody = document.querySelector('#attendanceTable tbody');

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Set up event listeners
  setupEventListeners();
  
  // Initial Load
  populateTable(attendanceData);
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
      viewClassDetails(course, section);
    });
  });
  
  // Schedule item click events
  document.querySelectorAll('.schedule-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const course = e.currentTarget.getAttribute('data-course');
      const section = e.currentTarget.getAttribute('data-section');
      viewClassDetails(course, section);
    });
  });
  
  // Modal close button
  document.getElementById('modalCloseBtn').addEventListener('click', closeModal);
  
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
}

// Populate Table
function populateTable(data) {
  tbody.innerHTML = '';
  data.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.date}</td>
        <td>${row.timeIn}</td>
        <td>${row.timeOut}</td>
        <td>${row.method}</td>
      </tr>`;
  });
}

// Apply Filters
function applyFilters() {
  const filterDate = document.getElementById('filterDate').value;
  const filterMethod = document.getElementById('filterMethod').value;
  const filtered = attendanceData.filter(item =>
    (!filterDate || item.date === filterDate) &&
    (!filterMethod || item.method === filterMethod)
  );
  populateTable(filtered);
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
function viewClassDetails(courseCode, section) {
  const key = `${courseCode}-${section}`;
  const data = classData[key];
  
  if (data) {
    document.getElementById('subjectCode').textContent = data.code;
    document.getElementById('subjectName').textContent = data.name;
    document.getElementById('professor').textContent = data.professor;
    document.getElementById('schedule').textContent = data.schedule;
    document.getElementById('room').textContent = data.room;
    document.getElementById('section').textContent = data.section;
    document.getElementById('units').textContent = data.units + ' Units';
    
    document.getElementById('classModal').classList.add('active');
  }
}

// Close modal
function closeModal() {
  document.getElementById('classModal').classList.remove('active');
}