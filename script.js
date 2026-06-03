const input = document.getElementById("message-input");
const messagesEnd = document.getElementById("messages-end");
const emojiBtn = document.getElementById("emoji-btn");
const gifBtn = document.getElementById("gif-btn");

const emojiPool = ["😎", "🔥", "😂", "💻", "✨", "🚀", "😈", "🤖", "🎧", "🛠️"];
const gifPool = [
  "https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif",
  "https://media.giphy.com/media/l0HlOvJ7yaacpuSas/giphy.gif",
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif"
];

function appendMessage(text, withRandomGif = false) {
  if (!text.trim() && !withRandomGif) return;

  const wrapper = document.createElement("div");
  wrapper.className = "message";

  const avatar = document.createElement("div");
  avatar.className = "avatar small";
  avatar.textContent = "A";

  const body = document.createElement("div");
  body.className = "message-body";

  const header = document.createElement("div");
  header.className = "message-header";

  const username = document.createElement("span");
  username.className = "username";
  username.innerHTML = `
    Alexander
    <span class="role-pill role-admin">ADMIN</span>
  `;

  const timestamp = document.createElement("span");
  timestamp.className = "timestamp";
  const now = new Date();
  const hh = now.getHours().toString().padStart(2, "0");
  const mm = now.getMinutes().toString().padStart(2, "0");
  timestamp.textContent = `Today at ${hh}:${mm}`;

  header.appendChild(username);
  header.appendChild(timestamp);

  const msgText = document.createElement("div");
  msgText.className = "message-text";
  msgText.textContent = text;

  body.appendChild(header);
  if (text.trim()) body.appendChild(msgText);

  if (withRandomGif) {
    const attachments = document.createElement("div");
    attachments.className = "message-attachments";
    const img = document.createElement("img");
    img.className = "gif";
    img.alt = "GIF";
    img.src = gifPool[Math.floor(Math.random() * gifPool.length)];
    attachments.appendChild(img);
    body.appendChild(attachments);
  }

  wrapper.appendChild(avatar);
  wrapper.appendChild(body);

  messagesEnd.before(wrapper);
  messagesEnd.scrollIntoView({ behavior: "smooth" });
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    appendMessage(input.value);
    input.value = "";
  }
});

emojiBtn.addEventListener("click", () => {
  const emoji = emojiPool[Math.floor(Math.random() * emojiPool.length)];
  input.value += (input.value ? " " : "") + emoji;
  input.focus();
});

gifBtn.addEventListener("click", () => {
  if (!input.value.trim()) {
    appendMessage("", true);
  } else {
    appendMessage(input.value, true);
    input.value = "";
  }
});
