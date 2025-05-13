// Wait for the page to fully load before hiding the preloader
window.addEventListener("load", () => {
  document.querySelector(".preloader").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  }, 500);

  // Start floating balloons
  launchBalloons();
});

// Blow candles, hide flames, add smoke & show next sections
function blowCandles() {
  const flames = document.querySelectorAll(".flame");
  flames.forEach(flame => {
    flame.style.display = "none";
    createSmoke(flame.parentElement);
  });

  document.querySelector(".birthday-message").classList.add("show-message", "move-up");

  setTimeout(() => {
    confetti();
  }, 500);

  setTimeout(() => {
    document.querySelector(".music-control").classList.add("show");
    document.querySelector(".memories").classList.add("show");
    document.querySelector(".quotes-section").classList.add("show");
    document.querySelector(".image-marquee-section").classList.add("show");
    document.querySelector(".memory-jar-section").classList.add("show");
    document.querySelector(".stars-launch").classList.add("show");
    document.querySelector(".wish-wall").classList.add("show");

    document.querySelector(".memories").scrollIntoView({ behavior: "smooth" });
  }, 3000);
}

// Create smoke effect where the flame was
function createSmoke(container) {
  const smoke = document.createElement("div");
  smoke.classList.add("smoke");
  container.appendChild(smoke);
  setTimeout(() => {
    container.removeChild(smoke);
  }, 2000);
}

// Quote carousel logic
let currentQuote = 0;
function nextQuote() {
  const quotes = document.querySelectorAll(".quote");
  quotes[currentQuote].classList.remove("active");
  currentQuote = (currentQuote + 1) % quotes.length;
  quotes[currentQuote].classList.add("active");
}

// Music control
document.getElementById("music-btn").addEventListener("click", () => {
  const music = document.getElementById("birthday-music");
  if (music.paused) {
    music.play();
    document.getElementById("music-btn").textContent = "⏸ Pause Music";
  } else {
    music.pause();
    document.getElementById("music-btn").textContent = "🎵 Play Music";
  }
});

// Balloons generator
function launchBalloons() {
  const balloonContainer = document.querySelector(".balloons");
  const colors = ["#ff69b4", "#ffa07a", "#ffb6c1", "#ff6347", "#db7093", "#ffc0cb"];

  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("img");
    balloon.src = "balloons.png";
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 100 + "vw";
    balloon.style.animationDelay = Math.random() * 10 + "s";
    balloon.style.width = Math.random() * 30 + 40 + "px";
    balloon.style.zIndex = "0";
    balloon.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
    balloonContainer.appendChild(balloon);
  }
}

// Confetti animation
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

function resizeCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiPieces = [];
for (let i = 0; i < 100; i++) {
  confettiPieces.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    radius: Math.random() * 2 + 2,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    dx: (Math.random() - 0.5) * 2,
    dy: Math.random() * 2,
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });

  requestAnimationFrame(drawConfetti);
}
drawConfetti();

// Focus effect on center image
function updateImageFocus() {
  const wrapper = document.querySelector(".image-marquee-wrapper");
  const images = document.querySelectorAll(".marquee-img");
  const center = wrapper.getBoundingClientRect().width / 2;

  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    const imgCenter = rect.left + rect.width / 2;

    if (Math.abs(center - imgCenter) < rect.width / 2) {
      img.style.filter = "blur(0px)";
      img.style.opacity = "1";
      img.style.transform = "scale(1.05)";
    } else {
      img.style.filter = "blur(5px)";
      img.style.opacity = "0.6";
      img.style.transform = "scale(1)";
    }
  });

  requestAnimationFrame(updateImageFocus);
}
requestAnimationFrame(updateImageFocus);

// Reveal note from memory jar
function revealNote(note) {
  if (!note.classList.contains("revealed")) {
    const messages = [
      "Remember our first trip? 🛣️",
      "The midnight call? 🌙",
      "Your goofy laugh! 😂",
      "Your secret spot. 🌳",
      "Forgeting you birthdays!! 🎉"
    ];

    const back = note.querySelector(".note-back");
    back.textContent = messages[Math.floor(Math.random() * messages.length)];
    note.classList.add("revealed");
  }
}

// Wish Wall submit logic with fold & fly animation
document.getElementById("wish-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("wish-input");
  const wishText = input.value.trim();
  if (wishText) {
    const note = document.createElement("div");
    note.className = "wish-note";
    note.textContent = wishText;

    // Position the note randomly within the board
    note.style.top = Math.random() * 200 + "px";
    note.style.left = Math.random() * 80 + 10 + "%";

    const board = document.getElementById("wish-board");
    board.appendChild(note);
    input.value = "";

    // Wait 3 seconds, then animate the fold-and-fly
    setTimeout(() => {
      note.classList.add("fold-and-fly");
    }, 3000);

    // Remove note from DOM after animation completes
    note.addEventListener("animationend", () => {
      note.remove();
    });
  }
});
