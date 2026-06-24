/* ======================================================
   GLOBAL HELPERS
====================================================== */
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* ======================================================
   GLOBAL HELPERS
====================================================== */
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

/* ======================================================
   LOADER CONTROL (ĐÃ FIX LỖI KẸT)
====================================================== */
// Cách 1: Tắt Loader ngay khi cấu trúc HTML sẵn sàng (không đợi video nặng)
document.addEventListener("DOMContentLoaded", () => {
  const loader = $("#loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.transition = "0.6s ease";
      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, 1200);
  }
});

// Cách 2: Fallback an toàn - Ép buộc ẩn Loader sau tối đa 3.5 giây 
// phòng trường hợp JS bị lỗi mạng không kích hoạt được DOMContentLoaded
setTimeout(() => {
  const loader = $("#loader");
  if (loader && loader.style.display !== "none") {
    loader.style.opacity = "0";
    loader.style.transition = "0.6s ease";
    setTimeout(() => {
      loader.style.display = "none";
    }, 600);
  }
}, 3500);

/* ======================================================
   SMOOTH SCROLL NAVIGATION
====================================================== */
// ... (GIỮ NGUYÊN TOÀN BỘ CODE BÊN DƯỚI CỦA BẠN TỪ ĐOẠN NÀY TRỞ ĐI) ...

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
   CURSOR FOLLOW SYSTEM (Tối ưu tâm chuột)
====================================================== */
const cursor = $(".cursor");
const follower = $(".cursor-follower");

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Trừ đi một nửa kích thước để con trỏ nằm chính giữa (8px -> trừ 4)
  if(cursor) cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
});

function animateCursor() {
  currentX += (mouseX - currentX) * 0.12;
  currentY += (mouseY - currentY) * 0.12;

  // Trừ 17.5px vì follower width/height là 35px
  if(follower) follower.style.transform = `translate(${currentX - 17.5}px, ${currentY - 17.5}px)`;
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
   SCROLL REVEAL SYSTEM (Animation khi cuộn chuột)
====================================================== */
const revealElements = $$(".project-card, .about-grid, .skill, .pricing-card, .contact-wrapper");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => {
  el.classList.add("reveal-hidden");
  revealObserver.observe(el);
});

/* ======================================================
   SIMPLE PARTICLES SYSTEM (CANVAS LIGHT)
====================================================== */
const canvas = $("#particles");
if (canvas) {
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

      ctx.fillStyle = "rgba(0,212,255,0.4)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

/* ======================================================
   AI WIDGET (Logic Chatbot Tương Lai)
====================================================== */
const aiWidget = $("#ai-widget");
const openAI = $("#openAI");
const closeAI = $("#closeAI");
const aiInput = $(".ai-input input");
const aiSendBtn = $(".ai-input button");
const aiBody = $(".ai-body");

if (openAI && closeAI && aiWidget) {
  openAI.addEventListener("click", () => {
    aiWidget.classList.toggle("hidden");
  });
  closeAI.addEventListener("click", () => {
    aiWidget.classList.add("hidden");
  });
}

function botReply(msg) {
  const reply = document.createElement("p");
  reply.style.color = "var(--primary)";
  reply.style.marginTop = "10px";
  reply.style.fontWeight = "500";
  
  let response = "Xin lỗi, dữ liệu của tôi chưa được cập nhật câu hỏi này. Hãy gửi tin nhắn qua form liên hệ nhé! 😅";
  const lowerMsg = msg.toLowerCase();

  if (lowerMsg.includes("chào") || lowerMsg.includes("hello")) {
    response = "Xin chào 👋 Tôi là AI Assistant của Việt Hoàng. Tôi có thể giúp gì cho bạn?";
  } else if (lowerMsg.includes("web") || lowerMsg.includes("giá")) {
    response = "Hoàng chuyên nhận làm Web chuẩn UI/UX, tích hợp Auto SePay và AI. Giá gói Premium chỉ từ 2.999.000đ nha!";
  } else if (lowerMsg.includes("game") || lowerMsg.includes("pixel")) {
    response = "Đúng rồi! Việt Hoàng rất đam mê game Pixel Art và có khả năng thiết kế UI phong cách này rất mượt.";
  } else if (lowerMsg.includes("thanh toán") || lowerMsg.includes("sepay")) {
    response = "Hệ thống tự động hóa thanh toán bằng SePay quét giao dịch MB Bank cực nhanh, giúp web tự động duyệt đơn hàng.";
  }

  reply.innerHTML = `<i class="fas fa-robot"></i> AI: ${response}`;
  aiBody.appendChild(reply);
  aiBody.scrollTop = aiBody.scrollHeight;
}

function handleAiSubmit() {
  const msg = aiInput.value.trim();
  if (!msg) return;

  const userMsg = document.createElement("p");
  userMsg.style.color = "#fff";
  userMsg.style.marginTop = "10px";
  userMsg.innerHTML = `<i class="fas fa-user"></i> Bạn: ${msg}`;
  aiBody.appendChild(userMsg);

  aiInput.value = "";
  
  // Giả lập AI gõ chữ (delay 600ms)
  setTimeout(() => {
    botReply(msg);
  }, 600);
}

if (aiInput) {
  aiInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAiSubmit();
  });
  aiSendBtn.addEventListener("click", handleAiSubmit);
}

/* ======================================================
   EMAILJS - TỰ ĐỘNG GỬI FORM LIÊN HỆ
====================================================== */
// Khởi tạo EmailJS
(function() {
  if(typeof emailjs !== 'undefined') {
      emailjs.init("YOUR_PUBLIC_KEY"); // <-- ĐIỀN PUBLIC KEY CỦA BẠN VÀO ĐÂY
  }
})();

const contactForm = $("#contactForm");

if(contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const name = $("#user_name").value;
    const email = $("#user_email").value;
    const message = $("#message").value;

    const templateParams = {
      from_name: name,
      reply_to: email,
      message: message
    };

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
    submitBtn.disabled = true;

    // Gửi email
    // ĐIỀN SERVICE_ID VÀ TEMPLATE_ID CỦA BẠN XUỐNG DƯỚI
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
      .then(function() {
         alert("✅ Tin nhắn đã được gửi thành công! Việt Hoàng sẽ liên hệ lại với bạn sớm nhất.");
         contactForm.reset();
         submitBtn.innerHTML = originalText;
         submitBtn.disabled = false;
      }, function(error) {
         console.log('Lỗi EmailJS:', error);
         alert("❌ Có lỗi xảy ra. Hãy kiểm tra lại kết nối hoặc gửi trực tiếp qua mail.");
         submitBtn.innerHTML = originalText;
         submitBtn.disabled = false;
      });
  });
}
