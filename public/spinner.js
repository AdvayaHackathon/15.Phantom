const suggestions = [
    "Drink warm tea 🍵",
    "Stretch for 2 mins 🧘",
    "Text a friend 💬",
    "Watch your comfort show 🎬",
    "Take deep breaths 🌬️",
    "Write down your thoughts ✍️",
    "Listen to calming music 🎧",
    "Take a short walk 🚶‍♀️",
    "Wrap yourself in a blanket 🛌",
    "Compliment yourself 💖"
  ];
  
  const wheel = document.getElementById("wheel");
  const result = document.getElementById("result");
  
  function spinWheel() {
    const angle = 360 * 5 + Math.floor(Math.random() * 360); // 5 full rotations + random
    wheel.style.transform = `rotate(${angle}deg)`;
  
    const index = Math.floor(Math.random() * suggestions.length);
    setTimeout(() => {
      result.textContent = suggestions[index];
    }, 4000); // Wait until the spin animation ends
  }
  