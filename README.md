# Iskander Marathon Runner

A browser-based 42km marathon simulator. Choose your city, tap SPACE to make Iskander run through pixel-art landmarks, managing stamina and rhythm over the full marathon distance.

![Title Screen](screenshots/title-moscow.png)

## Choose Your City

Run through 6 world marathon routes, each with unique pixel-art landmarks and backgrounds that change as you progress:

|  |  |  |
|--|--|--|
| ![Moscow](screenshots/title-moscow.png) | ![Berlin](screenshots/title-berlin.png) | ![New York](screenshots/title-newyork.png) |
| ![London](screenshots/title-london.png) | ![Boston](screenshots/title-boston.png) | ![Singapore](screenshots/title-singapore.png) |

Use **arrow keys** (desktop) or **swipe** (mobile) to select a city on the title screen.

## How to Play

Open `index.html` in any browser. No install, no build, no dependencies.

### Controls

**Desktop:**
- **SPACE** — tap repeatedly to run (frequency = speed)
- **D / ENTER** — drink water at pitstop stations
- **Arrow keys** — select city on title screen

**Mobile:** on-screen RUN and DRINK buttons appear automatically. Swipe to select city.

Stay in the green **Rhythm Zone** for optimal efficiency.

### Mechanics

- **Stamina** — drains when sprinting, recovers when slowing down. Refill at water stations every 5 km.
- **Rhythm Zone** — an optimal tapping frequency shown on the right-side bar. Hitting the green zone gives up to 125% speed efficiency and halves stamina drain. The zone shifts throughout the race, so you must adapt your rhythm.
- **Heart Rate** — tracks your effort in real time with BPM display and HR zones (Rest, Easy, Aerobic, Threshold, Anaerobic).
- **Power** — follows a natural U-shaped curve (high energy at start and end, low in the middle). Not player-controlled.
- **Time limit** — 3 hours 20 minutes. Finish over the limit = lose. Don't finish = DNF.

## The Routes

### Moscow

The real Moscow Marathon route through 8 scenes: Luzhniki Stadium, Old City Embankment, Kremlin walls, Moscow City skyscrapers, Ulitsa 1905 Goda, Kitay-Gorod, sunset embankment return, and back to Luzhniki.

| | |
|--|--|
| ![Luzhniki](screenshots/moscow-luzhniki.png) | ![Kremlin](screenshots/moscow-kremlin.png) |
| ![Moscow City](screenshots/moscow-city.png) | ![Pitstop](screenshots/moscow-pitstop.png) |

### Berlin

Brandenburg Gate and Unter den Linden, through Tiergarten Park, past Potsdamer Platz, along the East Side Gallery (Berlin Wall), Alexanderplatz with the TV Tower, and finish at the Reichstag.

| | |
|--|--|
| ![Brandenburg](screenshots/berlin-brandenburg.png) | ![Tiergarten](screenshots/berlin-tiergarten.png) |
| ![East Side](screenshots/berlin-eastside.png) | |

### New York

Over the Verrazzano Bridge, through Brooklyn brownstones, Queens, Harlem, into Central Park, and finish in Times Square.

| | |
|--|--|
| ![Bridge](screenshots/newyork-bridge.png) | ![Brooklyn](screenshots/newyork-brooklyn.png) |
| ![Central Park](screenshots/newyork-centralpark.png) | |

### London

From Greenwich past the Cutty Sark, across Tower Bridge, through Canary Wharf, along the Thames past the London Eye, by Westminster and Big Ben, to Buckingham Palace on The Mall.

| | |
|--|--|
| ![Tower Bridge](screenshots/london-towerbridge.png) | ![London Eye](screenshots/london-eye.png) |
| ![Westminster](screenshots/london-westminster.png) | |

### Boston

From small-town Hopkinton through Ashland suburbs, past Wellesley College, up the infamous Heartbreak Hill in Newton, through Brookline past the Citgo Sign, to the Boylston Street finish.

| | |
|--|--|
| ![Hopkinton](screenshots/boston-hopkinton.png) | ![Heartbreak Hill](screenshots/boston-heartbreak.png) |

### Singapore

Through the Padang colonial district, past Marina Bay and the Merlion, under the Supertrees at Gardens by the Bay, along East Coast Park beach, through colorful Chinatown shophouses, and finish at Marina Bay Sands.

| | |
|--|--|
| ![Marina Bay](screenshots/singapore-marinabay.png) | ![Gardens](screenshots/singapore-gardens.png) |
| ![Chinatown](screenshots/singapore-chinatown.png) | |

## Water Stations

Every 5 km, a pitstop zone appears — slow down and press D or ENTER to drink and restore stamina. Don't skip them, you'll need the energy for the final stretch.

## Finish Line

Complete the 42 km and see your race stats — time, pace, steps, heart rate, and more.

![Finish](screenshots/finish-win.png)

## Tech

HTML/JS/CSS split into modular files (`index.html` + `style.css` + `js/` directory). All graphics are procedural pixel art drawn with Canvas 2D `fillRect` calls. No images, no sprites, no external assets. No build tools or dependencies.

### Project Structure

```
index.html          — HTML shell
style.css           — all CSS
js/
  state.js          — canvas setup, constants, game state
  cities.js         — city configurations (6 cities)
  input.js          — keyboard & touch input
  mechanics.js      — game update loop, physics, pitstops
  drawing.js        — renderer, HUD, title/finish screens
  scenes-moscow.js  — Moscow landmark scenes
  scenes-berlin.js  — Berlin landmark scenes
  scenes-newyork.js — New York landmark scenes
  scenes-london.js  — London landmark scenes
  scenes-boston.js   — Boston landmark scenes
  scenes-singapore.js — Singapore landmark scenes
  ground-generic.js — ground surfaces for non-Moscow cities
  npcs.js           — NPC runners & spectators
  main.js           — game loop & reset
```
