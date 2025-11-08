// ==============================================================================
// 1. AXIOS CONFIGURATION (endpoints)
// ==============================================================================
const API_BASE_URL = "https://dit-rfid.arvin-stg.org/api/v1/";
const ADMIN_LOGIN_ENDPOINT = "ats/login/admin";
const STUDENT_LOGIN_ENDPOINT = "ats/login/student";
const PROFESSOR_LOGIN_ENDPOINT = "ats/login/professor";
const PARENT_LOGIN_ENDPOINT = "ats/login/parent";
// ==============================================================================

// --- INITIALIZE ELEMENTS (CONSOLIDATED DECLARATIONS) ---
const modal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const userIdInput = document.getElementById("userId");
const passwordInput = document.getElementById("password");
const loginBtns = document.querySelectorAll(
  "#loginBtn, #heroLoginBtn, #ctaLoginBtn"
);
const closeBtn = document.querySelector(".close");
const userTypeOptions = document.querySelectorAll(".user-type-option");
const userIdLabel = document.getElementById("userIdLabel");
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const loginButton = document.querySelector(".login-submit-btn");
const loginText = document.querySelector(".login-text");
const loadingSpinner = document.querySelector(".loading-spinner");

// Elements for Header/Logout
const loginHeaderBtn = document.getElementById("loginBtn");
const logoutHeaderBtn = document.getElementById("logoutBtn");

// --- UTILITY FUNCTIONS ---

// Function to toggle loading state on the login button
function setLoadingState(isLoading) {
  if (loginButton && loginText && loadingSpinner) {
    loginButton.disabled = isLoading;
    loginText.style.display = isLoading ? "none" : "inline";
    loadingSpinner.style.display = isLoading ? "inline-block" : "none";
    loginButton.classList.toggle("is-loading", isLoading);
  }
}

// Function to check login status and update header buttons
function checkLoginStatus() {
  const token = localStorage.getItem("authToken");
  if (token) {
    // If token exists, show Logout button and hide Login buttons
    if (loginHeaderBtn) loginHeaderBtn.style.display = "none";
    if (logoutHeaderBtn) logoutHeaderBtn.style.display = "inline-block";
  } else {
    // If no token, show Login buttons and hide Logout button
    if (loginHeaderBtn) loginHeaderBtn.style.display = "inline-block";
    if (logoutHeaderBtn) logoutHeaderBtn.style.display = "none";
  }
}

// --- LOGOUT FUNCTIONALITY ---

async function handleLogout() {
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    performClientSideLogout();
    return;
  }

  try {
    // Call Laravel's /api/v1/logout endpoint (requires the Bearer Token)
    await axios.post(
      `${API_BASE_URL}${LOGOUT_ENDPOINT}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    performClientSideLogout();
  } catch (error) {
    console.error(
      "Logout failed on server, forcing client-side cleanup:",
      error
    );
    performClientSideLogout();
  }
}

function performClientSideLogout() {
  // 1. Remove stored data
  localStorage.removeItem("authToken");
  localStorage.removeItem("currentUser");

  // 2. Update UI
  alert("You have been successfully logged out.");
  checkLoginStatus();

  // 3. Redirect to landing page
  window.location.href = '/index.html';
}

// Attach logout handler to the button
if (logoutHeaderBtn) {
  logoutHeaderBtn.addEventListener("click", handleLogout);
}

// --- MODAL FUNCTIONALITY ---

// Open Modal
loginBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      loginForm.reset();
      setLoadingState(false);
    }
  });
});

// Close Modal
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}

// Close Modal on outside click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// --- AXIOS LOGIN FORM LOGIC (THE CORE CHANGE) ---

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const activeOption = document.querySelector(".user-type-option.active");
    const userType = activeOption
      ? activeOption.getAttribute("data-type")
      : "student";
    const userId = userIdInput.value;
    const password = passwordInput.value;

    // 1. Determine the correct API endpoint and Redirect Path
    let loginUrl = "";
    // let redirectPath = "/";

    switch (userType) {
      case "admin":
        loginUrl = `${API_BASE_URL}${ADMIN_LOGIN_ENDPOINT}`;
        redirectPath =
          "../../../attendance-tracking/modules/Admin/admin-dashboard.html";
        break;
      case "student":
        loginUrl = `${API_BASE_URL}${STUDENT_LOGIN_ENDPOINT}`;
        redirectPath = "/student-dashboard.html";
        break;
      case "professor":
        loginUrl = `${API_BASE_URL}${PROFESSOR_LOGIN_ENDPOINT}`;
        redirectPath = "/professor-dashboard.html";
        break;
      case "parent":
        loginUrl = `${API_BASE_URL}${PARENT_LOGIN_ENDPOINT}`;
        redirectPath = "/parent-dashboard.html";
        break;
      default:
        alert("Invalid user type selected.");
        return;
    }

    const credentials = {
      username: userId,
      password: password,
      user_type: userType,
    };

    setLoadingState(true);
    console.log("credentials", credentials);
    console.log("loginUrl", loginUrl);

    try {
      // 2. Perform Axios POST to the determined specific URL
      const response = await axios.post(loginUrl, credentials);

      if (response.data && response.data.token) {
        // script.js, bandang line 195 (sa loob ng try block)

        const responseDataString = JSON.stringify(response.data, null, 2);
        console.log(
          "✅ TOKEN SUCCESSFULLY RETRIEVED! Full Response:",
          response.data // Para sa interactive object
        );
        console.log("-----------------------------------------");
        console.log("Response JSON String (Copyable):", responseDataString); // <--- IDAGDAG MO ITO
        console.log("-----------------------------------------"); // Success: Store the Auth Token and User Data

        localStorage.setItem("authToken", response.data.token);
        // ...

        // Success: Store the Auth Token and User Data
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("currentUser", JSON.stringify(response.data.user));

        // Close modal and clean up
        loginForm.reset();
        modal.style.display = "none";
        document.body.style.overflow = "auto";

        // alert(`Login successful! Redirecting to ${userType} portal...`);
        checkLoginStatus();

        // 3. Redirect to the determined dashboard path
        window.location.href = redirectPath;
      } else {
        throw new Error(
          "Login failed: Server response is incomplete or missing token."
        );
      }
    } catch (error) {
      console.error("Login Failed Error:", error);

      let errorMessage = "Login failed. Please check your ID and password.";

      if (error.response) {
        if (error.response.status === 401 || error.response.status === 404) {
          errorMessage = `Invalid ID or password for the selected ${userType} type.`;
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data && error.response.data.errors) {
          errorMessage =
            "Validation Error: " +
            Object.values(error.response.data.errors).flat().join(", ");
        }
      }

      alert(errorMessage);
    } finally {
      setLoadingState(false);
    }
  });
}

// Mobile Navigation
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// FAQ Functionality
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    const isActive = answer.classList.contains("active");

    // Close all answers
    document.querySelectorAll(".faq-answer").forEach((ans) => {
      ans.classList.remove("active");
    });

    document.querySelectorAll(".faq-question").forEach((q) => {
      q.classList.remove("active");
    });

    // If this answer wasn't active, open it
    if (!isActive) {
      answer.classList.add("active");
      question.classList.add("active");
    }
  });
});

// User Type Selector
userTypeOptions.forEach((option) => {
  option.addEventListener("click", () => {
    // Remove active class from all options
    userTypeOptions.forEach((opt) => opt.classList.remove("active"));

    // Add active class to clicked option
    option.classList.add("active");

    // Update form based on selected user type
    const userType = option.getAttribute("data-type");
    if (userType === "student") {
      userIdLabel.textContent = "Student ID";
      userIdInput.placeholder = "Enter your Student ID";
    } else if (userType === "admin") {
      userIdLabel.textContent = "Admin ID";
      userIdInput.placeholder = "Enter your Admin ID";
    }
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  }
});

// Add some interactive elements
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Initial check when the page loads
document.addEventListener("DOMContentLoaded", checkLoginStatus);
