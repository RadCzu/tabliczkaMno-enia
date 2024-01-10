


window.onload = function () {
  console.log("hello world");
  newExample();
  setInterval(passSecond, 1000);

  const answerInput = document.getElementById("answer");
  answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {

      verifyEquation();
    }
  });
}


function passSecond() {
  const remainingTimeElement = document.getElementById("time-remaining");
  let remainingTime = remainingTimeElement.textContent;

  const [minutes, seconds] = remainingTime.split(":").map(Number);

  const totalRemainingSeconds = minutes * 60 + seconds;

  const updatedRemainingSeconds = totalRemainingSeconds - 1;

  if (updatedRemainingSeconds < 0) {
    document.getElementById("death").play();
    newExample();
  } else {
      const updatedMinutes = Math.floor(updatedRemainingSeconds / 60);
      const updatedSeconds = updatedRemainingSeconds % 60;

      const formattedMinutes = String(updatedMinutes).padStart(2, '0');
      const formattedSeconds = String(updatedSeconds).padStart(2, '0');

      remainingTimeElement.textContent = `${formattedMinutes}:${formattedSeconds}`;
  }

  
}

function setTime(seconds) {
  const remainingTime = document.getElementById("time-remaining");
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  remainingTime.innerText = `${formattedMinutes}:${formattedSeconds}`
}

function generateEquation(lower, higher) {
  random1 = Math.floor(Math.random() * (higher- lower)) + lower;
  random2 = Math.floor(Math.random() * (higher - lower)) + lower;

  return {random1: random1, random2: random2}
}

function verifyEquation() {
  const answerInput = document.getElementById("answer");
  const userInput = parseInt(answerInput.value, 10);

  if (isNaN(userInput)) {
    console.log("Invalid input. Please enter a number.");
    answerInput.value = "";  // Clear the input field
    return;
  }

  const { random1, random2 } = getEquationNumbers();

  const correctAnswer = random1 * random2;

  if (userInput === correctAnswer) {
    document.getElementById("win").play();
  } else {
    document.getElementById("death").play();

  }
  newExample();
}

function newExample() {
  const answerInput = document.getElementById("answer");
  numbers = getEquationNumbers();
  answerInput.value = "";
  if(numbers.random1*numbers.random > 169) {
    setTime(20);
  } else {
    setTime(10);
  }

  setPrevious(`${numbers.random1}x${numbers.random2}=${numbers.random1*numbers.random2}`);
  setEquation();
}

function setPrevious(text) {
  const previous = document.getElementById("previous");
  previous.textContent = text;
}

function getEquationNumbers() {
  const mathElement = document.getElementById("math");
  const [random1, random2] = mathElement.textContent.split("x").map(num => parseInt(num.trim(), 10));
  return { random1, random2 };
}

function setEquation() {
  const remainingTime = document.getElementById("math");
  const numbers = generateEquation(2, 20);
  remainingTime.textContent = `${numbers.random1} x ${numbers.random2}`;
}

