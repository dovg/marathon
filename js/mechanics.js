// ---- Press frequency tracking ----
function registerPress() {
  var now = performance.now();
  game.pressTimestamps.push(now);
  // Keep only last 2 seconds of presses
  var cutoff = now - 2000;
  game.pressTimestamps = game.pressTimestamps.filter(function(t) { return t > cutoff; });
  game.lastPressTime = now;
}

function getPressFrequency() {
  var now = performance.now();
  var cutoff = now - 2000;
  var recent = game.pressTimestamps.filter(function(t) { return t > cutoff; });
  if (recent.length < 2) return recent.length * 0.5;
  var span = (now - recent[0]) / 1000;
  if (span < 0.01) return 0;
  return recent.length / span;
}

// ---- Power curve: decreases first half, increases second half ----
function getPowerMultiplier() {
  var progress = game.distance / TOTAL_METERS;
  return 1 - 0.6 * Math.sin(Math.PI * progress);
}

// ---- Update ----
var lastTime = 0;

// ---- Pitstop zone detection ----
var PITSTOP_ZONE_RADIUS = 30;

function checkPitstopZone() {
  var currentMeter = game.distance;
  game.inPitstopZone = false;
  game.currentPitstopKm = 0;

  for (var km = PITSTOP_EVERY_KM; km < RACE_DISTANCE_KM; km += PITSTOP_EVERY_KM) {
    var pitstopMeter = km * METERS_PER_KM;
    if (Math.abs(currentMeter - pitstopMeter) < PITSTOP_ZONE_RADIUS) {
      game.inPitstopZone = true;
      game.currentPitstopKm = km;
      break;
    }
  }
}

function drinkWater() {
  if (!game.inPitstopZone) return;
  if (game.pitstopsUsed.includes(game.currentPitstopKm)) return;
  if (game.drinkingAnim > 0) return;

  game.pitstopsUsed.push(game.currentPitstopKm);
  game.pitstopsDrunk++;
  var restored = Math.min(30, game.maxStamina - game.stamina);
  game.stamina = Math.min(game.maxStamina, game.stamina + 30);
  game.drinkingAnim = 1.5;
  game.drinkingRestored = restored;
}

// ---- Race time limit: 3h 20m = 12000 seconds ----
var RACE_TIME_LIMIT = 12000;

function update(dt) {
  if (game.state !== 'running') return;

  game.time += dt;

  // Handle space press
  if (spaceJustPressed) {
    spaceJustPressed = false;
    registerPress();
    game.totalPresses++;
    game.runner.stepping = true;
    game.runner.stepAnim = 0;
  }

  // Handle drink press
  if (drinkJustPressed) {
    drinkJustPressed = false;
    drinkWater();
  }

  // Update drinking animation
  if (game.drinkingAnim > 0) {
    game.drinkingAnim = Math.max(0, game.drinkingAnim - dt);
  }

  // Check pitstop zones
  checkPitstopZone();

  // Calculate target speed from press frequency
  var freq = getPressFrequency();
  var normalizedFreq = Math.min(freq / 7, 1);
  var powerMult = getPowerMultiplier();
  var staminaMult = game.stamina / game.maxStamina;

  // Rhythm Zone
  var progress = game.distance / TOTAL_METERS;
  var zoneCenterNorm = 0.45 + 0.15 * Math.sin(progress * Math.PI * 4);
  var zoneHalfWidth = 0.12;
  var zoneLow = zoneCenterNorm - zoneHalfWidth;
  var zoneHigh = zoneCenterNorm + zoneHalfWidth;
  game.rhythmZoneLow = zoneLow;
  game.rhythmZoneHigh = zoneHigh;
  game.rhythmZoneCenter = zoneCenterNorm;

  var distFromCenter = Math.abs(normalizedFreq - zoneCenterNorm);
  var inZone = normalizedFreq >= zoneLow && normalizedFreq <= zoneHigh;
  var rhythmEfficiency = inZone
    ? 1.0 + 0.25 * (1 - distFromCenter / zoneHalfWidth)
    : Math.max(0.7, 1.0 - distFromCenter * 0.8);
  game.rhythmEfficiency = rhythmEfficiency;
  game.inRhythmZone = inZone;

  var targetSpeed = normalizedFreq * game.maxSpeed * powerMult * staminaMult * rhythmEfficiency;

  // Smooth speed transition
  game.speed += (targetSpeed - game.speed) * Math.min(dt * 3, 1);

  // If no recent presses, decelerate
  var timeSincePress = (performance.now() - game.lastPressTime) / 1000;
  if (timeSincePress > 1.0) {
    game.speed *= Math.pow(0.3, dt);
  }

  // Stamina
  var drainThreshold = 0.5;
  var excessFreq = Math.max(0, normalizedFreq - drainThreshold);
  var rhythmDrainMult = inZone ? 0.5 : 1.3;
  var staminaDrain = excessFreq * 6 * rhythmDrainMult * dt;
  var staminaRecovery = (1 - normalizedFreq) * 5 * dt;
  game.stamina = Math.max(0, Math.min(game.maxStamina, game.stamina - staminaDrain + staminaRecovery));

  // ---- Heart Rate simulation ----
  var fatigueEffect = 1 + (1 - game.stamina / game.maxStamina) * 0.15;
  var driftEffect = 1 + (game.distance / TOTAL_METERS) * 0.08;
  var effortHR = game.restingHR + normalizedFreq * (game.maxHR - game.restingHR) * fatigueEffect * driftEffect;
  var targetHR = Math.min(game.maxHR, effortHR);

  var hrDiff = targetHR - game.heartRate;
  var hrRate = hrDiff > 0 ? 0.12 : 0.05;
  game.heartRate += hrDiff * hrRate * dt * 10;
  game.heartRate = Math.max(game.restingHR, Math.min(game.maxHR, game.heartRate));

  var beatInterval = 60 / game.heartRate;
  game.heartBeatTimer += dt;
  if (game.heartBeatTimer >= beatInterval) {
    game.heartBeatTimer -= beatInterval;
    game.heartScale = 1.35;
  }
  game.heartScale += (1.0 - game.heartScale) * Math.min(dt * 12, 1);
  game.heartBeatPhase = game.heartBeatTimer / beatInterval;

  // HR Zones
  var hrPercent = game.heartRate / game.maxHR;
  if (hrPercent < 0.55) game.hrZone = 0;
  else if (hrPercent < 0.65) game.hrZone = 1;
  else if (hrPercent < 0.80) game.hrZone = 2;
  else if (hrPercent < 0.90) game.hrZone = 3;
  else game.hrZone = 4;

  game.timeInZone[game.hrZone] += dt;

  if (game.hrZone >= 3) {
    var hrDrainMult = game.hrZone === 4 ? 3.0 : 1.5;
    game.stamina = Math.max(0, game.stamina - hrDrainMult * dt);
  }
  if (game.hrZone === 2 && normalizedFreq > 0.1) {
    game.stamina = Math.min(game.maxStamina, game.stamina + 0.5 * dt);
  }

  // Stats tracking
  game.hrSamples++;
  game.avgHeartRate += (game.heartRate - game.avgHeartRate) / game.hrSamples;
  if (game.heartRate > game.maxHeartRateReached) {
    game.maxHeartRateReached = game.heartRate;
  }

  game.power = getPowerMultiplier() * game.maxPower;

  if (game.speed > game.maxSpeedReached) {
    game.maxSpeedReached = game.speed;
  }

  // Move distance
  game.distance += game.speed * dt;
  game.worldX = game.distance * PIXELS_PER_METER;

  // Runner animation
  if (game.speed > 0.3) {
    game.runner.frameTimer += dt * game.speed * 2;
    if (game.runner.frameTimer > 1) {
      game.runner.frameTimer = 0;
      game.runner.frame = (game.runner.frame + 1) % 4;
    }
    game.runner.bobY = Math.sin(game.runner.frameTimer * Math.PI) * 2;
  } else {
    game.runner.frame = 0;
    game.runner.bobY = 0;
  }

  if (game.runner.stepping) {
    game.runner.stepAnim += dt * 8;
    if (game.runner.stepAnim > 1) {
      game.runner.stepping = false;
    }
  }

  // Update NPCs
  updateNPCs(dt);

  // Check finish
  if (game.distance >= TOTAL_METERS) {
    game.distance = TOTAL_METERS;
    game.state = 'finished';
    game.finishTime = game.time;
    game.raceResult = game.time <= RACE_TIME_LIMIT ? 'win' : 'lose';
    if (game.raceResult === 'win') {
      score++;
      localStorage.setItem('iskander_score', score);
    }
  }

  // Check DNF
  if (game.time >= RACE_TIME_LIMIT && game.distance < TOTAL_METERS) {
    game.state = 'finished';
    game.finishTime = game.time;
    game.raceResult = 'dnf';
  }
}
