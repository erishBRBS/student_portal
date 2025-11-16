import { renderSidebar } from "../assets/js/components/sidebar/sidebar.component.js";

const main = document.getElementById("main-container");

// Allowed navigation for Super Admin
const routes = {
  "super-admin-dashboard": "super-admin-dashboard.html",
  "super-admin-settings": "super-admin-settings.html",
  "attendance-tracking-management": "attendance-tracking-management.html",
  "grade-portal-management": "grade-portal-management.html"
};

// Load a module/page
export function loadPage(page) {

  // FIXED: correct route validation
  if (!routes[page]) {
    main.innerHTML = `<h2 style="padding:1rem;">404 - Page Not Found</h2>`;
    return;
  }

  // FIXED: correct file fetch
  fetch(`./pages/${routes[page]}`)
    .then(res => res.text())
    .then(html => {
      main.innerHTML = html;
      renderSidebar(page);
      history.pushState({ page }, "", `#/${page}`);
    })
    .catch(() => {
      main.innerHTML = `<h2 style="padding:1rem;">404 - Page Not Found</h2>`;
    });
}

// Sidebar click handler
document.addEventListener("click", e => {
  const item = e.target.closest(".nav-item");
  if (!item) return;

  const link = item.dataset.link;
  loadPage(link);
});

// Browser back/forward
window.onpopstate = e => {
  if (e.state?.page) loadPage(e.state.page);
};

// Initial load
const hashPage = location.hash.replace("#/", "");
loadPage(hashPage || "super-admin-dashboard");
