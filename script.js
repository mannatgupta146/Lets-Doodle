const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const resetEl = document.getElementById('reset');
const currentColorEl = document.getElementById('current-color');

const ctx = canvas.getContext('2d');

let size = 5;
let isPressed = false;
let color = colorEl.value;
let x, y;

currentColorEl.style.backgroundColor = color;

// Event Listeners
canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

document.addEventListener('mouseup', () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);

    x = x2;
    y = y2;
  }
});

increaseBtn.addEventListener('click', () => {
  size += 5;
  if (size > 50) size = 50;
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 5;
  if (size < 5) size = 5;
  updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
  currentColorEl.style.backgroundColor = color;
});

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

resetEl.addEventListener('click', () => {
  size = 5;
  color = 'black';
  colorEl.value = 'black';
  currentColorEl.style.backgroundColor = color;
  updateSizeOnScreen();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Functions
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}
