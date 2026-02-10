# Classic Snake Game

A classic implementation of the Snake game built with vanilla JavaScript, HTML5 Canvas, and CSS. Control the snake to eat food, grow longer, and achieve the highest score!

## Features

- 🐍 **Classic Gameplay**: Navigate the snake to eat food and grow longer
- 🎮 **Multiple Control Methods**: 
  - Arrow keys for direction
  - WASD keys for direction
  - On-screen touch buttons for mobile devices
  - Space bar to pause/resume
  - R key to restart
- 📊 **Score Tracking**: Real-time score display as you eat food
- 🖼️ **Canvas-based Rendering**: Smooth graphics using HTML5 Canvas
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⏸️ **Pause/Resume**: Pause the game anytime and continue later
- 🔄 **Restart**: Reset the game instantly with the Restart button

## How to Play

1. **Start the Game**: Open `index.html` in a web browser
2. **Move the Snake**: 
   - Use **Arrow Keys**, **WASD**, or **On-screen buttons** to change direction
3. **Eat Food**: Navigate the snake to the red food tiles to grow and increase your score
4. **Avoid Collision**: Don't hit the walls or yourself!
5. **Pause/Resume**: Press **Space** or click the Pause button
6. **Restart**: Press **R** or click the Restart button

## Game Rules

- The snake starts in the middle of the 20×20 grid with 3 segments
- Each food eaten increases your score by 1 and adds a new segment to the snake
- Game ends when the snake hits a wall or collides with itself
- The game runs at 120ms per tick for smooth gameplay

## Project Structure

```
snake.ap/
├── index.html      # Main HTML file with game canvas and controls
├── app.js          # Game rendering and event handling logic
├── logic.js        # Core game state and movement logic
├── style.css       # Styling and responsive design
└── README.md       # This file
```

## File Descriptions

- **index.html**: Contains the game canvas, score/state display, control buttons, and directional pad for mobile
- **app.js**: Handles canvas rendering, game loop, keyboard/touch input, and UI updates
- **logic.js**: Implements game state management, snake movement, food spawning, collision detection, and pause logic
- **style.css**: Provides styling for the game interface, responsive layout, and button controls

## How to Run

Simply open the `index.html` file in any modern web browser (Chrome, Firefox, Safari, Edge, etc.).

```bash
# Option 1: Double-click index.html in your file explorer
# Option 2: Use a local server (optional)
python -m http.server 8000
# Then visit http://localhost:8000 in your browser
```

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Difficulty levels (speed variations)
- Leaderboard / High score persistence
- Sound effects and background music
- Different themes and skins
- Multiplayer mode

## Author

Created by Chandan Kumar

## License

Feel free to use and modify this project as you wish!

---

Enjoy the game! 🎮
