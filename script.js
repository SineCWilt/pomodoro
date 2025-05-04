let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let isWorkSession = true; // true = work, false = break
const workDuration = 25; // minutes
const breakDuration = 5; // minutes


const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay() {
  minutesDisplay.textContent = String(minutes).padStart(2, '0');
  secondsDisplay.textContent = String(seconds).padStart(2, '0');
}

function showModal(message) {
    const modal = document.getElementById("customModal");
    const modalText = document.getElementById("modalMessage");
  
    modalText.textContent = message;
    modal.style.display = "block";
  }
  
  document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("customModal").style.display = "none";
  });
  

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    if (seconds === 0) {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            isRunning = false;
            
            const alarm = document.getElementById('alarmSound');
            alarm.play().catch(e => console.warn("Sound play blocked:", e));
          
            if (isWorkSession) {
              showModal("Work session complete! Time for a break.");
              isWorkSession = false;
              minutes = breakDuration;
              seconds = 0;
              updateDisplay();
              startTimer(); // Auto-start break
            } else {
              showModal("Break over! Time to get back to work.");
              isWorkSession = true;
              minutes = workDuration;
              seconds = 0;
              updateDisplay();
              startTimer(); // Auto-start work
            }
          }
          
          
      minutes--;
      seconds = 59;
    } else {
      seconds--;
    }
    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    if (isWorkSession) {
      minutes = workDuration;
    } else {
      minutes = breakDuration;
    }
    seconds = 0;
    updateDisplay();
  }
  

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateDisplay();
