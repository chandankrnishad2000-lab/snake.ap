import {
  DIRECTIONS,
  createInitialState,
  setDirection,
  step,
  togglePause,
} from "./logic.js";

const canvas = document.getElementById("game");
const scoreEl = document.getElementById("score");
const stateEl = document.getElementById("state");
const restartBtn = document.getElementById("restart");
const pauseBtn = document.getElementById("pause");
const touchControls = document.querySelector(".touch-controls");

const ctx = canvas.getContext("2d");

const GRID_SIZE = 20;
const CELL_SIZE = Math.floor(canvas.width / GRID_SIZE);
const TICK_MS = 120;

let game = createInitialState({ gridSize: GRID_SIZE });

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "#e2e2e2";
  for (let i = 0; i <= GRID_SIZE; i += 1) {
    const pos = i * CELL_SIZE;
    ctx.beginPath();
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, canvas.height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, pos);
    ctx.lineTo(canvas.width, pos);
    ctx.stroke();
  }

  if (game.food) {
    ctx.fillStyle = "#d64545";
    ctx.fillRect(
      game.food.x * CELL_SIZE + 2,
      game.food.y * CELL_SIZE + 2,
      CELL_SIZE - 4,
      CELL_SIZE - 4
    );
  }

  ctx.fillStyle = "#2c2c2c";
  game.snake.forEach((segment, index) => {
    const inset = index === 0 ? 2 : 4;
    ctx.fillRect(
      segment.x * CELL_SIZE + inset,
      segment.y * CELL_SIZE + inset,
      CELL_SIZE - inset * 2,
      CELL_SIZE - inset * 2
    );
  });

  scoreEl.textContent = `Score: ${game.score}`;

  if (!game.alive) {
    stateEl.textContent = game.won ? "You win" : "Game over";
  } else if (game.paused) {
    stateEl.textContent = "Paused";
  } else {
    stateEl.textContent = "Running";
  }

  pauseBtn.textContent = game.paused ? "Resume" : "Pause";
};

const restart = () => {
  game = createInitialState({ gridSize: GRID_SIZE });
  render();
};

const handleDirection = (dir) => {
  game = setDirection(game, dir);
};

const keyMap = {
  ArrowUp: DIRECTIONS.up,
  ArrowDown: DIRECTIONS.down,
  ArrowLeft: DIRECTIONS.left,
  ArrowRight: DIRECTIONS.right,
  w: DIRECTIONS.up,
  a: DIRECTIONS.left,
  s: DIRECTIONS.down,
  d: DIRECTIONS.right,
};

window.addEventListener("keydown", (event) => {
  const key = event.key;
  if (key === " " || key === "Spacebar") {
    event.preventDefault();
    game = togglePause(game);
    render();
    return;
  }
  if (key === "r" || key === "R") {
    restart();
    return;
  }
  const dir = keyMap[key];
  if (dir) {
    event.preventDefault();
    handleDirection(dir);
  }
});

restartBtn.addEventListener("click", restart);

pauseBtn.addEventListener("click", () => {
  game = togglePause(game);
  render();
});

if (touchControls) {
  touchControls.addEventListener("click", (event) => {
    const btn = event.target.closest("button[data-dir]");
    if (!btn) return;
    const dirKey = btn.getAttribute("data-dir");
    const dir = DIRECTIONS[dirKey];
    if (dir) handleDirection(dir);
  });
}

const tick = () => {
  game = step(game);
  render();
};

render();
setInterval(tick, TICK_MS);
