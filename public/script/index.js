// frontend/index.js

const form = document.getElementById("chatForm");
const input = document.getElementById("questionInput");

const messages = [
  {
    role: "system",
    content: "Mindig rövid, tömör, lényegretörő választ adj!"
  }
];

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const value = input.value;
  console.log("Beküldött kérdés:", value);
  addMessage(value, 'user');

  try {
    const response = await fetch('/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: value })
    });

    const data = await response.json();
    console.log(data.answer);
    addMessage(data.answer, 'ai');
  } catch (error) {
    console.error('Hiba történt:', error);
  }
});

function addMessage(message, side) {
  document.getElementById('chat').innerHTML += `<div class="${side}"><p>${message}</p></div>`;
}
