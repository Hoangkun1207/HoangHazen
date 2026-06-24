/* ==========================================
   LOADER & TYPING
========================================== */
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 2000);
  }
});

const typingText = document.querySelector(".hero-subtitle");
const words = ["Frontend Developer", "UI / UX Designer", "AI Enthusiast", "Web Creator"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
  if (!typingText) return;
  const current = words[wordIndex];
  if (!deleting) {
    typingText.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) { deleting = true; setTimeout(typeEffect, 1500); return; }
  } else {
    typingText.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) { deleting = false; wordIndex = (wordIndex + 1) % words.length; }
  }
  setTimeout(typeEffect, 100);
}
typeEffect();

/* ==========================================
   SCROLL REVEAL & PROGRESS BAR
========================================== */
const revealElements = document.querySelectorAll("section, .project-card, .about-card, .faq-item");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("show"); }
  });
}, { threshold: 0.15 });

const revealStyle = document.createElement("style");
revealStyle.innerHTML = `.hidden { opacity: 0; transform: translateY(80px); transition: 1s; } .show { opacity: 1; transform: translateY(0); }`;
document.head.appendChild(revealStyle);

revealElements.forEach(el => {
  el.classList.add("hidden");
  revealObserver.observe(el);
});

const progress = document.createElement("div");
progress.id = "progressBar";
document.body.appendChild(progress);
const progressStyle = document.createElement("style");
progressStyle.innerHTML = `#progressBar { position: fixed; top: 0; left: 0; height: 4px; width: 0; background: linear-gradient(90deg, #00d4ff, #7c3aed); z-index: 999999; }`;
document.head.appendChild(progressStyle);

window.addEventListener("scroll", () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = ((window.scrollY / total) * 100) + "%";
});

/* ==========================================
   NEW: GALLERY SCROLL SLIDE EFFECT
========================================== */
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-scroll');
    }
  });
}, { threshold: 0.2 });

galleryItems.forEach(item => {
  galleryObserver.observe(item);
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
  const drops = Array(Math.floor(columns)).fill(1);
  
  function drawMatrix() {
    ctx.fillStyle = "rgba(5, 8, 22, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00d4ff";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 35);
  window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

/* ==========================================
   CUSTOM CURSOR & GLOW
========================================== */
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector(".cursor2");
const glow = document.createElement("div");
glow.id = "mouseGlow";
document.body.appendChild(glow);
const glowStyle = document.createElement("style");
glowStyle.innerHTML = `#mouseGlow { position: fixed; width: 350px; height: 350px; background: radial-gradient(circle, rgba(0, 212, 255, .15), transparent 70%); pointer-events: none; transform: translate(-50%, -50%); z-index: -1; }`;
document.head.appendChild(glowStyle);

document.addEventListener("mousemove", e => {
  if (cursor) { cursor.style.left = e.clientX + "px"; cursor.style.top = e.clientY + "px"; }
  if (cursor2) { cursor2.style.left = e.clientX - 14 + "px"; cursor2.style.top = e.clientY - 14 + "px"; }
  glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button, input, textarea").forEach(link => {
  link.addEventListener("mouseenter", () => { if (cursor2) cursor2.style.transform = "scale(1.8)"; });
  link.addEventListener("mouseleave", () => { if (cursor2) cursor2.style.transform = "scale(1)"; });
});

/* ==========================================
   NEW: EMAILJS CONTACT FORM SUBMIT
========================================== */
// Khởi tạo EmailJS (Vào emailjs.com để lấy Public Key của bạn)
emailjs.init("YOUR_PUBLIC_KEY_HERE"); 

const contactForm = document.getElementById('emailjs-form');
const submitBtn = document.getElementById('submitBtn');

if (contactForm && submitBtn) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const btnSpan = submitBtn.querySelector('span');
    const originalText = btnSpan.innerHTML;
    
    // Đang xử lý
    btnSpan.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang Xử Lý...';
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.background = '#7c3aed';
    submitBtn.style.boxShadow = '0 0 30px #7c3aed';
    
    // Gửi Mail. Thay Service ID và Template ID của bạn vào đây
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        // Gửi thành công
        btnSpan.innerHTML = '<i class="fas fa-check"></i> Đã Gửi Thành Công';
        submitBtn.style.background = '#00ff88';
        submitBtn.style.borderColor = '#00ff88';
        submitBtn.style.boxShadow = '0 0 40px #00ff88';
        submitBtn.style.color = '#000';
        
        setTimeout(() => {
          btnSpan.innerHTML = originalText;
          submitBtn.style = ''; 
          contactForm.reset();
        }, 4000);
      }, (error) => {
        // Gửi lỗi
        btnSpan.innerHTML = '<i class="fas fa-times"></i> Lỗi Hệ Thống';
        submitBtn.style.background = '#ff0055';
        submitBtn.style.borderColor = '#ff0055';
        submitBtn.style.boxShadow = '0 0 40px #ff0055';
        console.log('FAILED...', error);
        
        setTimeout(() => {
          btnSpan.innerHTML = originalText;
          submitBtn.style = '';
        }, 4000);
      });
  });
}

/* ==========================================
   AI WIDGET & MUSIC
========================================== */
const aiWidget = document.getElementById("aiWidget");
document.getElementById("openWidget")?.addEventListener("click", () => aiWidget.style.display = "block");
document.getElementById("closeWidget")?.addEventListener("click", () => aiWidget.style.display = "none");

const aiStyle = document.createElement("style");
aiStyle.innerHTML = `.widget-header { padding: 15px; background: #00d4ff; color: #000; font-weight: bold; display: flex; justify-content: space-between; align-items: center; } .widget-header button { background: none; border: none; font-size: 18px; cursor: pointer; } .widget-input { display: flex; padding: 15px; border-top: 1px solid rgba(255,255,255,.1); } .widget-input input { flex: 1; padding: 10px; border-radius: 5px; border: none; outline: none; background: rgba(255,255,255,.05); color: #fff; } .widget-input button { padding: 10px 15px; margin-left: 10px; border-radius: 5px; border: none; background: #00d4ff; color: #000; font-weight: bold; cursor: pointer; } .widget-body { height: 350px; overflow-y: auto; padding: 20px; } .bot-message { background: rgba(0, 212, 255, .15); padding: 12px; border-radius: 15px 15px 15px 0; margin-bottom: 10px; width: fit-content; max-width: 80%; } .user-message { background: rgba(124, 58, 237, .3); padding: 12px; border-radius: 15px 15px 0 15px; margin-bottom: 10px; text-align: right; width: fit-content; max-width: 80%; margin-left: auto; } #aiWidget { position: fixed; bottom: 80px; left: 25px; width: 300px; background: #050816; border: 1px solid #00d4ff; border-radius: 10px; display: none; z-index: 9999; box-shadow: 0 0 20px rgba(0,212,255,.2); overflow: hidden; } #openWidget { position: fixed; bottom: 25px; left: 25px; width: 50px; height: 50px; border-radius: 50%; background: #00d4ff; border: none; font-size: 24px; cursor: pointer; box-shadow: 0 0 15px #00d4ff; z-index: 9998; }`;
document.head.appendChild(aiStyle);

const widgetInput = document.querySelector(".widget-input input");
const widgetButton = document.querySelector(".widget-input button");
const widgetBody = document.querySelector(".widget-body");

if (widgetButton) {
  widgetButton.addEventListener("click", () => {
    if (!widgetInput.value.trim()) return;
    const div = document.createElement("div");
    div.className = "user-message"; div.innerHTML = widgetInput.value;
    widgetBody.appendChild(div);
    setTimeout(() => {
      const botDiv = document.createElement("div"); botDiv.className = "bot-message"; botDiv.innerHTML = "Tin nhắn đã được ghi nhận. Hệ thống đang bận, xin quay lại sau!";
      widgetBody.appendChild(botDiv); widgetBody.scrollTop = widgetBody.scrollHeight;
    }, 1000);
    widgetInput.value = ""; widgetBody.scrollTop = widgetBody.scrollHeight;
  });
}

const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
if (musicBtn && bgMusic) {
  let playing = false;
  musicBtn.addEventListener("click", () => {
    playing ? bgMusic.pause() : bgMusic.play();
    playing = !playing; musicBtn.innerHTML = playing ? "⏸" : "🎵";
  });
}
const musicStyle = document.createElement("style");
musicStyle.innerHTML = `#musicPlayer { position: fixed; right: 25px; bottom: 25px; z-index: 999; } #musicToggle { width: 55px; height: 55px; border: none; border-radius: 50%; background: #7c3aed; color: #fff; font-size: 22px; cursor: pointer; box-shadow: 0 0 15px rgba(124,58,237,0.5); }`;
document.head.appendChild(musicStyle);

/* ==========================================
   MOBILE MENU & SMOOTH SCROLL
========================================== */
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuBtn) menuBtn.addEventListener("click", () => navLinks.classList.toggle("active-menu"));
const mobileStyle = document.createElement("style");
mobileStyle.innerHTML = `@media(max-width: 768px) { .active-menu { display: flex !important; position: absolute; top: 80px; left: 0; width: 100%; background: #050816; flex-direction: column; padding: 30px; gap: 20px; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); } }`;
document.head.appendChild(mobileStyle);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      navLinks.classList.remove('active-menu');
    }
  });
});

console.log("%c HOANG HAZEN PORTFOLIO ", "background: #00d4ff; color: #000; padding: 10px; font-size: 18px; font-weight: bold; border-radius: 5px;");
console.log("AI Futuristic Portfolio Loaded Successfully.");
