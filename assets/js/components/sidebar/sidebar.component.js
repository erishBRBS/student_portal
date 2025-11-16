// assets/js/components/sidebar/sidebar.component.js
import { studentsMenu, superAdminMenu, TeacherMenu } from "./sidebar-menu.js";

export function renderSidebar(activePage = "") {
  const container = document.getElementById("sidebar-container");

  if (!container) {
    console.error("Sidebar container not found!");
    return;
  }

  const userRoleName = localStorage.getItem("userRoleName");
  let menu = [];

  if (userRoleName === "Admin") {
    menu = superAdminMenu;
  } else if (userRoleName === "Student") {
    menu = studentsMenu;
  } else if (userRoleName === "Professor" || userRoleName === "Teacher") {
    menu = TeacherMenu;
  } else {
    menu = []; // not logged in / unknown role
  }

  const menuHtml = menu
    .map(item => `
      <div class="nav-item ${activePage === item.link ? "active" : ""}"
           data-link="${item.link}">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
      </div>
    `)
    .join("");

  container.innerHTML = `
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo">STI</div>
        <div class="logo-text">Attendance Portal</div>
      </div>

      <div class="user-info">
        <div class="user-avatar">AU</div>
        <div class="user-details">
          <div class="user-name">${localStorage.getItem("fullName") || "User"}</div>
          <div class="user-role">${userRoleName || "Unknown Role"}</div>
        </div>
      </div>

      <div class="nav-menu">
        ${menuHtml}
      </div>
    </div>
  `;
}
