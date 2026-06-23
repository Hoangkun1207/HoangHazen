/* ==========================================
   LOADER
========================================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 2000);
});

/* ==========================================
   TYPING EFFECT
========================================== */
const typingText = document.querySelector(".hero-subtitle");
const words = [
  "Frontend Developer",
  "UI / UX Designer",
  "AI Enthusiast",
  "Web Creator",
  "React Developer"
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const current = words[wordIndex];

  if (!deleting) {
    typingText.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeEffect, 1500);
      return;
    }
  } else {
    typingText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex++;
      if (wordIndex >= words.length) {
        wordIndex = 0;
      }
    }
  }
  setTimeout(typeEffect, 100);
}
if (typingText) typeEffect();

/* ==========================================
   COUNTER
========================================== */
const counters = document.querySelectorAll(".counter");
const startCounter = () => {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let count = 0;
    const update = () => {
      const increment = target / 100;
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
};

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter();
    }
  });
});

const statsSection = document.querySelector("#stats");
if (statsSection) {
  counterObserver.observe(statsSection);
}

/* ==========================================
   SCROLL REVEAL
========================================== */
const revealElements = document.querySelectorAll(
  "section, .project-card, .service-card, .stat-card, .certificate-card, .blog-card"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(el => {
  el.classList.add("hidden");
  revealObserver.observe(el);
});

/* ==========================================
   ADD REVEAL STYLE
========================================== */
const revealStyle = document.createElement("style");
revealStyle.innerHTML = `
  .hidden {
    opacity: 0;
    transform: translateY(80px);
    transition: 1s;
  }
  .show {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(revealStyle);

/* ==========================================
   SCROLL PROGRESS BAR
========================================== */
const progress = document.createElement("div");
progress.id = "progressBar";
document.body.appendChild(progress);

const progressStyle = document.createElement("style");
progressStyle.innerHTML = `
  #progressBar {
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    width: 0;
    background: linear-gradient(90deg, #00d4ff, #7c3aed);
    z-index: 999999;
  }
`;
document.head.appendChild(progressStyle);

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const percent = (window.scrollY / total) * 100;
  progress.style.width = percent + "%";
});

/* ==========================================
   MATRIX RAIN
========================================== */
const canvas = document.getElementById("matrix");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = [];
  
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }
  
  function drawMatrix() {
    ctx.fillStyle = "rgba(5, 8, 22, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00d4ff";
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(drawMatrix, 35);
  
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ==========================================
   CUSTOM CURSOR
========================================== */
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", e => {
  if (cursor) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  }
  if (cursor2) {
    cursor2.style.left = e.clientX - 14 + "px";
    cursor2.style.top = e.clientY - 14 + "px";
  }
});

/* ==========================================
   CURSOR HOVER
========================================== */
const links = document.querySelectorAll("a, button");
links.forEach(link => {
  link.addEventListener("mouseenter", () => {
    if (cursor2) cursor2.style.transform = "scale(1.8)";
  });
  link.addEventListener("mouseleave", () => {
    if (cursor2) cursor2.style.transform = "scale(1)";
  });
});

/* ==========================================
   BACK TO TOP
========================================== */
const backBtn = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (!backBtn) return;
  if (window.scrollY > 500) {
    backBtn.style.display = "block";
  } else {
    backBtn.style.display = "none";
  }
});

if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ==========================================
   BACK BUTTON STYLE
========================================== */
const topStyle = document.createElement("style");
topStyle.innerHTML = `
  #backToTop {
    position: fixed;
    bottom: 25px;
    left: 25px;
    width: 55px;
    height: 55px;
    border: none;
    border-radius: 50%;
    background: #00d4ff;
    color: #000;
    font-size: 22px;
    cursor: pointer;
    display: none;
    z-index: 9999;
    box-shadow: 0 0 25px #00d4ff;
  }
`;
document.head.appendChild(topStyle);

/* ==========================================
   THEME TOGGLE
========================================== */
const themeBtn = document.getElementById("themeToggle");
let darkMode = true;

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    darkMode = !darkMode;
    if (!darkMode) {
      document.body.classList.add("light-theme");
      themeBtn.innerHTML = "☀️";
    } else {
      document.body.classList.remove("light-theme");
      themeBtn.innerHTML = "🌙";
    }
  });
}

const themeStyle = document.createElement("style");
themeStyle.innerHTML = `
  .light-theme { background: #f5f7fa; color: #111; }
  .light-theme section { color: #111; }
  .light-theme .card,
  .light-theme .service-card,
  .light-theme .project-card { background: #fff; }
  #themeToggle {
    position: fixed;
    right: 25px;
    top: 100px;
    width: 55px;
    height: 55px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 9999;
    font-size: 22px;
    background: #00d4ff;
  }
`;
document.head.appendChild(themeStyle);

/* ==========================================
   AI CHAT WIDGET
========================================== */
const openWidget = document.getElementById("openWidget");
const aiWidget = document.getElementById("aiWidget");
const closeWidget = document.getElementById("closeWidget");

if (openWidget) {
  openWidget.addEventListener("click", () => {
    aiWidget.style.display = "block";
  });
}
if (closeWidget) {
  closeWidget.addEventListener("click", () => {
    aiWidget.style.display = "none";
  });
}

/* ==========================================
   FAKE AI CHAT
========================================== */
const widgetInput = document.querySelector(".widget-input input");
const widgetButton = document.querySelector(".widget-input button");
const widgetBody = document.querySelector(".widget-body");

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type;
  div.innerHTML = text;
  widgetBody.appendChild(div);
  widgetBody.scrollTop = widgetBody.scrollHeight;
}

function botReply(msg) {
  let reply = "Xin chào 👋";
  const lowerMsg = msg.toLowerCase();
  
  if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
    reply = "Chào bạn, mình là AI Assistant.";
  }
  if (lowerMsg.includes("website")) {
    reply = "Hoàng Hazen chuyên thiết kế website hiện đại.";
  }
  if (lowerMsg.includes("price") || lowerMsg.includes("giá")) {
    reply = "Bạn có thể xem bảng giá ở phần Pricing.";
  }
  
  setTimeout(() => {
    addMessage(reply, "bot-message");
  }, 700);
}

if (widgetButton && widgetInput) {
  widgetButton.addEventListener("click", () => {
    const text = widgetInput.value;
    if (text.trim() === "") return;
    addMessage(text, "user-message");
    botReply(text);
    widgetInput.value = "";
  });
  
  widgetInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      widgetButton.click();
    }
  });
}

/* ==========================================
   AI STYLE
========================================== */
const aiStyle = document.createElement("style");
aiStyle.innerHTML = `
  .widget-body { height: 360px; overflow-y: auto; padding: 20px; }
  .bot-message {
    background: rgba(0, 212, 255, .15);
    padding: 12px;
    border-radius: 15px;
    margin-bottom: 10px;
  }
  .user-message {
    background: rgba(124, 58, 237, .2);
    padding: 12px;
    border-radius: 15px;
    margin-bottom: 10px;
    text-align: right;
  }
`;
document.head.appendChild(aiStyle);

/* ==========================================
   MUSIC PLAYER
========================================== */
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let musicPlaying = false;

if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", () => {
    if (!musicPlaying) {
      bgMusic.play();
      musicPlaying = true;
      musicBtn.innerHTML = "⏸";
    } else {
      bgMusic.pause();
      musicPlaying = false;
      musicBtn.innerHTML = "🎵";
    }
  });
}

/* ==========================================
   MOBILE MENU
========================================== */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active-menu");
  });
}

const mobileStyle = document.createElement("style");
mobileStyle.innerHTML = `
  @media(max-width: 768px) {
    .active-menu {
      display: flex !important;
      position: absolute;
      top: 80px;
      left: 0;
      width: 100%;
      background: #050816;
      flex-direction: column;
      padding: 30px;
      gap: 20px;
    }
  }
`;
document.head.appendChild(mobileStyle);

/* ==========================================
   NAVBAR ACTIVE LINK
========================================== */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const top = sec.offsetTop;
    if (window.scrollY >= top - 200) {
      current = sec.getAttribute("id");
    }
  });
  
  navItems.forEach(link => {
    link.classList.remove("active-link");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active-link");
    }
  });
});

const navStyle = document.createElement("style");
navStyle.innerHTML = `
  .active-link { color: #00d4ff !important; }
`;
document.head.appendChild(navStyle);

/* ==========================================
   SMOOTH SCROLL
========================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ==========================================
   PARTICLES SYSTEM
========================================== */
const particleContainer = document.getElementById("particles");
if (particleContainer) {
  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDuration = (5 + Math.random() * 10) + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    particleContainer.appendChild(particle);
  }
}

const particleStyle = document.createElement("style");
particleStyle.innerHTML = `
  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: #00d4ff;
    border-radius: 50%;
    box-shadow: 0 0 10px #00d4ff;
    animation: floatParticle linear infinite;
  }
  @keyframes floatParticle {
    0% { transform: translateY(0); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-300px); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

/* ==========================================
   MOUSE GLOW EFFECT
========================================== */
const glow = document.createElement("div");
glow.id = "mouseGlow";
document.body.appendChild(glow);

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

const glowStyle = document.createElement("style");
glowStyle.innerHTML = `
  #mouseGlow {
    position: fixed;
    width: 350px;
    height: 350px;
    background: radial-gradient(circle, rgba(0, 212, 255, .15), transparent 70%);
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: -1;
  }
`;
document.head.appendChild(glowStyle);

/* ==========================================
   RANDOM STARS
========================================== */
for (let i = 0; i < 120; i++) {
  const star = document.createElement("div");
  star.classList.add("star");
  star.style.left = Math.random() * 100 + "vw";
  star.style.top = Math.random() * 100 + "vh";
  star.style.animationDelay = Math.random() * 5 + "s";
  document.body.appendChild(star);
}

const starStyle = document.createElement("style");
starStyle.innerHTML = `
  .star {
    position: fixed;
    width: 2px;
    height: 2px;
    background: white;
    border-radius: 50%;
    opacity: .6;
    animation: twinkle 4s infinite;
    pointer-events: none;
  }
  @keyframes twinkle {
    0% { opacity: .1; }
    50% { opacity: 1; }
    100% { opacity: .1; }
  }
`;
document.head.appendChild(starStyle);

/* ==========================================
   AUTO PROJECT HOVER
========================================== */
const projects = document.querySelectorAll(".project-card");
let projectIndex = 0;

setInterval(() => {
  projects.forEach(card => {
    card.style.transform = "translateY(0px)";
  });
  if (projects.length) {
    projects[projectIndex].style.transform = "translateY(-10px)";
  }
  projectIndex++;
  if (projectIndex >= projects.length) {
    projectIndex = 0;
  }
}, 3000);

/* ==========================================
   RGB BACKGROUND SHIFT
========================================== */
let hue = 0;
setInterval(() => {
  hue++;
  document.documentElement.style.setProperty("--primary", `hsl(${hue}, 100%, 60%)`);
  if (hue > 360) {
    hue = 0;
  }
}, 120);

/* ==========================================
   PARALLAX HERO
========================================== */
window.addEventListener("mousemove", e => {
  const avatar = document.querySelector(".avatar");
  if (!avatar) return;
  const x = (window.innerWidth / 2 - e.clientX) / 40;
  const y = (window.innerHeight / 2 - e.clientY) / 40;
  avatar.style.transform = `translate(${x}px, ${y}px)`;
});

/* ==========================================
   FLOATING CARDS
========================================== */
const floatingCards = document.querySelectorAll(
  ".service-card, .project-card, .certificate-card"
);

floatingCards.forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * 15;
    
    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
});

/* ==========================================
   PERFORMANCE OPTIMIZER
========================================== */
window.addEventListener("blur", () => {
  console.log("Animation paused");
});

window.addEventListener("focus", () => {
  console.log("Animation resumed");
});

/* ==========================================
   CONSOLE SIGNATURE
========================================== */
console.log(
  "%c HOANG HAZEN PORTFOLIO ",
  "background: #00d4ff; color: #000; padding: 10px; font-size: 18px; font-weight: bold"
);
console.log("AI Futuristic Portfolio Loaded");

/* ==========================================
   END SCRIPT
========================================== */
