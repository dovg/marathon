# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Iskander Marathon Runner — a browser-based 42km Moscow Marathon simulator. The player taps SPACE rapidly to make Iskander run, managing stamina and power over a full marathon distance with pixel-art Moscow backgrounds.

## Tech Stack & Architecture

Single-file HTML/JS/CSS application (`index.html`). No build tools, no dependencies, no framework. Everything lives in one `<script>` tag inside the HTML file.

### Game Structure (all in index.html)

- **Game state**: Single `game` object holds all state (distance, speed, stamina, power, animation, pitstops, race result)
- **Game loop**: `requestAnimationFrame`-based loop → `update(dt)` → draw functions
- **Input**: Space = step/run (frequency-based speed), D/Enter = drink water at pitstops
- **Scenes**: 3 Moscow backgrounds based on distance — Kremlin Embankment (0-14km), Gorky Park (14-28km), Moscow City (28-42km) with smooth transitions
- **Drawing**: All rendering is direct Canvas 2D API calls (no sprites/images) — pixel art drawn procedurally with `fillRect` and basic shapes
- **Game states**: `title` → `running` → `finished` (win/lose/dnf)

### Key Mechanics

- Speed derived from SPACE press frequency (tracked over 2-second window)
- Stamina drains with high press frequency, recovers at low frequency
- Power follows a U-shaped curve (high start/end, low middle) — not player-controlled
- Pitstops every 5km: press D/Enter within 30-meter zone to restore 30 stamina (one-time use)
- Time limit: 3h 20m (12000 seconds) — finish over limit = lose, don't finish = DNF

## Development & Validation

```bash
# Run the game — just open in any browser
open index.html
```

No tests, no linting, no build step. Validation is manual browser testing.

## Canvas Coordinates

- Canvas: 800×400px with `image-rendering: pixelated`
- Ground at Y=320, runner fixed at X=150
- World scrolls via `worldX` offset (distance × 8 pixels/meter)
- Parallax layers at different scroll rates (0.15–0.7× world speed)
