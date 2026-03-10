// ---- Input ----
var keys = {};
var spaceJustPressed = false;
var drinkJustPressed = false;

// ---- Hidden command input ----
var cmdActive = false;
var cmdText = '';

function executeCommand(text) {
  var match = text.match(/^\/start\s+(\d+(\.\d+)?)$/);
  if (match) {
    var km = parseFloat(match[1]);
    if (km >= 0 && km < RACE_DISTANCE_KM) {
      resetGame();
      game.distance = km * METERS_PER_KM;
      game.worldX = game.distance * PIXELS_PER_METER;
      // Mark earlier pitstops as used
      for (var p = PITSTOP_EVERY_KM; p < RACE_DISTANCE_KM; p += PITSTOP_EVERY_KM) {
        if (p <= km) {
          game.pitstopsUsed.push(p);
          game.pitstopsDrunk++;
        }
      }
      // Estimate elapsed time (~5 min/km pace)
      game.time = km * 300;
      game.stamina = Math.max(20, 100 - km * 1.5);
      // Place NPC runners at the same distance as player
      for (var i = 0; i < game.npcRunners.length; i++) {
        game.npcRunners[i].distance = km * METERS_PER_KM;
      }
      game.state = 'running';
      return;
    }
  }
}

document.addEventListener('keydown', function(e) {
  // Activate command mode with / on title screen
  if (e.key === '/' && game.state === 'title' && !cmdActive) {
    e.preventDefault();
    cmdActive = true;
    cmdText = '/';
    return;
  }

  // Handle command input
  if (cmdActive) {
    e.preventDefault();
    if (e.code === 'Enter') {
      executeCommand(cmdText);
      cmdActive = false;
      cmdText = '';
    } else if (e.code === 'Escape') {
      cmdActive = false;
      cmdText = '';
    } else if (e.code === 'Backspace') {
      cmdText = cmdText.slice(0, -1);
      if (cmdText.length === 0) { cmdActive = false; }
    } else if (e.key.length === 1) {
      cmdText += e.key;
    }
    return;
  }

  // City selector on title screen
  if (game.state === 'title' && (e.code === 'ArrowLeft' || e.code === 'ArrowRight')) {
    e.preventDefault();
    if (e.code === 'ArrowLeft') {
      selectedCityIndex = (selectedCityIndex - 1 + CITIES.length) % CITIES.length;
    } else {
      selectedCityIndex = (selectedCityIndex + 1) % CITIES.length;
    }
    return;
  }

  if (e.code === 'Space') {
    e.preventDefault();
    if (!keys['Space']) {
      keys['Space'] = true;
      spaceJustPressed = true;
    }
  }
  if (e.code === 'KeyD' || e.code === 'Enter') {
    e.preventDefault();
    if (!keys[e.code]) {
      keys[e.code] = true;
      drinkJustPressed = true;
    }
  }
});

document.addEventListener('keyup', function(e) {
  if (e.code === 'Space') {
    keys['Space'] = false;
  }
  if (e.code === 'KeyD' || e.code === 'Enter') {
    keys[e.code] = false;
  }
});

// ---- Touch controls ----
var btnRun = document.getElementById('btn-run');
var btnDrink = document.getElementById('btn-drink');

btnRun.addEventListener('touchstart', function(e) {
  e.preventDefault();
  btnRun.classList.add('active');
  if (game.state === 'title') {
    spaceJustPressed = true;
  } else if (game.state === 'finished') {
    spaceJustPressed = true;
  } else if (game.state === 'running') {
    keys['Space'] = true;
    spaceJustPressed = true;
  }
});
btnRun.addEventListener('touchend', function(e) {
  e.preventDefault();
  btnRun.classList.remove('active');
  keys['Space'] = false;
});

btnDrink.addEventListener('touchstart', function(e) {
  e.preventDefault();
  btnDrink.classList.add('active');
  drinkJustPressed = true;
});
btnDrink.addEventListener('touchend', function(e) {
  e.preventDefault();
  btnDrink.classList.remove('active');
});

// Prevent default touch behaviors on canvas + swipe for city select
var touchStartX = 0;
canvas.addEventListener('touchstart', function(e) {
  e.preventDefault();
  touchStartX = e.touches[0].clientX;
});
canvas.addEventListener('touchmove', function(e) { e.preventDefault(); });
canvas.addEventListener('touchend', function(e) {
  if (game.state === 'title' && e.changedTouches.length > 0) {
    var dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) selectedCityIndex = (selectedCityIndex + 1) % CITIES.length;
      else selectedCityIndex = (selectedCityIndex - 1 + CITIES.length) % CITIES.length;
    }
  }
});
