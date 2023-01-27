const timerButton = document.getElementById("timerButton");

const timeRemaining = document.getElementById("timeRemaining")

const startTimer = () => {
    // Timer är 30 min
    const timer =  30 * 60 * 1000; 
    const endTime = Date.now() + timer;
    timerButton.innerHTML = ""; 
    let minutes;
    let seconds;
  
    const intervalId = setInterval(() => {
      const timeLeft = endTime - Date.now();
      if (timeLeft < 0) 
      {
        alert("Tiden är slut! Ta ut auberginen ur ugnen!")
        timeRemaining.classList.add("hidden");
        clearInterval(intervalId);
        timerButton.innerHTML = `<button class="timerButton" onclick="startTimer()">Klicka här för att starta timer för ugnen</button>`;
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
  
  timerButton.innerHTML = `<button class="timerButton" onclick="startTimer()">Klicka här för att starta timer för ugnen</button>`;
  