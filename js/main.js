// ---- Main Loop ----
function gameLoop(timestamp) {
  var dt = Math.min((timestamp - lastTime) / 1000, 0.05);
  lastTime = timestamp;

  // Handle state transitions from input
  if (spaceJustPressed && game.state === 'title') {
    spaceJustPressed = false;
    if (game.npcRunners.length === 0) initNPCs();
    game.state = 'running';
  }
  if (spaceJustPressed && game.state === 'finished') {
    spaceJustPressed = false;
    resetGame();
  }

  update(dt);

  // Draw
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var ghLink = document.getElementById('github-link');
  ghLink.style.display = game.state === 'title' ? '' : 'none';

  if (game.state === 'title') {
    drawTitle();
  } else if (game.state === 'running') {
    drawSky();
    drawBackground();
    drawGround();
    drawSpectators();
    drawKmMarkers();
    drawNPCRunners();
    drawRunner();
    drawHUD();
  } else if (game.state === 'finished') {
    drawSky();
    drawBackground();
    drawGround();
    drawSpectators();
    drawKmMarkers();
    drawNPCRunners();
    drawRunner();
    drawHUD();
    drawFinish();
  }

  requestAnimationFrame(gameLoop);
}

function resetGame() {
  game.state = 'title';
  game.distance = 0;
  game.speed = 0;
  game.stamina = 100;
  game.power = 100;
  game.time = 0;
  game.pressTimestamps = [];
  game.lastPressTime = 0;
  game.worldX = 0;
  game.finishTime = null;
  game.raceResult = null;
  game.pitstopsUsed = [];
  game.inPitstopZone = false;
  game.currentPitstopKm = 0;
  game.drinkingAnim = 0;
  game.drinkingRestored = 0;
  game.maxSpeedReached = 0;
  game.totalPresses = 0;
  game.pitstopsDrunk = 0;
  game.runner.frame = 0;
  game.runner.frameTimer = 0;
  game.runner.bobY = 0;
  game.runner.stepping = false;
  game.rhythmZoneLow = 0.33;
  game.rhythmZoneHigh = 0.57;
  game.rhythmZoneCenter = 0.45;
  game.rhythmEfficiency = 1.0;
  game.inRhythmZone = false;
  game.heartRate = 65;
  game.heartBeatTimer = 0;
  game.heartBeatPhase = 0;
  game.heartScale = 1.0;
  game.hrZone = 0;
  game.avgHeartRate = 65;
  game.hrSamples = 0;
  game.maxHeartRateReached = 65;
  game.timeInZone = [0, 0, 0, 0, 0];
  initNPCs();
}

// Start
requestAnimationFrame(gameLoop);
