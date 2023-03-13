function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const color = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

color.stopBtn.disabled = true;

color.startBtn.addEventListener('click', startButton);
color.stopBtn.addEventListener('click', stopButton);

function startButton() {
  color.body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  color.startBtn.disabled = true;
  color.stopBtn.disabled = false;
}

function stopButton() {
  clearInterval(timerId);
  color.startBtn.disabled = false;
  color.stopBtn.disabled = true;
}
