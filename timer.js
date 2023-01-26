
const timerButton = document.getElementById("timerButton");

const timeRemaining = document.getElementById("timeRemaining")

const startTimer = () => {
    const timer = 1 * 10 * 1000; // 30 minutes in milliseconds
    const endTime = Date.now() + timer;
    timerButton.innerHTML = ""; // remove the original button
    let minutes;
    let seconds;
  
    const intervalId = setInterval(() => {
      const timeLeft = endTime - Date.now();
      if (timeLeft < 0) {
        timeRemaining.classList.add("hidden");
        clearInterval(intervalId);
        timerButton.innerHTML = `<button onclick="startTimer()">Klicka här för att starta timer för ugnen</button>`;
        timeRemaining.innerHTML = "";
      } 
      else 
      {
      minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      timeRemaining.classList.remove("hidden");
      timeRemaining.innerHTML = `Återstående tid på ugnen: ${minutes} minuter och ${seconds} sekunder`;
      }
    }, 1000);
  }
  
  timerButton.innerHTML = `<button onclick="startTimer()">Klicka här för att starta timer för ugnen</button>`;
  