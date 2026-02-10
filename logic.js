export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export const DEFAULT_GRID = 20;

const positionsEqual = (a, b) => a.x === b.x && a.y === b.y;

const isOpposite = (a, b) => a.x + b.x === 0 && a.y + b.y === 0;

const clampDir = (current, next) => (isOpposite(current, next) ? current : next);

const createInitialSnake = (gridSize) => {
  const mid = Math.floor(gridSize / 2);
  return [
    { x: mid, y: mid },
    { x: mid - 1, y: mid },
    { x: mid - 2, y: mid },
  ];
};

export const createRng = (seed = Date.now()) => {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return (max) => {
    state = (state * 16807) % 2147483647;
    return state % max;
  };
};

export const spawnFood = (snake, gridSize, randomInt) => {
  const taken = new Set(snake.map((p) => `${p.x},${p.y}`));
  const free = [];
  for (let y = 0; y < gridSize; y += 1) {
    for (let x = 0; x < gridSize; x += 1) {
      const key = `${x},${y}`;
      if (!taken.has(key)) free.push({ x, y });
    }
  }

  if (free.length === 0) return null;

  const index = randomInt(free.length);
  return free[index];
};

export const createInitialState = ({
  gridSize = DEFAULT_GRID,
  randomInt,
} = {}) => {
  const snake = createInitialSnake(gridSize);
  const dir = { ...DIRECTIONS.right };
  const rng = randomInt || createRng();
  const food = spawnFood(snake, gridSize, rng);

  return {
    gridSize,
    snake,
    dir,
    nextDir: dir,
    food,
    score: 0,
    alive: true,
    won: false,
    paused: false,
    rng,
  };
};

export const setDirection = (state, nextDir) => ({
  ...state,
  nextDir,
});

export const togglePause = (state) => ({
  ...state,
  paused: !state.paused,
});

export const step = (state) => {
  if (!state.alive || state.paused) return state;

  const dir = clampDir(state.dir, state.nextDir);
  const head = state.snake[0];
  const newHead = { x: head.x + dir.x, y: head.y + dir.y };

  if (
    newHead.x < 0 ||
    newHead.y < 0 ||
    newHead.x >= state.gridSize ||
    newHead.y >= state.gridSize
  ) {
    return { ...state, alive: false, dir, nextDir: dir };
  }

  const willEat = state.food && positionsEqual(newHead, state.food);
  const bodyToCheck = willEat ? state.snake : state.snake.slice(0, -1);

  if (bodyToCheck.some((segment) => positionsEqual(segment, newHead))) {
    return { ...state, alive: false, dir, nextDir: dir };
  }

  const newSnake = [newHead, ...state.snake];
  if (!willEat) newSnake.pop();

  let food = state.food;
  let score = state.score;
  let won = state.won;
  if (willEat) {
    score += 1;
    food = spawnFood(newSnake, state.gridSize, state.rng);
    if (!food) {
      won = true;
      return {
        ...state,
        snake: newSnake,
        dir,
        nextDir: dir,
        score,
        food,
        won,
        alive: false,
      };
    }
  }

  return {
    ...state,
    snake: newSnake,
    dir,
    nextDir: dir,
    score,
    food,
    won,
  };
};
