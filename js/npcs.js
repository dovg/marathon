// ---- NPC System ----
var NPC_SHIRT_COLORS = ['#2196f3', '#ff9800', '#9c27b0', '#4caf50', '#ff5722', '#00bcd4', '#795548'];
var NPC_SHORTS_COLORS = ['#1a237e', '#263238', '#3e2723', '#004d40', '#1b1b1b', '#0d47a1', '#4a148c'];

function initNPCs() {
  game.npcRunners = [];
  for (var i = 0; i < 7; i++) {
    var speedFactor = 0.4 + Math.random() * 0.25;
    game.npcRunners.push({
      distance: 0,
      baseSpeed: game.maxSpeed * speedFactor,
      speedVariation: 0,
      speedTimer: Math.random() * 10,
      shirtColor: NPC_SHIRT_COLORS[i],
      shortsColor: NPC_SHORTS_COLORS[i],
      frame: Math.floor(Math.random() * 4),
      frameTimer: Math.random(),
      bobY: 0
    });
  }

  game.spectators = [];
  var meterPos = 200 + Math.random() * 300;
  while (meterPos < TOTAL_METERS) {
    game.spectators.push({
      meterPos: meterPos,
      side: Math.random() < 0.5 ? -1 : 1,
      type: Math.floor(Math.random() * 3),
      color: ['#e91e63', '#3f51b5', '#ff9800', '#4caf50', '#9c27b0'][Math.floor(Math.random() * 5)],
      animTimer: Math.random() * Math.PI * 2,
      flashTimer: 0
    });
    meterPos += 500 + Math.random() * 300;
  }
}

function updateNPCs(dt) {
  for (var n = 0; n < game.npcRunners.length; n++) {
    var npc = game.npcRunners[n];
    npc.speedTimer += dt;
    npc.speedVariation = Math.sin(npc.speedTimer * 0.5) * 0.15;
    var speed = npc.baseSpeed * (1 + npc.speedVariation);
    npc.distance += speed * dt;

    if (speed > 0.3) {
      npc.frameTimer += dt * speed * 2;
      if (npc.frameTimer > 1) {
        npc.frameTimer = 0;
        npc.frame = (npc.frame + 1) % 4;
      }
      npc.bobY = Math.sin(npc.frameTimer * Math.PI) * 2;
    }

    if (npc.distance > TOTAL_METERS) npc.distance = TOTAL_METERS;
  }

  for (var s = 0; s < game.spectators.length; s++) {
    var spec = game.spectators[s];
    spec.animTimer += dt * 3;
    if (spec.type === 2 && spec.flashTimer <= 0) {
      var dist = Math.abs(game.distance - spec.meterPos);
      if (dist < 20) spec.flashTimer = 0.3;
    }
    if (spec.flashTimer > 0) spec.flashTimer -= dt;
  }
}

function drawNPCRunner(npc) {
  var screenX = (npc.distance - game.distance) * PIXELS_PER_METER + RUNNER_X;
  if (screenX < -20 || screenX > canvas.width + 20) return;

  var x = Math.floor(screenX);
  var baseY = GROUND_Y - 32 + npc.bobY;
  var frame = npc.frame;

  var skin = '#d4a574';
  var shoes = '#e0e0e0';

  drawPixelRect(x + 4, baseY, 8, 8, skin);
  drawPixelRect(x + 4, baseY, 8, 3, '#2b2d42');
  drawPixelRect(x + 3, baseY + 8, 10, 10, npc.shirtColor);
  var armSwing = frame < 2 ? 1 : -1;
  drawPixelRect(x + 1, baseY + 8 + armSwing * 2, 3, 6, skin);
  drawPixelRect(x + 12, baseY + 8 - armSwing * 2, 3, 6, skin);
  drawPixelRect(x + 3, baseY + 18, 5, 4, npc.shortsColor);
  drawPixelRect(x + 8, baseY + 18, 5, 4, npc.shortsColor);
  var legOffset = frame % 2 === 0 ? 3 : -3;
  drawPixelRect(x + 4 + legOffset, baseY + 22, 4, 8, skin);
  drawPixelRect(x + 4 + legOffset, baseY + 28, 5, 3, shoes);
  drawPixelRect(x + 8 - legOffset, baseY + 22, 4, 8, skin);
  drawPixelRect(x + 8 - legOffset, baseY + 28, 5, 3, shoes);
}

function drawNPCRunners() {
  var sorted = game.npcRunners.slice().sort(function(a, b) { return a.distance - b.distance; });
  for (var i = 0; i < sorted.length; i++) {
    drawNPCRunner(sorted[i]);
  }
}

function drawSpectators() {
  for (var s = 0; s < game.spectators.length; s++) {
    var spec = game.spectators[s];
    var screenX = (spec.meterPos * PIXELS_PER_METER) - game.worldX + RUNNER_X;
    if (screenX < -20 || screenX > canvas.width + 20) continue;

    var sx = Math.floor(screenX);
    var sy = spec.side === -1 ? GROUND_Y - 55 : GROUND_Y + 42;
    var armY = Math.sin(spec.animTimer) * 3;

    if (spec.type === 0) {
      drawPixelRect(sx, sy, 6, 6, '#f5c6a0');
      drawPixelRect(sx - 1, sy + 6, 8, 8, spec.color);
      drawPixelRect(sx, sy + 14, 4, 6, '#1a1a2e');
      drawPixelRect(sx + 4, sy + 14, 4, 6, '#1a1a2e');
      drawPixelRect(sx + 7, sy + 2 + armY, 3, 5, '#f5c6a0');
      drawPixelRect(sx + 6, sy - 6 + armY, 14, 8, '#fff');
      drawPixelRect(sx + 7, sy - 5 + armY, 4, 2, '#e63946');
      drawPixelRect(sx + 12, sy - 5 + armY, 4, 2, '#e63946');
    } else if (spec.type === 1) {
      drawPixelRect(sx, sy, 6, 6, '#f5c6a0');
      drawPixelRect(sx - 1, sy + 6, 8, 8, spec.color);
      drawPixelRect(sx, sy + 14, 4, 6, '#1a1a2e');
      drawPixelRect(sx + 4, sy + 14, 4, 6, '#1a1a2e');
      var clap = Math.sin(spec.animTimer * 2) > 0 ? 0 : 3;
      drawPixelRect(sx - 3, sy + 4, 3, 4, '#f5c6a0');
      drawPixelRect(sx + 6, sy + 4 + clap, 3, 4, '#f5c6a0');
    } else {
      drawPixelRect(sx, sy, 6, 6, '#f5c6a0');
      drawPixelRect(sx - 1, sy + 6, 8, 8, spec.color);
      drawPixelRect(sx, sy + 14, 4, 6, '#1a1a2e');
      drawPixelRect(sx + 4, sy + 14, 4, 6, '#1a1a2e');
      drawPixelRect(sx + 6, sy + 5, 6, 5, '#333');
      drawPixelRect(sx + 7, sy + 4, 3, 2, '#555');
      if (spec.flashTimer > 0) {
        ctx.fillStyle = 'rgba(255,255,255,' + (spec.flashTimer / 0.3 * 0.6) + ')';
        ctx.fillRect(sx - 4, sy - 4, 20, 20);
      }
    }
  }
}
