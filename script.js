// 1. Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

menuBtn.addEventListener("click", function () {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
  });
});

// 2. Typing effect in the hero
const roles = ["Zoology Student", "UI/UX Designer", "SEO Specialist"];
const typingEl = document.getElementById("typing");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const current = roles[roleIndex];
  typingEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1400);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, 300);
  }
}
type();

// 3. Highlight the active nav link + back-to-top button
const sections = document.querySelectorAll("section[id]");
const navAnchors = document.querySelectorAll("#nav-links a");
const toTop = document.getElementById("to-top");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (sec) {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });
  navAnchors.forEach(function (a) {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
  toTop.classList.toggle("visible", window.scrollY > 400);
});

// 4. Scroll reveal animation
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(function (el) { observer.observe(el); });

// 5. Project filter
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterBtns.forEach(function (b) { b.classList.remove("active"); });
    btn.classList.add("active");

    const chosen = btn.dataset.filter;
    projectCards.forEach(function (card) {
      const show = chosen === "all" || card.dataset.category === chosen;
      card.classList.toggle("hide", !show);
    });
  });
});

// 6. Contact form validation
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formMsg = document.getElementById("form-msg");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  [nameInput, emailInput, messageInput].forEach(function (field) {
    field.classList.remove("error");
  });
  formMsg.style.color = "#e05252";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "") {
    nameInput.classList.add("error");
    formMsg.textContent = "Please enter your name.";
    return;
  }
  if (!emailPattern.test(email)) {
    emailInput.classList.add("error");
    formMsg.textContent = "Please enter a valid email, like name@example.com.";
    return;
  }
  if (message.length < 10) {
    messageInput.classList.add("error");
    formMsg.textContent = "Your message needs at least 10 characters.";
    return;
  }

  formMsg.style.color = "#2e9e6b";
  formMsg.textContent = "Thanks " + name + ", your message was received!";
  form.reset();
});