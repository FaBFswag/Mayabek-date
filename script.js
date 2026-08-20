const screens = [...document.querySelectorAll(".screen")];
const envelope = document.getElementById("envelope");
const openBtn = document.getElementById("openBtn");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const choiceArea = document.getElementById("choiceArea");
const hint = document.getElementById("hint");
const continueBtn = document.getElementById("continueBtn");
const restartBtn = document.getElementById("restartBtn");
const bgMusic = document.getElementById("bgMusic");

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const placeInput = document.getElementById("place");

const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const finalPlace = document.getElementById("finalPlace");

let noAttempts = 0;

function showScreen(number) {
  screens.forEach((screen, index) => {
    screen.classList.toggle("active", index === number - 1);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = ["♥", "♡", "❤", "💗"][Math.floor(Math.random() * 4)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";
  heart.style.animationDuration = 5 + Math.random() * 6 + "s";

  document.querySelector(".hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 12000);
}

setInterval(createHeart, 650);

openBtn.addEventListener("click", () => {
  envelope.classList.add("open");

  // Музыка начнет работать, если ты добавишь music.mp3 и source в HTML.
  if (bgMusic.querySelector("source")) {
    bgMusic.play().catch(() => {});
  }

  setTimeout(() => showScreen(2), 1050);
});

function moveNoButton() {
  noAttempts++;

  const areaRect = choiceArea.getBoundingClientRect();
  const buttonRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(20, areaRect.width - buttonRect.width);
  const maxY = Math.max(20, areaRect.height - buttonRect.height);

  const x = Math.random() * maxX - maxX / 2;
  const y = Math.random() * maxY - maxY / 2;

  noBtn.style.position = "absolute";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  const messages = [
    "Не получится 😏",
    "Эй, куда? 😂",
    "Попробуй ещё раз!",
    "Нет-нет, эта кнопка убегает 🙈",
    "Кажется, судьба решила за тебя ❤️"
  ];

  hint.textContent = messages[Math.min(noAttempts - 1, messages.length - 1)];

  if (noAttempts >= 5) {
    noBtn.textContent = "Ну ладно... 😭";
  }
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  moveNoButton();
});
noBtn.addEventListener("click", (event) => {
  event.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  showScreen(3);

  // По умолчанию ставим ближайшую подходящую дату — завтра.
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dateInput.value = tomorrow.toISOString().split("T")[0];
});

continueBtn.addEventListener("click", () => {
  if (!dateInput.value) {
    dateInput.focus();
    return;
  }

  const date = new Date(dateInput.value + "T00:00:00");

  finalDate.textContent = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  finalTime.textContent = timeInput.value || "18:00";
  finalPlace.textContent = placeInput.value;

  showScreen(4);
});

restartBtn.addEventListener("click", () => {
  envelope.classList.remove("open");
  noAttempts = 0;
  noBtn.style.position = "relative";
  noBtn.style.transform = "";
  noBtn.textContent = "Нет 🙈";
  hint.textContent = "Попробуй нажать «Нет» 😏";
  showScreen(1);
});
