const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

const currentYear = document.querySelector("#year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

const pathContent = {
  idea: {
    kicker: "A FIRST STEP",
    code: "PATH / 01",
    title: "Give the idea<br>a working shape.",
    description: "Move from possibility to a business direction you can examine, explain and start testing.",
    points: ["Who the business is for", "What problem it will solve", "What a realistic first plan needs to cover"]
  },
  structure: {
    kicker: "A STRONGER FOUNDATION",
    code: "PATH / 02",
    title: "Make the business<br>work more clearly.",
    description: "Bring focus to an existing operation, understand where the pressure points are and decide what deserves attention first.",
    points: ["Where the business is today", "Which systems or plans need attention", "Which priorities can unlock progress"]
  },
  growth: {
    kicker: "THE NEXT CHAPTER",
    code: "PATH / 03",
    title: "Prepare for a<br>deliberate next move.",
    description: "Turn a growth ambition into a practical sequence of decisions, capabilities and actions.",
    points: ["What growth should look like", "What the business needs to be ready", "How to make the next steps manageable"]
  }
};

const tabs = Array.from(document.querySelectorAll(".path-tab"));
const panel = document.querySelector("#path-panel");
const pathKicker = document.querySelector("#path-kicker");
const pathCode = document.querySelector("#path-code");
const pathTitle = document.querySelector("#path-title");
const pathDescription = document.querySelector("#path-description");
const pathList = document.querySelector("#path-list");

function activatePath(key, focusPanel = false) {
  const content = pathContent[key];
  if (!content || !panel) return;

  tabs.forEach((tab) => {
    const active = tab.dataset.path === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });

  const activeTab = tabs.find((tab) => tab.dataset.path === key);
  panel.setAttribute("aria-labelledby", activeTab ? activeTab.id : "tab-idea");
  pathKicker.textContent = content.kicker;
  pathCode.textContent = content.code;
  pathTitle.innerHTML = content.title;
  pathDescription.textContent = content.description;
  pathList.replaceChildren(...content.points.map((point) => {
    const li = document.createElement("li");
    li.textContent = point;
    return li;
  }));
  if (focusPanel) panel.focus();
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activatePath(tab.dataset.path));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)) return;
    event.preventDefault();
    const delta = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
    const next = (index + delta + tabs.length) % tabs.length;
    tabs[next].focus();
    activatePath(tabs[next].dataset.path);
  });
});

const focusSelect = document.querySelector("#focus");
document.querySelectorAll("[data-package]").forEach((link) => {
  link.addEventListener("click", () => {
    if (focusSelect) focusSelect.value = link.dataset.package;
  });
});

const pathEnquiry = document.querySelector("[data-path-enquiry]");
if (pathEnquiry) {
  pathEnquiry.addEventListener("click", () => {
    if (focusSelect) focusSelect.value = "Not sure yet";
  });
}

const enquiryForm = document.querySelector("#enquiry-form");
if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(enquiryForm);
    const body = [
      "Name: " + data.get("name"),
      "Email: " + data.get("email"),
      "Business / idea: " + (data.get("business") || "Not provided"),
      "Area of interest: " + data.get("focus"),
      "",
      "Context:",
      data.get("message")
    ].join("\n");
    const subject = encodeURIComponent("Incubator enquiry — " + data.get("focus"));
    window.location.href = "mailto:hello@incubator.co.za?subject=" + subject + "&body=" + encodeURIComponent(body);
  });
}


/* Subtle reveal-on-scroll: content remains visible when motion is reduced or observers are unavailable. */
const revealTargets = document.querySelectorAll(
  ".manifesto-main, .pathfinder-heading, .pathfinder-layout, .work-row, .method-step, .package-entry, .closing-copy, .closing-action, .contact-copy, .enquiry-form"
);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("reveal-ready");
  revealTargets.forEach((item) => item.classList.add("reveal-up"));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  revealTargets.forEach((item) => revealObserver.observe(item));
}
