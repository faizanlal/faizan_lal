// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");
const navLinks = document.querySelectorAll(".nav-mobile .nav-link");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  menuToggle.innerHTML = mobileNav.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';

  // Improve accessibility
  menuToggle.setAttribute(
    "aria-expanded",
    mobileNav.classList.contains("active") ? "true" : "false"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll to top
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Form validation
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const formStatus = document.getElementById("formStatus");
const successModal = document.getElementById("successModal");
const closeSuccessModal = document.getElementById("closeSuccessModal");
const successModalClose = document.getElementById("successModalClose");

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate form inputs
function validateInput(input, errorElement, errorMessage) {
  if (!input.value.trim()) {
    errorElement.textContent = errorMessage;
    errorElement.classList.add("visible");
    input.classList.add("error");
    return false;
  } else {
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
    input.classList.remove("error");
    return true;
  }
}

// Validate email specifically
function validateEmail() {
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required";
    emailError.classList.add("visible");
    emailInput.classList.add("error");
    return false;
  } else if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address";
    emailError.classList.add("visible");
    emailInput.classList.add("error");
    return false;
  } else {
    emailError.textContent = "";
    emailError.classList.remove("visible");
    emailInput.classList.remove("error");
    return true;
  }
}

// Input event listeners for real-time validation
nameInput.addEventListener("input", () => {
  validateInput(nameInput, nameError, "Name is required");
});

emailInput.addEventListener("input", validateEmail);

subjectInput.addEventListener("input", () => {
  validateInput(subjectInput, subjectError, "Subject is required");
});

messageInput.addEventListener("input", () => {
  validateInput(messageInput, messageError, "Message is required");
});

// Contact form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Validate all inputs
  const isNameValid = validateInput(nameInput, nameError, "Name is required");
  const isEmailValid = validateEmail();
  const isSubjectValid = validateInput(
    subjectInput,
    subjectError,
    "Subject is required"
  );
  const isMessageValid = validateInput(
    messageInput,
    messageError,
    "Message is required"
  );

  // If any validation fails, stop form submission
  if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
    return;
  }

  const submitButton = document.getElementById("submitButton");
  submitButton.disabled = true;
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML =
    '<span class="button-text">Sending...</span><span class="button-icon"><i class="fas fa-spinner fa-spin"></i></span>';

  try {
    // Simulate form submission with a delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success modal
    successModal.style.display = "block";
    document.body.style.overflow = "hidden";
    successModal.setAttribute("aria-hidden", "false");

    // Reset form
    contactForm.reset();
  } catch (error) {
    // Show error message
    formStatus.textContent =
      "There was a problem sending your message. Please try again.";
    formStatus.className = "form-status error";
    console.error("Form submission error:", error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
  }
});

// Close success modal
function closeSuccess() {
  successModal.style.display = "none";
  document.body.style.overflow = "auto";
  successModal.setAttribute("aria-hidden", "true");
}

closeSuccessModal.addEventListener("click", closeSuccess);
successModalClose.addEventListener("click", closeSuccess);

window.addEventListener("click", (e) => {
  if (e.target === successModal) {
    closeSuccess();
  }
});

// Keyboard accessibility for modal
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && successModal.style.display === "block") {
    closeSuccess();
  }
});

// Set current year
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Resume Modal
const modal = document.getElementById("resumeModal");
const viewResumeBtn = document.getElementById("viewResume");
const viewResumeMobileBtn = document.getElementById("viewResumeMobile");
const closeModalBtn = document.querySelector(".close-modal");
const resumePdf = document.getElementById("resumePdf");

// Replace with your actual resume PDF URL
const resumeUrl =
  "https://drive.google.com/file/d/1hdufWbu5ZOCCPU9B7HHOAN2WWzcK5uQn/preview";

function openResumeModal() {
  modal.style.display = "block";
  resumePdf.src = resumeUrl;
  document.body.style.overflow = "hidden";

  // Improve accessibility
  modal.setAttribute("aria-hidden", "false");
  document.querySelector(".modal-content").focus();
}

function closeResumeModal() {
  modal.style.display = "none";
  resumePdf.src = "about:blank";
  document.body.style.overflow = "auto";

  // Improve accessibility
  modal.setAttribute("aria-hidden", "true");
}

viewResumeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openResumeModal();
});

viewResumeMobileBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openResumeModal();
  mobileNav.classList.remove("active");
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  menuToggle.setAttribute("aria-expanded", "false");
});

closeModalBtn.addEventListener("click", closeResumeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeResumeModal();
  }
});

// Project filtering
const projectFilters = document.querySelectorAll(".project-filter");
const projectCards = document.querySelectorAll(".project-card");

projectFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    // Remove active class from all filters
    projectFilters.forEach((f) => f.classList.remove("active"));

    // Add active class to clicked filter
    filter.classList.add("active");

    // Get filter value
    const filterValue = filter.getAttribute("data-filter");

    // Filter projects
    projectCards.forEach((card) => {
      if (filterValue === "all") {
        card.style.display = "block";
        setTimeout(() => {
          card.classList.add("visible");
        }, 100);
      } else {
        const categories = card.getAttribute("data-category").split(" ");
        if (categories.includes(filterValue)) {
          card.style.display = "block";
          setTimeout(() => {
            card.classList.add("visible");
          }, 100);
        } else {
          card.classList.remove("visible");
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      }
    });
  });
});

// Add touch support for mobile devices
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  const xUp = evt.touches[0].clientX;
  const yUp = evt.touches[0].clientY;

  const xDiff = xDown - xUp;
  const yDiff = yDown - yUp;

  // Close mobile menu on swipe left
  if (
    Math.abs(xDiff) > Math.abs(yDiff) &&
    xDiff > 0 &&
    mobileNav.classList.contains("active")
  ) {
    mobileNav.classList.remove("active");
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.setAttribute("aria-expanded", "false");
  }

  xDown = null;
  yDown = null;
}

// Animate floating shapes
document.addEventListener("DOMContentLoaded", () => {
  const floatingShapes = document.querySelectorAll(".floating-shape");

  floatingShapes.forEach((shape) => {
    // Add random starting positions within constraints
    const randomX = Math.random() * 10 - 5; // -5 to 5
    const randomY = Math.random() * 10 - 5; // -5 to 5
    const randomDelay = Math.random() * 5; // 0 to 5

    shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
    shape.style.animationDelay = `${randomDelay}s`;
  });
});
