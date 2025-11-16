// attendance-tracking/router.js
import { renderSidebar } from "/assets/js/components/sidebar/sidebar.component.js";

// Allowed pages per role (role-based protection)
const roleRoutes = {
  Student: [
    "student/student-dashboard",
    "student/student-gate-attendance",
    "student/student-subject-attendance",
    "student/student-schedule",
    "student/student-announcements",
    "student/student-settings"
  ],
  Professor: [
    "teacher/teacher-dashboard",
    "teacher/teacher-attendance",
    "teacher/teacher-students",
    "teacher/teacher-schedule",
    "teacher/teacher-announcements",
    "teacher/teacher-settings"
  ],
  Teacher: [
    "teacher/teacher-dashboard",
    "teacher/teacher-attendance",
    "teacher/teacher-students",
    "teacher/teacher-schedule",
    "teacher/teacher-announcements",
    "teacher/teacher-settings"
  ]
};

const main = document.getElementById("main-container");

// Decide default page based on role
function getDefaultPage() {
  const role = localStorage.getItem("userRoleName");
  if (role === "Admin") return "admin/admin-dashboard";
  if (role === "Student") return "student/student-dashboard";
  if (role === "Professor" || role === "Teacher") return "teacher/teacher-dashboard";
  return null;
}

export function loadPage(link) {
  let role = localStorage.getItem("userRoleName");

  // Normalize role to match router table
  role = role?.trim().toLowerCase();
  if (role === "student") role = "Student";
  if (role === "professor") role = "Professor";
  if (role === "teacher") role = "Teacher";

  // Logout handling
  if (link === "logout") {
    localStorage.clear();
    window.location.href = "/index.html"; 
    return;
  }

  // Validation
  if (!role || !roleRoutes[role]) {
    main.innerHTML = `<h2 style="padding:1rem;">403 - Unauthorized (Invalid Role)</h2>`;
    renderSidebar("");
    return;
  }

  // CHECK: must match route
  if (!roleRoutes[role].includes(link)) {
    main.innerHTML = `<h2 style="padding:1rem;">403 - Unauthorized</h2>`;
    renderSidebar("");
    return;
  }

  const url = `./${link}.html`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then(html => {
      main.innerHTML = html;
      renderSidebar(link);
      history.pushState({ link }, "", `#/${link}`);
    })
    .catch(() => {
      main.innerHTML = `<h2 style="padding:1rem;">404 - Page Not Found</h2>`;
      renderSidebar("");
    });
}


// Global click handler for sidebar items
document.addEventListener("click", e => {
  const item = e.target.closest(".nav-item");
  if (!item) return;

  const link = item.dataset.link;
  if (!link) return;

  e.preventDefault();
  loadPage(link);
});

// Handle browser back/forward
window.onpopstate = e => {
  if (e.state?.link) {
    loadPage(e.state.link);
  }
};

// INITIAL LOAD
const defaultPage = getDefaultPage();
if (defaultPage) {
  loadPage(defaultPage);
} else {
  main.innerHTML = `<h2 style="padding:1rem;">No role found. Please login again.</h2>`;
}
