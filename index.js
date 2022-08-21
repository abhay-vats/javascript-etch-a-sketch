// Constants
const LINE_WIDTH = 20;
const MOVEMENT = 20;
const HUE_JUMP = 10;

// Variables
let hue = 0;

// Select the elements
const canvas = document.querySelector('#etch-a-sketch');
const shakeButton = document.querySelector('.shake');

// Setup canvas for drawing
const ctx = canvas.getContext('2d');

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = LINE_WIDTH;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

// Draw first dot
const { width, height } = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// Setup draw function
function draw(key) {
  hue += HUE_JUMP;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  switch (key) {
    case 'ArrowUp':
      ctx.beginPath();
      ctx.moveTo(x, y);

      y -= MOVEMENT;

      ctx.lineTo(x, y);
      ctx.stroke();

      break;
    case 'ArrowDown':
      ctx.beginPath();
      ctx.moveTo(x, y);

      y += MOVEMENT;

      ctx.lineTo(x, y);
      ctx.stroke();

      break;
    case 'ArrowLeft':
      ctx.beginPath();
      ctx.moveTo(x, y);

      x -= MOVEMENT;

      ctx.lineTo(x, y);
      ctx.stroke();

      break;
    case 'ArrowRight':
      ctx.beginPath();
      ctx.moveTo(x, y);

      x += MOVEMENT;

      ctx.lineTo(x, y);
      ctx.stroke();

      break;

    default:
      break;
  }
}

// Setup keydown callback
const handleKeyDown = ({ key }) => key.includes('Arrow') && draw(key);

// Attach keydown listener to document
document.addEventListener('keydown', handleKeyDown);

// Setup shake/clear-shake function
const shake = () => {
  canvas.classList.add('shake');

  ctx.clearRect(0, 0, width, height);

  canvas.addEventListener(
    'animationend',
    () => canvas.classList.remove('shake'),
    { once: true }
  );
};

// Attach click listener on shake button
shakeButton.addEventListener('click', shake);
