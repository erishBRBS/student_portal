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

// Sample announcements (Teacher/Admin can create these in the real system)
const announcements = [
  {
    title: "School-wide Fire Drill",
    type: "General",
    content: "Please be informed that there will be a fire drill on September 30 at 9:00 AM. Attendance is required.",
    image: "https://via.placeholder.com/600x200/1a4b8c/ffffff?text=Fire+Drill",
    date: "2025-09-20",
    priority: "high"
  },
  {
    title: "Math Quiz Reminder",
    type: "Subject",
    content: "Grade 7 Section A will have a Math Quiz on September 25. Please review Chapters 3 and 4.",
    image: "",
    date: "2025-09-18",
    priority: "medium"
  },
  {
    title: "Science Project Submission",
    type: "Subject",
    content: "Grade 8 students must submit their Science project by September 28. Late submissions will not be accepted.",
    image: "https://via.placeholder.com/600x200/28a745/ffffff?text=Science+Project",
    date: "2025-09-19",
    priority: "high"
  },
  {
    title: "Typhoon Advisory",
    type: "Holiday",
    content: "Classes will be suspended tomorrow due to Typhoon Signal No. 2. Stay safe!",
    image: "https://via.placeholder.com/600x200/e74c3c/ffffff?text=No+Classes",
    date: "2025-09-21",
    priority: "high"
  },
  {
    title: "Parent-Teacher Meeting",
    type: "Event",
    content: "The quarterly parent-teacher meeting is scheduled for October 5, 2025. Please confirm your attendance.",
    image: "https://via.placeholder.com/600x200/ffc107/333333?text=PTA+Meeting",
    date: "2025-09-22",
    priority: "medium"
  },
  {
    title: "Library Week Celebration",
    type: "Event",
    content: "Join us for Library Week from September 25-29 with special activities and book fairs.",
    image: "https://via.placeholder.com/600x200/17a2b8/ffffff?text=Library+Week",
    date: "2025-09-17",
    priority: "low"
  }
];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initial render
  displayAnnouncements(announcements);
});

function displayAnnouncements(list) {
  const container = document.getElementById("announcementList");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<div class="card"><p class="text-center mt-4">No announcements found.</p></div>`;
    return;
  }

  // Sort by date (newest first) and priority
  const sorted = [...list].sort((a, b) => {
    // First sort by priority (high > medium > low)
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
    
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then sort by date (newest first)
    return new Date(b.date) - new Date(a.date);
  });

  sorted.forEach(a => {
    const img = a.image ? `<img src="${a.image}" alt="Announcement Image" class="announcement-image">` : "";
    const icon = getTypeIcon(a.type);
    
    container.innerHTML += `
      <div class="announcement-card ${a.type.toLowerCase()}">
        ${img}
        <h4>${a.title}</h4>
        <div class="announcement-meta">
          <span><i class="fas ${icon}"></i> <span class="announcement-tag ${a.type.toLowerCase()}">${a.type}</span></span>
          <span><i class="fas fa-calendar"></i> ${formatDate(a.date)}</span>
          <span><i class="fas fa-${getPriorityIcon(a.priority)}"></i> ${a.priority.charAt(0).toUpperCase() + a.priority.slice(1)} Priority</span>
        </div>
        <p class="announcement-content">${a.content}</p>
      </div>
    `;
  });
}

function getTypeIcon(type) {
  switch (type) {
    case 'General': return 'fa-bullhorn';
    case 'Subject': return 'fa-book';
    case 'Event': return 'fa-calendar-alt';
    case 'Holiday': return 'fa-umbrella-beach';
    default: return 'fa-bullhorn';
  }
}

function getPriorityIcon(priority) {
  switch (priority) {
    case 'high': return 'exclamation-circle';
    case 'medium': return 'info-circle';
    case 'low': return 'check-circle';
    default: return 'info-circle';
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

function applyFilters() {
  const typeFilter = document.getElementById("filterType").value;
  const keyword = document.getElementById("searchBox").value.toLowerCase();

  const filtered = announcements.filter(a =>
    (!typeFilter || a.type === typeFilter) &&
    (!keyword || a.title.toLowerCase().includes(keyword) || a.content.toLowerCase().includes(keyword))
  );
  displayAnnouncements(filtered);
}