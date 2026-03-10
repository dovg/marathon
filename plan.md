## Marthon runner simulator.

Named after Iskander Yadgarov. 

# design
- 2-d platformer with side-view (like super mario)
- backgroud is Moscow mararthon pixel-art (Kremlin view from embrarkement, Gorky park etc)
- kilometers mark each kilometre like on real marathon

# behavior and gameplay
- it is a simulator, so full race is about 42 "virtual" kilometres or 2-3 hour of gameplay
- only one command button is space. If you push space key Iskander make a step. The faster you push space the faster Iskander run
- Iskander has stamina. If you push space often stamina is decreasing
- Iskander has power. Power decreasing first and increasing first. You may use power for start and finish (last 2-3 kilometres)
- if you push space rare iskander can not win the race
- no saves at all
- pitstop are every 5 kms, At pitstop you may drink a water that increase Iskander stamina level

# stack
- only html / js / css

# validation
- open index.html in browser and test manually
- no build tools needed

---

### Task 1: Core game engine and canvas setup
- [x] Create index.html with canvas element, basic CSS layout, and game script
- [x] Implement game loop with requestAnimationFrame
- [x] Implement Iskander runner sprite (pixel-art stick figure with run animation frames)
- [x] Implement space key input handling - each press triggers a step
- [x] Implement speed calculation based on press frequency
- [x] Implement stamina system (decreases with frequent presses, recovers slowly)
- [x] Implement power system (decreases first half, increases second half of race)
- [x] Implement distance tracking (42 km race) and km markers on screen
- [x] Implement scrolling ground/background
- [x] Implement basic HUD showing distance, stamina, power, speed

### Task 2: Moscow pixel-art backgrounds
- [ ] Draw Kremlin embankment background scene (pixel art)
- [ ] Draw Gorky Park background scene (pixel art)
- [ ] Implement background transitions as runner progresses through the race
- [ ] Add kilometer marker signs along the route

### Task 3: Pitstops and race completion
- [ ] Implement pitstop zones every 5 km with water station visuals
- [ ] Implement water drinking mechanic (press key at pitstop to drink, restores stamina)
- [ ] Implement race finish logic and finish line
- [ ] Implement win/lose conditions (must finish within time limit)
- [ ] Add start screen and finish screen with race stats
