/* ======================================================
   GLOBAL HELPERS
====================================================== */
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* ======================================================
   LOADER CONTROL
====================================================== */
window.addEventListener("load", () => {
  const loader = $("#loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.transition = "0.6s ease";

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }, 1200);
});

/* ======================================================
   SMOOTH SCROLL NAVIGATION
====================================================== */
$$("a[href^='#']").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const target = $(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* ======================================================
   CURSOR FOLLOW SYSTEM (smooth + lag effect)
====================================================== */
const cursor = $(".cursor");
const follower = $(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let currentX = 0;
let currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  follower.style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* ======================================================
   NAVBAR ACTIVE SECTION TRACKING
====================================================== */
const sections = $$("section");
const navLinks = $$(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const height = section.offsetHeight;

    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

/* ======================================================
   SCROLL REVEAL SYSTEM (AI-style animation)
====================================================== */
const revealElements = $$(
  ".project-card, .about-grid, .skill, .gallery-item, .faq-item"
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => {
  el.classList.add("reveal-hidden");
  revealObserver.observe(el);
});

/* ======================================================
   SIMPLE PARTICLES SYSTEM (CANVAS LIGHT)
====================================================== */
const canvas = $("#particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.fillStyle = "rgba(0,212,255,0.5)";
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

/* ======================================================
   AI WIDGET (simple interactive bot logic)
====================================================== */
const aiWidget = $("#ai-widget");
const openAI = $("#openAI");
const closeAI = $("#closeAI");
const aiInput = $("#ai-widget input");
const aiBody = $(".ai-body");

openAI.addEventListener("click", () => {
  aiWidget.style.display = "flex";
});

closeAI.addEventListener("click", () => {
  aiWidget.style.display = "none";
});

/* fake AI reply */
function botReply(msg) {
  const reply = document.createElement("p");
  reply.classList.add("bot");

  let response = "Mình chưa hiểu câu hỏi 😅";

  if (msg.toLowerCase().includes("hello")) {
    response = "Xin chào 👋 Tôi là AI Assistant của Hoàng Hazen";
  }

  if (msg.toLowerCase().includes("web")) {
    response = "Website này được build bằng HTML/CSS/JS + AI UI system";
  }

  reply.textContent = response;
  aiBody.appendChild(reply);

  aiBody.scrollTop = aiBody.scrollHeight;
}

/* send message */
aiInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const msg = aiInput.value.trim();
    if (!msg) return;

    const userMsg = document.createElement("p");
    userMsg.classList.add("user");
    userMsg.textContent = msg;

    aiBody.appendChild(userMsg);

    botReply(msg);

    aiInput.value = "";
  }
});

/* ======================================================
   RESIZE FIX (particles responsive)
====================================================== */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
