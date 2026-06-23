/* ==========================
LOADER
========================== */

window.addEventListener("load",()=>{

console.log("Hoang Hazen Portfolio Loaded");

});

/* ==========================
PARTICLES
========================== */

const particleContainer =
document.getElementById("particles");

for(let i=0;i<80;i++){

let particle =
document.createElement("div");

let size =
Math.random()*5+2;

particle.style.position="absolute";

particle.style.width=size+"px";

particle.style.height=size+"px";

particle.style.borderRadius="50%";

particle.style.background="#00d4ff";

particle.style.opacity=Math.random();

particle.style.left=
Math.random()*100+"%";

particle.style.top=
Math.random()*100+"%";

particle.style.animation=
`float ${Math.random()*8+5}s infinite`;

particleContainer.appendChild(particle);

}

/* ==========================
TYPING EFFECT
========================== */

const heroTitle =
document.querySelector(".hero-left h2");

const texts = [

"Frontend Developer",
"Web Designer",
"AI Enthusiast",
"UI/UX Creator"

];

let textIndex = 0;

setInterval(()=>{

heroTitle.innerText =
texts[textIndex];

textIndex++;

if(textIndex>=texts.length){

textIndex=0;

}

},2500);

/* ==========================
SCROLL REVEAL
========================== */

const sections =
document.querySelectorAll("section");

const observer =
new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity=1;

entry.target.style.transform=
"translateY(0px)";

}

});

});

sections.forEach(sec=>{

sec.style.opacity=0;

sec.style.transform=
"translateY(60px)";

sec.style.transition="1s";

observer.observe(sec);

});

/* ==========================
BACK TO TOP
========================== */

const topBtn =
document.createElement("div");

topBtn.innerHTML="⬆";

topBtn.style.position="fixed";

topBtn.style.right="30px";

topBtn.style.bottom="30px";

topBtn.style.width="55px";

topBtn.style.height="55px";

topBtn.style.borderRadius="50%";

topBtn.style.background="#00d4ff";

topBtn.style.color="#000";

topBtn.style.display="flex";

topBtn.style.justifyContent="center";

topBtn.style.alignItems="center";

topBtn.style.cursor="pointer";

topBtn.style.zIndex="999";

document.body.appendChild(topBtn);

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================
CUSTOM CURSOR
========================== */

const cursor =
document.createElement("div");

cursor.style.position="fixed";

cursor.style.width="12px";

cursor.style.height="12px";

cursor.style.borderRadius="50%";

cursor.style.background="#00d4ff";

cursor.style.pointerEvents="none";

cursor.style.zIndex="99999";

document.body.appendChild(cursor);

document.addEventListener("mousemove",e=>{

cursor.style.left=e.clientX+"px";

cursor.style.top=e.clientY+"px";

});

/* ==========================
DARK MODE
========================== */

const darkBtn =
document.createElement("button");

darkBtn.innerHTML="🌙";

darkBtn.style.position="fixed";

darkBtn.style.right="30px";

darkBtn.style.bottom="100px";

darkBtn.style.width="55px";

darkBtn.style.height="55px";

darkBtn.style.borderRadius="50%";

darkBtn.style.border="none";

darkBtn.style.cursor="pointer";

darkBtn.style.zIndex="999";

document.body.appendChild(darkBtn);

let dark=true;

darkBtn.onclick=()=>{

if(dark){

document.body.style.background="#f5f5f5";

document.body.style.color="#000";

dark=false;

}else{

document.body.style.background="#050816";

document.body.style.color="#fff";

dark=true;

}

};

/* ==========================
SCROLL PROGRESS
========================== */

const progress =
document.createElement("div");

progress.style.position="fixed";

progress.style.top="0";

progress.style.left="0";

progress.style.height="4px";

progress.style.background=
"linear-gradient(90deg,#00d4ff,#4f46e5)";

progress.style.zIndex="99999";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

let totalHeight=

document.documentElement.scrollHeight
-window.innerHeight;

let percent=

(window.scrollY/totalHeight)*100;

progress.style.width=
percent+"%";

});

/* ==========================
MATRIX EFFECT
========================== */

const canvas =
document.createElement("canvas");

canvas.id="matrix";

canvas.style.position="fixed";

canvas.style.top="0";

canvas.style.left="0";

canvas.style.width="100%";

canvas.style.height="100%";

canvas.style.zIndex="-2";

canvas.style.opacity=".08";

document.body.appendChild(canvas);

const ctx =
canvas.getContext("2d");

canvas.width=
window.innerWidth;

canvas.height=
window.innerHeight;

const letters=
"01HOANGHAZENAI";

const fontSize=14;

const columns=
canvas.width/fontSize;

const drops=[];

for(let i=0;i<columns;i++){

drops[i]=1;

}

function draw(){

ctx.fillStyle=
"rgba(5,8,22,.1)";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);

ctx.fillStyle="#00d4ff";

ctx.font=
fontSize+"px monospace";

for(let i=0;i<drops.length;i++){

const text=
letters[
Math.floor(
Math.random()*
letters.length
)
];

ctx.fillText(
text,
i*fontSize,
drops[i]*fontSize
);

if(
drops[i]*fontSize>
canvas.height &&
Math.random()>0.98
){

drops[i]=0;

}

drops[i]++;

}

}

setInterval(draw,35);

/* ==========================
CONSOLE SIGNATURE
========================== */

console.log(
"%cHoang Hazen AI Portfolio",
"color:#00d4ff;font-size:22px;"
);
