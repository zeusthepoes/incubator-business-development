const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open menu");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  const stageSelect = document.querySelector("#stage");

  document.querySelectorAll("[data-stage]").forEach((link) => {
    link.addEventListener("click", () => {
      if (stageSelect) stageSelect.value = link.dataset.stage;
    });
  });

  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(enquiryForm);
    const lines = [
      "Name: " + formData.get("name"),
      "Email: " + formData.get("email"),
      "Business: " + (formData.get("business") || "Not provided"),
      "Business stage: " + formData.get("stage"),
      "",
      "What I would like to work through:",
      formData.get("message")
    ];
    const subject = encodeURIComponent("Incubator enquiry — " + formData.get("stage"));
    const body = encodeURIComponent(lines.join(String.fromCharCode(10)));
    window.location.href = "mailto:hello@incubator.co.za?subject=" + subject + "&body=" + body;
  });
}