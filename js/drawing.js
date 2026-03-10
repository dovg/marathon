// ---- Drawing helpers ----
function drawPixelRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.floor(x), Math.floor(y), w, h);
}

// ---- Draw Runner (pixel art stick figure) ----
function drawRunner() {
  var x = RUNNER_X;
  var baseY = GROUND_Y - 32 + game.runner.bobY;
  var frame = game.runner.frame;

  var skin = '#f5c6a0';
  var shirt = '#e63946';
  var shorts = '#1d3557';
  var shoes = '#f1faee';
  var hair = '#2b2d42';

  drawPixelRect(x + 4, baseY, 8, 8, skin);
  drawPixelRect(x + 4, baseY, 8, 3, hair);
  drawPixelRect(x + 9, baseY + 3, 2, 2, '#2b2d42');

  drawPixelRect(x + 3, baseY + 8, 10, 10, shirt);
  drawPixelRect(x + 6, baseY + 10, 4, 4, '#f1faee');

  if (game.speed > 0.3) {
    var armSwing = frame < 2 ? 1 : -1;
    drawPixelRect(x + 1, baseY + 8 + armSwing * 2, 3, 6, skin);
    drawPixelRect(x + 12, baseY + 8 - armSwing * 2, 3, 6, skin);
  } else {
    drawPixelRect(x + 1, baseY + 8, 3, 8, skin);
    drawPixelRect(x + 12, baseY + 8, 3, 8, skin);
  }

  drawPixelRect(x + 3, baseY + 18, 5, 4, shorts);
  drawPixelRect(x + 8, baseY + 18, 5, 4, shorts);

  if (game.speed > 0.3) {
    var legOffset = frame % 2 === 0 ? 3 : -3;
    drawPixelRect(x + 4 + legOffset, baseY + 22, 4, 8, skin);
    drawPixelRect(x + 4 + legOffset, baseY + 28, 5, 3, shoes);
    drawPixelRect(x + 8 - legOffset, baseY + 22, 4, 8, skin);
    drawPixelRect(x + 8 - legOffset, baseY + 28, 5, 3, shoes);
  } else {
    drawPixelRect(x + 4, baseY + 22, 4, 8, skin);
    drawPixelRect(x + 4, baseY + 28, 5, 3, shoes);
    drawPixelRect(x + 8, baseY + 22, 4, 8, skin);
    drawPixelRect(x + 8, baseY + 28, 5, 3, shoes);
  }
}

// ---- Scene system ----
function getCurrentScene() {
  var km = game.distance / METERS_PER_KM;
  var boundaries = getCity().sceneBoundaries;
  for (var i = boundaries.length - 2; i >= 0; i--) {
    if (km >= boundaries[i]) return i;
  }
  return 0;
}

function getSceneBlend() {
  var km = game.distance / METERS_PER_KM;
  var boundaries = getCity().sceneBoundaries;
  var tw = 1;
  for (var i = 1; i < boundaries.length - 1; i++) {
    var b = boundaries[i];
    if (km >= b - tw && km < b + tw) {
      return km < b
        ? (km - (b - tw)) / tw
        : 1 - (km - b) / tw;
    }
  }
  return 0;
}

// ---- Draw Ground ----
function drawGround() {
  var city = getCity();
  if (city.id !== 'moscow') {
    drawGroundGeneric();
    return;
  }
  var scene = getCurrentScene();

  ctx.fillStyle = '#4a5568';
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

  if (scene === 0 || scene === 7) {
    ctx.fillStyle = '#8b3a3a';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#c0c0c0';
    for (var lane = 0; lane < 4; lane++) {
      ctx.fillRect(0, GROUND_Y + 4 + lane * 10, canvas.width, 1);
    }
    ctx.fillStyle = '#9a4a4a';
    var dotOff = -(game.worldX % 12);
    for (var dx = dotOff - 12; dx < canvas.width + 12; dx += 12) {
      for (var dy = 0; dy < 3; dy++) {
        ctx.fillRect(Math.floor(dx) + (dy % 2) * 6, GROUND_Y + 2 + dy * 12, 2, 2);
      }
    }
  } else if (scene === 1 || scene === 2 || scene === 6) {
    ctx.fillStyle = '#78909c';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#90a4ae';
    var cobOff = -(game.worldX % 16);
    for (var row = 0; row < 3; row++) {
      var rowOff = row % 2 === 0 ? 0 : 8;
      for (var cx = cobOff - 16 + rowOff; cx < canvas.width + 16; cx += 16) {
        ctx.fillRect(Math.floor(cx), GROUND_Y + 2 + row * 12, 14, 10);
      }
    }
    ctx.fillStyle = '#b0bec5';
    ctx.fillRect(0, GROUND_Y - 2, canvas.width, 3);
  } else if (scene === 3) {
    ctx.fillStyle = '#424242';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#ffd600';
    ctx.fillRect(0, GROUND_Y + 2, canvas.width, 2);
    ctx.fillRect(0, GROUND_Y + 36, canvas.width, 2);
  } else if (scene === 4) {
    ctx.fillStyle = '#505050';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#8a8a8a';
    var railOff = -(game.worldX % 80);
    ctx.fillRect(0, GROUND_Y + 10, canvas.width, 2);
    ctx.fillRect(0, GROUND_Y + 28, canvas.width, 2);
    ctx.fillStyle = '#6a6a6a';
    for (var rx = railOff - 80; rx < canvas.width + 80; rx += 80) {
      ctx.fillRect(Math.floor(rx), GROUND_Y + 8, 4, 24);
    }
  } else if (scene === 5) {
    ctx.fillStyle = '#8d8468';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#9e9578';
    var stoneOff = -(game.worldX % 20);
    for (var row = 0; row < 3; row++) {
      var rowOff = row % 2 === 0 ? 0 : 10;
      for (var sx = stoneOff - 20 + rowOff; sx < canvas.width + 20; sx += 20) {
        ctx.fillRect(Math.floor(sx), GROUND_Y + 2 + row * 12, 18, 10);
      }
    }
    ctx.fillStyle = '#6b6550';
    for (var row = 0; row < 3; row++) {
      var rowOff = row % 2 === 0 ? 0 : 10;
      for (var sx = stoneOff - 20 + rowOff; sx < canvas.width + 20; sx += 20) {
        ctx.fillRect(Math.floor(sx) - 1, GROUND_Y + 2 + row * 12, 1, 10);
      }
    }
  }

  // Road markings
  if (scene !== 0 && scene !== 7 && scene !== 5) {
    ctx.fillStyle = '#e2e8f0';
    var markSpacing = 60;
    var offset = -(game.worldX % markSpacing);
    for (var i = offset; i < canvas.width + markSpacing; i += markSpacing) {
      ctx.fillRect(Math.floor(i), GROUND_Y + 18, 20, 3);
    }
  }

  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(0, GROUND_Y + 38, canvas.width, 2);
}

// ---- Draw Sky ----
function drawSky() {
  var city = getCity();
  var scene = getCurrentScene();
  var colors = city.skyPalettes[scene] || city.skyPalettes[0];
  var bandH = 80;
  for (var i = 0; i < colors.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(0, i * bandH, canvas.width, bandH);
  }

  var sun = city.sunPositions[scene] || city.sunPositions[0];
  if (sun.show) {
    var totalScenes = city.sceneBoundaries.length - 1;
    var isLow = scene >= totalScenes - 2;
    ctx.fillStyle = isLow ? '#ff7043' : '#fff59d';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = isLow ? '#ffab91' : '#fff9c4';
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, sun.r + 8, 0, Math.PI * 2);
    ctx.globalAlpha = isLow ? 0.25 : 0.3;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  if (scene === 0 && city.id === 'moscow') {
    ctx.fillStyle = '#d4758080';
    ctx.fillRect(0, 240, canvas.width, 80);
  }
  if (city.id === 'singapore') {
    ctx.fillStyle = 'rgba(200,220,240,0.08)';
    ctx.fillRect(0, 200, canvas.width, 120);
  }
  if (city.id === 'london') {
    ctx.fillStyle = 'rgba(150,160,170,0.12)';
    ctx.fillRect(0, 0, canvas.width, 320);
  }
}

// ---- Draw Background (delegates to current scene) ----
function drawBackground() {
  var city = getCity();
  var scene = getCurrentScene();
  var parallax = game.worldX * 0.15;

  switch (city.id) {
    case 'moscow':
      switch (scene) {
        case 0: drawLuzhniki(parallax, false); break;
        case 1: drawOldCityEmbankment(parallax); break;
        case 2: drawKremlinEmbankment(parallax); break;
        case 3: drawMoscowCity(parallax); break;
        case 4: drawUlitsa1905(parallax); break;
        case 5: drawKitayGorod(parallax); break;
        case 6: drawEmbankmentReturn(parallax); break;
        case 7: drawLuzhniki(parallax, true); break;
      }
      break;
    case 'berlin': drawBerlinScene(scene, parallax); break;
    case 'newyork': drawNewYorkScene(scene, parallax); break;
    case 'london': drawLondonScene(scene, parallax); break;
    case 'boston': drawBostonScene(scene, parallax); break;
    case 'singapore': drawSingaporeScene(scene, parallax); break;
  }
}

// ---- Draw Kilometer Markers ----
function drawKmMarkers() {
  for (var km = 1; km <= RACE_DISTANCE_KM; km++) {
    var meterPos = km * METERS_PER_KM;
    var screenX = (meterPos * PIXELS_PER_METER) - game.worldX + RUNNER_X;

    if (screenX < -60 || screenX > canvas.width + 60) continue;

    var isPitstop = km % PITSTOP_EVERY_KM === 0 && km < RACE_DISTANCE_KM;
    var isFinish = km === RACE_DISTANCE_KM;
    var sx = Math.floor(screenX);

    ctx.fillStyle = '#b0bec5';
    ctx.fillRect(sx, GROUND_Y - 55, 4, 55);

    if (isFinish) {
      ctx.fillStyle = '#fff';
      ctx.fillRect(sx - 20, GROUND_Y - 70, 44, 20);
      ctx.fillStyle = '#e63946';
      ctx.fillRect(sx - 20, GROUND_Y - 70, 44, 3);
      ctx.fillRect(sx - 20, GROUND_Y - 53, 44, 3);
      ctx.fillStyle = '#2d3436';
      ctx.font = 'bold 11px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FINISH', sx + 2, GROUND_Y - 56);

      for (var side = -1; side <= 1; side += 2) {
        var cx = sx + side * 25;
        for (var row = 0; row < 10; row++) {
          for (var col = 0; col < 3; col++) {
            ctx.fillStyle = (row + col) % 2 === 0 ? '#fff' : '#000';
            ctx.fillRect(cx - 4 + col * 5, GROUND_Y - 70 + row * 5, 5, 5);
          }
        }
      }
    } else if (isPitstop) {
      var used = game.pitstopsUsed.includes(km);

      ctx.fillStyle = used ? '#636e72' : '#00b894';
      ctx.fillRect(sx - 16, GROUND_Y - 72, 36, 22);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(km + 'km', sx + 2, GROUND_Y - 57);
      ctx.fillStyle = used ? '#b2bec3' : '#74b9ff';
      ctx.fillRect(sx + 14, GROUND_Y - 70, 4, 6);

      ctx.fillStyle = used ? '#636e72' : '#00b894';
      ctx.fillRect(sx + 15, GROUND_Y - 20, 35, 4);
      ctx.fillStyle = '#e0e0e0';
      ctx.fillRect(sx + 15, GROUND_Y - 20, 35, 1);
      ctx.fillStyle = used ? '#636e72' : '#00b894';
      ctx.fillRect(sx + 17, GROUND_Y - 16, 3, 16);
      ctx.fillRect(sx + 44, GROUND_Y - 16, 3, 16);
      if (!used) {
        ctx.fillStyle = '#74b9ff';
        for (var c = 0; c < 3; c++) {
          ctx.fillRect(sx + 20 + c * 10, GROUND_Y - 28, 6, 8);
          ctx.fillStyle = '#fff';
          ctx.fillRect(sx + 19 + c * 10, GROUND_Y - 28, 8, 1);
          ctx.fillStyle = '#74b9ff';
        }
      } else {
        ctx.fillStyle = '#b2bec3';
        for (var c = 0; c < 3; c++) {
          ctx.fillRect(sx + 20 + c * 10, GROUND_Y - 24, 6, 4);
        }
      }

      ctx.fillStyle = '#00b894';
      ctx.fillRect(sx + 28, GROUND_Y - 44, 8, 12);
      ctx.fillStyle = '#f5c6a0';
      ctx.fillRect(sx + 29, GROUND_Y - 50, 6, 6);
    } else {
      ctx.fillStyle = '#fff';
      ctx.fillRect(sx - 14, GROUND_Y - 70, 32, 20);
      ctx.fillStyle = '#e63946';
      ctx.fillRect(sx - 14, GROUND_Y - 70, 32, 2);
      ctx.fillRect(sx - 14, GROUND_Y - 52, 32, 2);
      ctx.fillRect(sx - 14, GROUND_Y - 70, 2, 20);
      ctx.fillRect(sx + 16, GROUND_Y - 70, 2, 20);
      ctx.fillStyle = '#2d3436';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(km, sx + 2, GROUND_Y - 56);
    }
  }
}

// ---- Draw HUD ----
function drawHUD() {
  var currentKm = game.distance / METERS_PER_KM;
  var minutes = Math.floor(game.time / 60);
  var seconds = Math.floor(game.time % 60);
  var hours = Math.floor(minutes / 60);
  var mins = minutes % 60;

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(10, 10, 200, 128);

  ctx.fillStyle = '#f1faee';
  ctx.font = '12px monospace';
  ctx.textAlign = 'left';

  ctx.fillText('Distance: ' + currentKm.toFixed(2) + ' / 42 km', 20, 30);
  ctx.fillText('Speed: ' + (game.speed * 3.6).toFixed(1) + ' km/h', 20, 48);
  ctx.fillText('Time: ' + hours + 'h ' + String(mins).padStart(2, '0') + 'm ' + String(seconds % 60).padStart(2, '0') + 's', 20, 66);

  ctx.fillText('Stamina:', 20, 84);
  ctx.fillStyle = '#2d3436';
  ctx.fillRect(90, 74, 100, 12);
  ctx.fillStyle = game.stamina > 30 ? '#00b894' : '#e17055';
  ctx.fillRect(90, 74, (game.stamina / game.maxStamina) * 100, 12);

  ctx.fillStyle = '#f1faee';
  ctx.fillText('Power:', 20, 102);
  ctx.fillStyle = '#2d3436';
  ctx.fillRect(90, 92, 100, 12);
  ctx.fillStyle = '#6c5ce7';
  ctx.fillRect(90, 92, (game.power / game.maxPower) * 100, 12);

  ctx.fillStyle = '#ffeaa7';
  ctx.fillText('Score: ' + score, 20, 120);

  // Heart Rate indicator
  var hrX = canvas.width - 120;
  var hrY = 15;

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(hrX - 8, hrY - 5, 62, 145);

  var hx = hrX + 14;
  var hy = hrY + 12;
  var hs = game.heartScale;
  var heartColor = game.hrZone <= 1 ? '#e63946' : game.hrZone === 2 ? '#e63946' : game.hrZone === 3 ? '#d63031' : '#c0392b';

  ctx.save();
  ctx.translate(hx + 8, hy + 7);
  ctx.scale(hs, hs);
  ctx.translate(-(hx + 8), -(hy + 7));
  ctx.fillStyle = heartColor;
  ctx.fillRect(hx + 2, hy, 4, 2);
  ctx.fillRect(hx + 10, hy, 4, 2);
  ctx.fillRect(hx, hy + 2, 16, 2);
  ctx.fillRect(hx, hy + 4, 16, 2);
  ctx.fillRect(hx + 2, hy + 6, 12, 2);
  ctx.fillRect(hx + 4, hy + 8, 8, 2);
  ctx.fillRect(hx + 6, hy + 10, 4, 2);
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.fillRect(hx + 2, hy, 4, 2);
  ctx.fillRect(hx, hy + 2, 4, 2);
  ctx.restore();

  ctx.fillStyle = heartColor;
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(Math.round(game.heartRate), hrX + 23, hy + 28);
  ctx.fillStyle = '#a0aec0';
  ctx.font = '8px monospace';
  ctx.fillText('BPM', hrX + 23, hy + 36);

  var zBarX = hrX + 2;
  var zBarY = hy + 42;
  var zBarW = 42;
  var zBarH = 60;

  var zones = [
    { name: 'REST', pct: 0.55, color: '#636e72' },
    { name: 'EASY', pct: 0.65, color: '#00b894' },
    { name: 'AERO', pct: 0.80, color: '#00b894' },
    { name: 'THRS', pct: 0.90, color: '#fdcb6e' },
    { name: 'MAX',  pct: 1.00, color: '#e63946' },
  ];

  var hrPct = game.heartRate / game.maxHR;
  var prevPct = 0.40;
  var displayRange = 0.60;
  for (var i = 0; i < zones.length; i++) {
    var bandTop = zBarY + zBarH - ((zones[i].pct - 0.40) / displayRange) * zBarH;
    var bandBot = zBarY + zBarH - ((prevPct - 0.40) / displayRange) * zBarH;
    var bandH = bandBot - bandTop;
    if (bandH > 0 && bandTop < zBarY + zBarH) {
      ctx.fillStyle = i === game.hrZone ? zones[i].color : zones[i].color + '55';
      ctx.fillRect(zBarX, Math.max(zBarY, bandTop), zBarW, Math.min(bandH, zBarY + zBarH - bandTop));
    }
    prevPct = zones[i].pct;
  }

  ctx.strokeStyle = '#4a5568';
  ctx.lineWidth = 1;
  ctx.strokeRect(zBarX, zBarY, zBarW, zBarH);

  var hrNeedleY = zBarY + zBarH - ((hrPct - 0.40) / displayRange) * zBarH;
  var clampedNeedleY = Math.max(zBarY, Math.min(zBarY + zBarH - 2, hrNeedleY));
  ctx.fillStyle = '#fff';
  ctx.fillRect(zBarX - 2, Math.floor(clampedNeedleY), zBarW + 4, 2);
  ctx.beginPath();
  ctx.moveTo(zBarX - 5, Math.floor(clampedNeedleY) + 1);
  ctx.lineTo(zBarX - 2, Math.floor(clampedNeedleY) - 3);
  ctx.lineTo(zBarX - 2, Math.floor(clampedNeedleY) + 5);
  ctx.fill();

  var zoneNames = ['REST', 'EASY', 'AERO', 'THRS', 'MAX!'];
  var zoneColors = ['#636e72', '#00b894', '#00b894', '#fdcb6e', '#e63946'];
  ctx.fillStyle = zoneColors[game.hrZone];
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(zoneNames[game.hrZone], hrX + 23, zBarY + zBarH + 12);

  // Rhythm Zone indicator
  var freq = getPressFrequency();
  var normalizedFreq = Math.min(freq / 7, 1);
  var rzX = canvas.width - 50;
  var rzY = 15;
  var rzW = 20;
  var rzH = 120;

  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(rzX - 8, rzY - 5, rzW + 16, rzH + 30);

  ctx.fillStyle = '#f1faee';
  ctx.font = '9px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('RHYTHM', rzX + rzW / 2, rzY + rzH + 14);

  ctx.fillStyle = '#2d3436';
  ctx.fillRect(rzX, rzY, rzW, rzH);

  var zoneTopY = rzY + rzH - game.rhythmZoneHigh * rzH;
  var zoneBotY = rzY + rzH - game.rhythmZoneLow * rzH;
  var zoneHeight = zoneBotY - zoneTopY;

  if (game.inRhythmZone) {
    ctx.fillStyle = 'rgba(0,184,148,0.3)';
    ctx.fillRect(rzX - 3, zoneTopY - 2, rzW + 6, zoneHeight + 4);
  }
  ctx.fillStyle = game.inRhythmZone ? '#00b894' : '#2d6b5a';
  ctx.fillRect(rzX, zoneTopY, rzW, zoneHeight);

  ctx.fillStyle = '#00b894';
  ctx.fillRect(rzX - 2, zoneTopY, rzW + 4, 1);
  ctx.fillRect(rzX - 2, zoneBotY, rzW + 4, 1);

  var needleY = rzY + rzH - normalizedFreq * rzH;
  var needleColor = game.inRhythmZone ? '#ffeaa7' : '#e17055';
  ctx.fillStyle = needleColor;
  ctx.fillRect(rzX - 4, Math.floor(needleY) - 1, rzW + 8, 3);
  ctx.beginPath();
  ctx.moveTo(rzX - 7, Math.floor(needleY));
  ctx.lineTo(rzX - 4, Math.floor(needleY) - 4);
  ctx.lineTo(rzX - 4, Math.floor(needleY) + 4);
  ctx.fill();

  var effPercent = Math.round(game.rhythmEfficiency * 100);
  ctx.fillStyle = game.inRhythmZone ? '#00b894' : '#e17055';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(effPercent + '%', rzX + rzW / 2, rzY + rzH + 24);

  // Time limit warning
  var timeRemaining = RACE_TIME_LIMIT - game.time;
  if (timeRemaining < 600) {
    ctx.fillStyle = timeRemaining < 120 ? '#e63946' : '#e17055';
    ctx.font = '12px monospace';
    ctx.textAlign = 'right';
    var tr_mins = Math.floor(timeRemaining / 60);
    var tr_secs = Math.floor(timeRemaining % 60);
    ctx.fillText('Time left: ' + tr_mins + ':' + String(tr_secs).padStart(2, '0'), canvas.width - 20, 48);
  }

  // Pitstop zone indicator
  if (game.inPitstopZone) {
    var alreadyUsed = game.pitstopsUsed.includes(game.currentPitstopKm);
    ctx.fillStyle = 'rgba(0,184,148,0.85)';
    ctx.fillRect(canvas.width / 2 - 130, canvas.height - 60, 260, 36);
    ctx.fillStyle = '#fff';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    if (alreadyUsed) {
      ctx.fillText('Water station ' + game.currentPitstopKm + 'km - Already used', canvas.width / 2, canvas.height - 38);
    } else {
      ctx.fillText(isMobile ? 'Tap DRINK to get water!' : 'Press D or ENTER to drink water!', canvas.width / 2, canvas.height - 38);
    }
  }

  // Drinking animation overlay
  if (game.drinkingAnim > 0) {
    ctx.fillStyle = 'rgba(116,185,255,' + (game.drinkingAnim / 1.5 * 0.5) + ')';
    ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 - 20, 160, 40);
    ctx.fillStyle = '#fff';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('+' + Math.round(game.drinkingRestored) + ' Stamina!', canvas.width / 2, canvas.height / 2 + 6);
  }
}

// ---- Draw Title Screen ----
function drawTitle() {
  var city = getCity();
  ctx.fillStyle = '#1a1a2e';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = city.accentColor;
  ctx.fillRect(canvas.width / 2 - 5, 40, 10, 10);
  ctx.fillRect(canvas.width / 2 - 7, 50, 14, 14);
  ctx.fillRect(canvas.width / 2 - 10, 57, 5, 10);
  ctx.fillRect(canvas.width / 2 + 5, 57, 5, 10);
  ctx.fillRect(canvas.width / 2 - 7, 64, 5, 12);
  ctx.fillRect(canvas.width / 2 + 2, 64, 5, 12);

  ctx.fillStyle = city.accentColor;
  ctx.font = '28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('ISKANDER MARATHON', canvas.width / 2, 100);

  // City selector
  var selY = 125;
  ctx.fillStyle = '#718096';
  ctx.font = '20px monospace';
  ctx.fillText('<', canvas.width / 2 - 160, selY + 5);
  ctx.fillText('>', canvas.width / 2 + 160, selY + 5);
  ctx.fillStyle = '#f1faee';
  ctx.font = 'bold 16px monospace';
  ctx.fillText(city.name, canvas.width / 2, selY);
  ctx.fillStyle = '#a0aec0';
  ctx.font = '11px monospace';
  ctx.fillText(city.subtitle, canvas.width / 2, selY + 18);
  for (var i = 0; i < CITIES.length; i++) {
    ctx.fillStyle = i === selectedCityIndex ? '#f1faee' : '#4a5568';
    ctx.fillRect(canvas.width / 2 - (CITIES.length * 6) + i * 12, selY + 26, 6, 6);
  }

  ctx.font = '12px monospace';
  ctx.fillStyle = '#718096';
  ctx.fillText(isMobile ? 'Swipe to select city' : 'Arrow keys to select city', canvas.width / 2, selY + 48);

  ctx.fillStyle = '#a0aec0';
  ctx.font = '11px monospace';
  ctx.fillText('42 km of pure determination', canvas.width / 2, 195);

  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.fillRect(canvas.width / 2 - 180, 205, 360, 55);
  ctx.fillStyle = '#718096';
  ctx.font = '11px monospace';
  ctx.fillText('Time limit: 3 hours 20 minutes', canvas.width / 2, 222);
  ctx.fillText(isMobile ? 'Water stations every 5 km - tap DRINK' : 'Water stations every 5 km - press D to drink', canvas.width / 2, 238);
  ctx.fillText('No saves. One shot. Pure marathon.', canvas.width / 2, 254);

  ctx.fillStyle = '#ffeaa7';
  ctx.font = '13px monospace';
  ctx.fillText('Score: ' + score, canvas.width / 2, 280);
  ctx.fillStyle = '#718096';
  ctx.font = '10px monospace';
  ctx.fillText('Finish the marathon in time to earn +1 point', canvas.width / 2, 295);

  ctx.fillStyle = '#ffeaa7';
  ctx.font = '16px monospace';
  ctx.fillText(isMobile ? 'Tap RUN to start' : 'Press SPACE to start', canvas.width / 2, 330);

  ctx.fillStyle = '#718096';
  ctx.font = '10px monospace';
  ctx.fillText(isMobile ? 'Tap RUN rapidly. Tap DRINK at water stations.' : 'Tap SPACE to run. Stay in the green RHYTHM zone!', canvas.width / 2, 355);

  if (cmdActive) {
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(canvas.width / 2 - 120, 370, 240, 22);
    ctx.fillStyle = '#00b894';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(cmdText + '_', canvas.width / 2 - 112, 385);
  }
}

// ---- Draw Finish Screen ----
function drawFinish() {
  ctx.fillStyle = 'rgba(0,0,0,0.85)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var hours = Math.floor(game.finishTime / 3600);
  var mins = Math.floor((game.finishTime % 3600) / 60);
  var secs = Math.floor(game.finishTime % 60);

  if (game.raceResult === 'win') {
    ctx.fillStyle = '#00b894';
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MARATHON COMPLETE!', canvas.width / 2, 80);
    ctx.fillStyle = '#ffeaa7';
    ctx.font = '14px monospace';
    ctx.fillText('Iskander finished the ' + getCity().subtitle + '!', canvas.width / 2, 108);
  } else if (game.raceResult === 'dnf') {
    ctx.fillStyle = '#e63946';
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('DID NOT FINISH', canvas.width / 2, 80);
    ctx.fillStyle = '#e17055';
    ctx.font = '14px monospace';
    var distKm = (game.distance / METERS_PER_KM).toFixed(2);
    ctx.fillText('Time ran out at ' + distKm + ' km', canvas.width / 2, 108);
  } else {
    ctx.fillStyle = '#e17055';
    ctx.font = '28px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('TOO SLOW!', canvas.width / 2, 80);
    ctx.fillStyle = '#e17055';
    ctx.font = '14px monospace';
    ctx.fillText('Finished, but over the time limit', canvas.width / 2, 108);
  }

  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.fillRect(canvas.width / 2 - 170, 125, 340, 240);

  ctx.fillStyle = '#f1faee';
  ctx.font = '13px monospace';
  ctx.textAlign = 'left';
  var sx = canvas.width / 2 - 140;
  var rx = canvas.width / 2 + 140;
  var sy = 148;
  var lineH = 18;

  var statLine = function(label, value, color) {
    ctx.fillStyle = '#f1faee';
    ctx.textAlign = 'left';
    ctx.fillText(label, sx, sy);
    ctx.fillStyle = color || '#f1faee';
    ctx.textAlign = 'right';
    ctx.fillText(value, rx, sy);
    sy += lineH;
  };

  statLine('Finish Time:', hours + 'h ' + String(mins).padStart(2, '0') + 'm ' + String(secs).padStart(2, '0') + 's', '#ffeaa7');
  statLine('Distance:', (game.distance / METERS_PER_KM).toFixed(2) + ' / 42 km');

  var avgSpeed = game.finishTime > 0 ? (game.distance / game.finishTime) * 3.6 : 0;
  statLine('Avg Speed:', avgSpeed.toFixed(1) + ' km/h');

  if (game.distance > 0) {
    var paceSeconds = game.finishTime / (game.distance / METERS_PER_KM);
    var paceMins = Math.floor(paceSeconds / 60);
    var paceSecs = Math.floor(paceSeconds % 60);
    statLine('Avg Pace:', paceMins + ':' + String(paceSecs).padStart(2, '0') + ' /km');
  }

  statLine('Total Steps:', game.totalPresses.toString());
  statLine('Water Stops:', game.pitstopsDrunk + ' / 8');
  statLine('Avg Heart Rate:', Math.round(game.avgHeartRate) + ' bpm', '#e63946');
  statLine('Max Heart Rate:', Math.round(game.maxHeartRateReached) + ' bpm', '#e63946');
  statLine('Final Stamina:', Math.round(game.stamina) + '%', game.stamina > 30 ? '#00b894' : '#e17055');
  if (game.raceResult === 'win') {
    statLine('Marathons finished:', score.toString(), '#ffeaa7');
  }

  ctx.fillStyle = '#ffeaa7';
  ctx.font = '14px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(isMobile ? 'Tap RUN to restart' : 'Press SPACE to restart', canvas.width / 2, 380);
}
