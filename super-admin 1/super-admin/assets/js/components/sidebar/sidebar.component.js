//import { adminMenu } from "./sidebar-menu.js";
import { studentsMenu, adminMenu, TeacherMenu } from "./sidebar-menu.js";



export function renderSidebar(activePage = "") {
  const container = document.getElementById("sidebar-container");

  if (!container) {
    console.error("Sidebar container not found!");
    return;
  }

  let menuHtml = "";
  var userRoleName = localStorage.getItem('userRoleName');

  if(userRoleName === 'Admin') {
      menuHtml = adminMenu
    .map(item => `
      <a href="../${item.link}.html" class="nav-item ${activePage === item.link ? "active" : ""}">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `)
    .join("");
  }


 else if(userRoleName === 'Student') {
     menuHtml = studentsMenu
     .map(item => `
     <a href="../${item.link}.html" class="nav-item ${activePage === item.link ? "active" : ""}">
     <i class="${item.icon}"></i>
          <span>${item.label}</span>
       </a>
    `)
   .join("");

 }

  else if(userRoleName === 'Professor') {
         menuHtml = TeacherMenu
    .map(item => `
      <a href="../${item.link}.html" class="nav-item ${activePage === item.link ? "active" : ""}">
        <i class="${item.icon}"></i>
        <span>${item.label}</span>
      </a>
    `)
    .join(""); 
  }


  container.innerHTML = `
    <div class="sidebar">
      <div class="logo-container">
        <div class="logo">STI</div>
        <div class="logo-text">STI Bacoor</div>
      </div>

      <div class="user-info">
        <div class="user-avatar">SU</div>
        <div class="user-details">
          <div class="user-name">Super Admin User</div>
          <div class="user-role">Administrator</div>
        </div>
      </div>

      <div class="nav-menu">
        ${menuHtml}
      </div>
    </div>
  `;
}
