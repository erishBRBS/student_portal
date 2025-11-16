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

// Save settings functionality
function saveSettings() {
  const name = document.getElementById("parentName").value.trim();
  const email = document.getElementById("parentEmail").value.trim();
  const mobile = document.getElementById("parentMobile").value.trim();
  const password = document.getElementById("parentPassword").value;
  const announcements = document.getElementById("notifAnnouncements").checked;
  const attendance = document.getElementById("notifAttendance").checked;
  const grades = document.getElementById("notifGrades").checked;

  // Validation
  if (!name || !email || !mobile) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Mobile validation
  const mobileRegex = /^09\d{9}$/;
  if (!mobileRegex.test(mobile)) {
    alert("Please enter a valid mobile number (09XXXXXXXXX).");
    return;
  }

  // Password validation (if provided)
  if (password && password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  // Save to localStorage (in a real app, this would be an API call)
  const settings = {
    name: name,
    email: email,
    mobile: mobile,
    announcements: announcements,
    attendance: attendance,
    grades: grades
  };

  localStorage.setItem('parentSettings', JSON.stringify(settings));
  
  // Update the displayed name in the header if it changed
  if (name !== "Maria Dela Cruz") {
    document.querySelector('.user-name').textContent = name;
    document.querySelector('.admin-profile div:last-child').textContent = name;
  }

  alert("Settings have been saved successfully!");
}

// Load saved settings when page loads
document.addEventListener('DOMContentLoaded', function() {
  const savedSettings = localStorage.getItem('parentSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    document.getElementById("parentName").value = settings.name;
    document.getElementById("parentEmail").value = settings.email;
    document.getElementById("parentMobile").value = settings.mobile;
    document.getElementById("notifAnnouncements").checked = settings.announcements;
    document.getElementById("notifAttendance").checked = settings.attendance;
    document.getElementById("notifGrades").checked = settings.grades;
  }
});

// Form validation on input
document.getElementById('parentEmail').addEventListener('blur', function() {
  const email = this.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (email && !emailRegex.test(email)) {
    this.style.borderColor = '#e74c3c';
  } else {
    this.style.borderColor = '';
  }
});

document.getElementById('parentMobile').addEventListener('blur', function() {
  const mobile = this.value.trim();
  const mobileRegex = /^09\d{9}$/;
  
  if (mobile && !mobileRegex.test(mobile)) {
    this.style.borderColor = '#e74c3c';
  } else {
    this.style.borderColor = '';
  }
});