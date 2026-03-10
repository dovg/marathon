// ---- Helper: Onion dome ----
function drawOnionDome(x, y, color) {
  x = Math.floor(x);
  y = Math.floor(y);
  // Bulb shape
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - 20);
  ctx.quadraticCurveTo(x + 12, y - 16, x + 10, y - 6);
  ctx.quadraticCurveTo(x + 8, y, x, y);
  ctx.quadraticCurveTo(x - 8, y, x - 10, y - 6);
  ctx.quadraticCurveTo(x - 12, y - 16, x, y - 20);
  ctx.fill();
  // Cross on top
  ctx.fillStyle = '#ffd600';
  ctx.fillRect(x - 1, y - 26, 2, 8);
  ctx.fillRect(x - 3, y - 24, 6, 2);
}

// ---- Helper: Stalinist building ----
function drawStalinistBuilding(x, baseY) {
  x = Math.floor(x);
  if (x < -80 || x > canvas.width + 80) return;
  const w = 70;
  const h = 120;
  const y = baseY - h;

  // Main body
  ctx.fillStyle = '#a09078';
  ctx.fillRect(x - w / 2, y, w, h);

  // Central tower section
  ctx.fillStyle = '#b0a088';
  ctx.fillRect(x - 15, y - 30, 30, 30);
  // Spire
  ctx.fillStyle = '#8a7a68';
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 30);
  ctx.lineTo(x, y - 55);
  ctx.lineTo(x + 10, y - 30);
  ctx.fill();
  // Star on top
  ctx.fillStyle = '#e63946';
  ctx.fillRect(x - 3, y - 60, 6, 6);

  // Windows (rows and columns)
  ctx.fillStyle = '#ffeaa7';
  for (let wy = y + 8; wy < y + h - 8; wy += 14) {
    for (let wx = x - w / 2 + 6; wx < x + w / 2 - 6; wx += 12) {
      ctx.fillRect(wx, wy, 6, 8);
    }
  }

  // Ornamental cornice
  ctx.fillStyle = '#c0b098';
  ctx.fillRect(x - w / 2 - 2, y, w + 4, 4);
  ctx.fillRect(x - w / 2 - 2, y + h / 3, w + 4, 3);

  // Columns/pilasters on facade
  ctx.fillStyle = '#c5b8a0';
  ctx.fillRect(x - w / 2, y, 4, h);
  ctx.fillRect(x + w / 2 - 4, y, 4, h);
  ctx.fillRect(x - 2, y, 4, h);
}

// ---- Helper: Stadium stands with arched roof ----
function drawStadiumStands(parallax, isFinish) {
  const farP = parallax * 0.4;

  // Main stadium structure
  const standY = GROUND_Y - 120;

  // Stands — tiered seating
  ctx.fillStyle = '#455a64';
  ctx.fillRect(0, standY, canvas.width, 120);

  // Tiered rows of seats
  const seatColors = ['#e63946', '#c0392b', '#a93226', '#922b21', '#7b241c'];
  for (let row = 0; row < 5; row++) {
    ctx.fillStyle = seatColors[row];
    ctx.fillRect(0, standY + row * 20, canvas.width, 18);
    // Individual seats
    ctx.fillStyle = seatColors[row] + 'cc';
    const seatOff = -(farP % 12);
    for (let sx = seatOff - 12; sx < canvas.width + 12; sx += 12) {
      ctx.fillRect(Math.floor(sx), standY + row * 20, 10, 16);
    }
  }

  // Arched roof structure
  ctx.strokeStyle = '#78909c';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, standY - 10);
  ctx.quadraticCurveTo(canvas.width / 2, standY - 80, canvas.width, standY - 10);
  ctx.stroke();
  // Roof cables
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#90a4ae';
  for (let cx = 100; cx < canvas.width; cx += 100) {
    ctx.beginPath();
    ctx.moveTo(cx, standY - 10);
    const roofY = standY - 80 + Math.pow((cx - canvas.width / 2) / (canvas.width / 2), 2) * 70;
    ctx.lineTo(cx, roofY);
    ctx.stroke();
  }

  // Olympic rings (five interlocking)
  const ringY = standY - 30;
  const ringSpacing = 22;
  const ringStartX = canvas.width / 2 - ringSpacing * 2;
  const ringColors = ['#0085c7', '#000', '#e63946', '#ffd600', '#009f3d'];
  ctx.lineWidth = 2;
  for (let i = 0; i < 5; i++) {
    ctx.strokeStyle = ringColors[i];
    ctx.beginPath();
    const rx = ringStartX + i * ringSpacing;
    const ry = ringY + (i % 2 === 0 ? 0 : 8);
    ctx.arc(rx, ry, 8, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Entrance tunnels at bottom
  ctx.fillStyle = '#1a1a2e';
  const tunnelOff = -(farP % 200);
  for (let tx = tunnelOff; tx < canvas.width + 200; tx += 200) {
    ctx.fillRect(Math.floor(tx), GROUND_Y - 30, 40, 30);
    // Tunnel arch
    ctx.fillStyle = '#546e7a';
    ctx.fillRect(Math.floor(tx) - 2, GROUND_Y - 32, 44, 4);
    ctx.fillStyle = '#1a1a2e';
  }

  // Finish banners for scene 7
  if (isFinish) {
    const bannerOff = -(farP % 300);
    ctx.fillStyle = '#ffd600';
    for (let bx = bannerOff; bx < canvas.width + 300; bx += 300) {
      ctx.fillRect(Math.floor(bx), standY + 5, 60, 16);
      ctx.fillStyle = '#1a1a2e';
      ctx.font = '8px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('FINISH', Math.floor(bx) + 30, standY + 16);
      ctx.fillStyle = '#ffd600';
    }
    // Large "MOSCOW MARATHON" banner
    ctx.fillStyle = 'rgba(230,57,70,0.9)';
    ctx.fillRect(canvas.width / 2 - 100, standY - 15, 200, 18);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MOSCOW MARATHON', canvas.width / 2, standY - 2);
  }
}

// ---- Scene 0 & 7: Luzhniki Stadium ----
function drawLuzhniki(parallax, isFinish) {
  drawStadiumStands(parallax, isFinish);
}

// ---- Scene 1: Old City Embankment ----
function drawOldCityEmbankment(parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  // River in background
  const riverY = GROUND_Y - 30;
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(0, riverY - 15, canvas.width, 45);
  ctx.fillStyle = '#1e88e5';
  const waveOff = -(farP * 0.5) % 40;
  for (let wx = waveOff - 40; wx < canvas.width + 40; wx += 40) {
    ctx.fillRect(Math.floor(wx), riverY - 10, 20, 3);
    ctx.fillRect(Math.floor(wx) + 10, riverY, 15, 2);
  }

  // Old merchant houses (colorful facades)
  const houseSp = 160;
  const houseOff = -(midP % houseSp);
  const houseColors = ['#d4a07a', '#c9b88c', '#a8c4a0', '#c4a0a0', '#b8b0c8', '#d0c890'];
  for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
    const idx = ((Math.floor(hx + midP) * 7) & 0xFF) % houseColors.length;
    const color = houseColors[idx];
    const bx = Math.floor(hx);
    if (bx < -100 || bx > canvas.width + 100) continue;

    const hw = 80 + (idx % 3) * 15;
    const hh = 80 + (idx % 2) * 20;
    const hy = GROUND_Y - hh - 35;

    // House body
    ctx.fillStyle = color;
    ctx.fillRect(bx, hy, hw, hh);

    // Roof
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx - 3, hy - 6, hw + 6, 8);

    // Windows
    ctx.fillStyle = '#ffeaa7';
    for (let wy = hy + 10; wy < hy + hh - 10; wy += 18) {
      for (let wx = bx + 8; wx < bx + hw - 8; wx += 16) {
        ctx.fillRect(wx, wy, 8, 10);
        // Window frame
        ctx.fillStyle = '#fff';
        ctx.fillRect(wx - 1, wy - 1, 10, 1);
        ctx.fillRect(wx + 3, wy, 1, 10);
        ctx.fillStyle = '#ffeaa7';
      }
    }

    // Door
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx + hw / 2 - 6, hy + hh - 20, 12, 20);
  }

  // Church with onion dome (appears periodically)
  const churchSp = 1800;
  const churchOff = -(midP % churchSp);
  for (let cx = churchOff - churchSp; cx < canvas.width + churchSp; cx += churchSp) {
    const bx = Math.floor(cx + 500);
    if (bx < -60 || bx > canvas.width + 60) continue;
    // Church body
    ctx.fillStyle = '#e8e0d0';
    ctx.fillRect(bx - 20, GROUND_Y - 130, 40, 95);
    // Church roof
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx - 25, GROUND_Y - 135, 50, 8);
    // Onion dome
    drawOnionDome(bx, GROUND_Y - 140, '#2e7d32');
    // Small side domes
    drawOnionDome(bx - 18, GROUND_Y - 120, '#1b5e20');
    drawOnionDome(bx + 18, GROUND_Y - 120, '#1b5e20');
  }

  // Embankment railing
  ctx.fillStyle = '#546e7a';
  const railOff = -(parallax % 50);
  for (let rx = railOff - 50; rx < canvas.width + 50; rx += 50) {
    ctx.fillRect(Math.floor(rx), GROUND_Y - 25, 3, 25);
  }
  ctx.fillRect(0, GROUND_Y - 25, canvas.width, 2);
}

// ---- Scene 2: Kremlin Embankment ----
function drawKremlinEmbankment(parallax) {
  const riverY = GROUND_Y - 30;
  const wallParallax = parallax * 0.6;
  const wallHeight = 70;
  const wallY = GROUND_Y - wallHeight - 40;

  // River
  ctx.fillStyle = '#1565c0';
  ctx.fillRect(0, riverY - 15, canvas.width, 45);
  ctx.fillStyle = '#1e88e5';
  const waveOff = -(parallax * 0.3) % 40;
  for (let wx = waveOff - 40; wx < canvas.width + 40; wx += 40) {
    ctx.fillRect(Math.floor(wx), riverY - 10, 20, 3);
    ctx.fillRect(Math.floor(wx) + 10, riverY, 15, 2);
  }

  // Kremlin wall
  ctx.fillStyle = '#8b4513';
  ctx.fillRect(0, wallY, canvas.width, wallHeight);
  ctx.fillStyle = '#7a3b10';
  for (let by = wallY + 8; by < wallY + wallHeight; by += 10) {
    const brickOff = (by % 20 === 0) ? 0 : 15;
    for (let bx = -(wallParallax % 30) - 30 + brickOff; bx < canvas.width + 30; bx += 30) {
      ctx.fillRect(Math.floor(bx), by, 1, 8);
    }
  }

  // Crenellations
  ctx.fillStyle = '#8b4513';
  const crenOff = -(wallParallax % 24);
  for (let cx = crenOff - 24; cx < canvas.width + 24; cx += 24) {
    ctx.fillRect(Math.floor(cx), wallY - 12, 14, 12);
  }

  // Kremlin towers
  const towerSpacing = 1200;
  const towerOff = -(wallParallax % towerSpacing);
  for (let shift = towerOff - towerSpacing; shift < canvas.width + towerSpacing; shift += towerSpacing) {
    drawKremlinTowerDetailed(shift + 200, wallY);
    drawKremlinTowerDetailed(shift + 700, wallY);
  }

  // Embankment railing
  ctx.fillStyle = '#546e7a';
  const railOff = -(parallax % 50);
  for (let rx = railOff - 50; rx < canvas.width + 50; rx += 50) {
    ctx.fillRect(Math.floor(rx), GROUND_Y - 25, 3, 25);
  }
  ctx.fillRect(0, GROUND_Y - 25, canvas.width, 2);
}

function drawKremlinTowerDetailed(tx, wallY) {
  if (tx < -120 || tx > canvas.width + 120) return;
  tx = Math.floor(tx);
  const towerW = 50;
  const towerH = 140;
  const towerY = wallY - towerH + 70;

  ctx.fillStyle = '#6c3a2a';
  ctx.fillRect(tx - towerW / 2, towerY, towerW, towerH);
  ctx.fillStyle = '#7a4a30';
  ctx.fillRect(tx - towerW / 2 + 5, towerY - 20, towerW - 10, 25);

  // Pointed roof
  ctx.fillStyle = '#2e7d32';
  ctx.beginPath();
  ctx.moveTo(tx - towerW / 2 - 2, towerY - 20);
  ctx.lineTo(tx, towerY - 70);
  ctx.lineTo(tx + towerW / 2 + 2, towerY - 20);
  ctx.fill();

  // Spire & star
  ctx.fillStyle = '#ffd600';
  ctx.fillRect(tx - 1, towerY - 82, 3, 14);
  drawPixelRect(tx - 4, towerY - 88, 9, 8, '#e63946');

  // Clock face
  ctx.fillStyle = '#fff9c4';
  ctx.beginPath();
  ctx.arc(tx, towerY + 30, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#2d3436';
  ctx.fillRect(tx - 1, towerY + 22, 2, 9);
  ctx.fillRect(tx - 1, towerY + 28, 7, 2);

  // Windows
  ctx.fillStyle = '#ffeaa7';
  for (let wy = towerY + 50; wy < towerY + towerH - 10; wy += 18) {
    ctx.fillRect(tx - 8, wy, 5, 8);
    ctx.fillRect(tx + 3, wy, 5, 8);
  }
}

// ---- Scene 3: Moscow City ----
function drawMoscowCity(parallax) {
  const farParallax = parallax * 0.2;
  const skyscrapers = [
    { x: 0, w: 40, h: 200, color: '#37474f' },
    { x: 60, w: 30, h: 160, color: '#455a64' },
    { x: 110, w: 50, h: 240, color: '#37474f' },
    { x: 180, w: 35, h: 220, color: '#546e7a' },
    { x: 240, w: 45, h: 180, color: '#455a64' },
    { x: 310, w: 55, h: 260, color: '#37474f' },
    { x: 390, w: 30, h: 150, color: '#546e7a' },
    { x: 440, w: 40, h: 190, color: '#455a64' },
    { x: 500, w: 50, h: 230, color: '#37474f' },
    { x: 570, w: 35, h: 170, color: '#546e7a' },
    { x: 630, w: 45, h: 210, color: '#455a64' },
    { x: 700, w: 30, h: 140, color: '#37474f' },
    { x: 750, w: 55, h: 250, color: '#546e7a' },
    { x: 830, w: 40, h: 180, color: '#455a64' },
  ];
  const patternW = 900;
  const startOff = -(farParallax % patternW);

  for (let shift = startOff - patternW; shift < canvas.width + patternW; shift += patternW) {
    for (const s of skyscrapers) {
      const sx = Math.floor(shift + s.x);
      if (sx + s.w < -60 || sx > canvas.width + 60) continue;
      ctx.fillStyle = s.color;
      ctx.fillRect(sx, GROUND_Y - s.h, s.w, s.h);
      // Glass windows
      ctx.fillStyle = '#78909c';
      for (let wy = GROUND_Y - s.h + 6; wy < GROUND_Y - 4; wy += 8) {
        ctx.fillRect(sx + 2, wy, s.w - 4, 3);
      }
      // Lit windows
      ctx.fillStyle = '#ffab40';
      for (let wy = GROUND_Y - s.h + 8; wy < GROUND_Y - 8; wy += 16) {
        for (let wx = sx + 4; wx < sx + s.w - 4; wx += 10) {
          const hash = (Math.floor(wx) * 11 + wy * 7) & 0xF;
          if (hash < 4) ctx.fillRect(Math.floor(wx), wy, 4, 5);
        }
      }
      // Antenna on tall buildings
      if (s.h > 200) {
        ctx.fillStyle = '#90a4ae';
        ctx.fillRect(sx + s.w / 2 - 1, GROUND_Y - s.h - 20, 3, 20);
        ctx.fillStyle = '#ff1744';
        ctx.fillRect(sx + s.w / 2 - 2, GROUND_Y - s.h - 22, 5, 4);
      }
    }
  }

  // Bridge
  const midParallax = parallax * 0.5;
  const bridgeSp = 1500;
  const bridgeOff = -(midParallax % bridgeSp);
  for (let bx = bridgeOff - bridgeSp; bx < canvas.width + bridgeSp; bx += bridgeSp) {
    drawBridge(Math.floor(bx + 300));
  }

  // River
  ctx.fillStyle = '#0d47a1';
  ctx.fillRect(0, GROUND_Y - 20, canvas.width, 20);
  ctx.fillStyle = '#1565c0';
  const waveOff = -(parallax * 0.4) % 30;
  for (let wx = waveOff - 30; wx < canvas.width + 30; wx += 30) {
    ctx.fillRect(Math.floor(wx), GROUND_Y - 16, 15, 2);
    ctx.fillRect(Math.floor(wx) + 8, GROUND_Y - 8, 12, 2);
  }
}

function drawBridge(bx) {
  if (bx < -200 || bx > canvas.width + 200) return;
  ctx.fillStyle = '#607d8b';
  ctx.fillRect(bx - 80, GROUND_Y - 35, 160, 8);
  ctx.fillStyle = '#455a64';
  ctx.fillRect(bx - 70, GROUND_Y - 35, 6, 35);
  ctx.fillRect(bx + 64, GROUND_Y - 35, 6, 35);
  ctx.fillRect(bx - 3, GROUND_Y - 35, 6, 35);
  ctx.fillStyle = '#78909c';
  ctx.fillRect(bx - 2, GROUND_Y - 55, 4, 20);
  ctx.strokeStyle = '#90a4ae';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bx - 70, GROUND_Y - 35);
  ctx.lineTo(bx, GROUND_Y - 55);
  ctx.lineTo(bx + 70, GROUND_Y - 35);
  ctx.stroke();
}

// ---- Scene 4: Ulitsa 1905 Goda ----
function drawUlitsa1905(parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  // Stalinist buildings in background
  const buildingSp = 800;
  const buildingOff = -(farP % buildingSp);
  for (let bx = buildingOff - buildingSp; bx < canvas.width + buildingSp; bx += buildingSp) {
    drawStalinistBuilding(Math.floor(bx + 200), GROUND_Y - 35);
    drawStalinistBuilding(Math.floor(bx + 600), GROUND_Y - 35);
  }

  // Tram wires overhead
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 1;
  const wireOff = -(midP % 150);
  // Main wire
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y - 170);
  ctx.lineTo(canvas.width, GROUND_Y - 170);
  ctx.stroke();
  // Wire supports (poles)
  for (let px = wireOff - 150; px < canvas.width + 150; px += 150) {
    const sx = Math.floor(px);
    // Pole
    ctx.fillStyle = '#555';
    ctx.fillRect(sx, GROUND_Y - 180, 3, 180);
    // Cross-arm
    ctx.fillRect(sx - 15, GROUND_Y - 175, 33, 3);
    // Wire droops
    ctx.strokeStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(sx - 15, GROUND_Y - 170);
    ctx.quadraticCurveTo(sx + 75, GROUND_Y - 155, sx + 150, GROUND_Y - 170);
    ctx.stroke();
  }

  // Street lamps
  const lampSp = 250;
  const lampOff = -(midP % lampSp);
  for (let lx = lampOff - lampSp; lx < canvas.width + lampSp; lx += lampSp) {
    const sx = Math.floor(lx + 100);
    if (sx < -20 || sx > canvas.width + 20) continue;
    // Lamp pole
    ctx.fillStyle = '#333';
    ctx.fillRect(sx, GROUND_Y - 60, 3, 60);
    // Lamp head
    ctx.fillStyle = '#555';
    ctx.fillRect(sx - 5, GROUND_Y - 64, 13, 5);
    // Light glow
    ctx.fillStyle = '#ffeaa740';
    ctx.beginPath();
    ctx.arc(sx + 1, GROUND_Y - 62, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  // "1905 ГОДА" street signs
  const signSp = 2000;
  const signOff = -(midP % signSp);
  for (let sx = signOff - signSp; sx < canvas.width + signSp; sx += signSp) {
    const px = Math.floor(sx + 400);
    if (px < -60 || px > canvas.width + 60) continue;
    // Sign plate
    ctx.fillStyle = '#1565c0';
    ctx.fillRect(px, GROUND_Y - 100, 70, 18);
    ctx.fillStyle = '#fff';
    ctx.font = '8px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('1905 ГОДА', px + 35, GROUND_Y - 87);
  }
}

// ---- Scene 5: Kitay-Gorod ----
function drawKitayGorod(parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  // Fortress wall fragments in far background
  const wallSp = 1200;
  const wallOff = -(farP % wallSp);
  for (let wx = wallOff - wallSp; wx < canvas.width + wallSp; wx += wallSp) {
    const bx = Math.floor(wx + 300);
    if (bx < -120 || bx > canvas.width + 120) continue;
    // Old fortress wall fragment
    ctx.fillStyle = '#7a6a5a';
    ctx.fillRect(bx, GROUND_Y - 140, 200, 100);
    // Crenellations
    ctx.fillStyle = '#8a7a6a';
    for (let cx = bx; cx < bx + 200; cx += 20) {
      ctx.fillRect(cx, GROUND_Y - 150, 12, 12);
    }
    // Wall texture
    ctx.fillStyle = '#6a5a4a';
    for (let by = GROUND_Y - 130; by < GROUND_Y - 45; by += 12) {
      for (let bxx = bx + 2; bxx < bx + 198; bxx += 25) {
        ctx.fillRect(bxx, by, 1, 10);
      }
    }
  }

  // Historic low buildings with arched windows
  const houseSp = 140;
  const houseOff = -(midP % houseSp);
  const houseColors = ['#d8c8a8', '#c8b898', '#e0d0b0', '#c0b090', '#d0c0a0'];
  for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
    const idx = ((Math.floor(hx + midP) * 11) & 0xFF) % houseColors.length;
    const bx = Math.floor(hx);
    if (bx < -80 || bx > canvas.width + 80) continue;

    const hw = 60 + (idx % 3) * 10;
    const hh = 60 + (idx % 2) * 15;
    const hy = GROUND_Y - hh - 35;

    ctx.fillStyle = houseColors[idx];
    ctx.fillRect(bx, hy, hw, hh);

    // Arched windows
    ctx.fillStyle = '#a08060';
    for (let wy = hy + 8; wy < hy + hh - 12; wy += 20) {
      for (let wx = bx + 6; wx < bx + hw - 10; wx += 18) {
        // Window body
        ctx.fillRect(wx, wy + 3, 10, 10);
        // Arch top
        ctx.beginPath();
        ctx.arc(wx + 5, wy + 3, 5, Math.PI, 0);
        ctx.fill();
        // Glass
        ctx.fillStyle = '#ffeaa7';
        ctx.fillRect(wx + 1, wy + 4, 8, 8);
        ctx.fillStyle = '#a08060';
      }
    }

    // Roof
    ctx.fillStyle = '#6d5d4d';
    ctx.fillRect(bx - 2, hy - 4, hw + 4, 6);
  }

  // Old church
  const churchSp = 2000;
  const churchOff = -(midP % churchSp);
  for (let cx = churchOff - churchSp; cx < canvas.width + churchSp; cx += churchSp) {
    const bx = Math.floor(cx + 800);
    if (bx < -50 || bx > canvas.width + 50) continue;
    ctx.fillStyle = '#e8e0d0';
    ctx.fillRect(bx - 18, GROUND_Y - 120, 36, 85);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx - 22, GROUND_Y - 125, 44, 7);
    drawOnionDome(bx, GROUND_Y - 130, '#ffd600');
  }
}

// ---- Scene 6: Embankment Return (sunset colors) ----
function drawEmbankmentReturn(parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  // River with sunset reflections
  const riverY = GROUND_Y - 30;
  ctx.fillStyle = '#0d47a1';
  ctx.fillRect(0, riverY - 15, canvas.width, 45);
  // Sunset reflections on water
  ctx.fillStyle = '#c06040';
  ctx.globalAlpha = 0.3;
  const reflOff = -(farP * 0.4) % 50;
  for (let rx = reflOff - 50; rx < canvas.width + 50; rx += 50) {
    ctx.fillRect(Math.floor(rx), riverY - 8, 25, 3);
    ctx.fillRect(Math.floor(rx) + 12, riverY + 2, 18, 2);
  }
  ctx.globalAlpha = 1;
  // Regular waves
  ctx.fillStyle = '#1e88e5';
  const waveOff = -(farP * 0.5) % 40;
  for (let wx = waveOff - 40; wx < canvas.width + 40; wx += 40) {
    ctx.fillRect(Math.floor(wx), riverY - 10, 20, 3);
    ctx.fillRect(Math.floor(wx) + 10, riverY, 15, 2);
  }

  // Merchant houses (similar to scene 1 but in sunset light)
  const houseSp = 180;
  const houseOff = -(midP % houseSp);
  const houseColors = ['#b08060', '#a07858', '#987050', '#b88868', '#a88070'];
  for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
    const idx = ((Math.floor(hx + midP) * 7) & 0xFF) % houseColors.length;
    const bx = Math.floor(hx);
    if (bx < -100 || bx > canvas.width + 100) continue;

    const hw = 80 + (idx % 3) * 15;
    const hh = 75 + (idx % 2) * 20;
    const hy = GROUND_Y - hh - 35;

    ctx.fillStyle = houseColors[idx];
    ctx.fillRect(bx, hy, hw, hh);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(bx - 3, hy - 6, hw + 6, 8);

    // Warm-lit windows (sunset)
    ctx.fillStyle = '#ffcc80';
    for (let wy = hy + 10; wy < hy + hh - 10; wy += 18) {
      for (let wx = bx + 8; wx < bx + hw - 8; wx += 16) {
        ctx.fillRect(wx, wy, 8, 10);
      }
    }
  }

  // Church silhouette with onion dome
  const churchSp = 2200;
  const churchOff = -(midP % churchSp);
  for (let cx = churchOff - churchSp; cx < canvas.width + churchSp; cx += churchSp) {
    const bx = Math.floor(cx + 600);
    if (bx < -50 || bx > canvas.width + 50) continue;
    ctx.fillStyle = '#4a3a2a';
    ctx.fillRect(bx - 18, GROUND_Y - 130, 36, 95);
    ctx.fillRect(bx - 22, GROUND_Y - 135, 44, 7);
    drawOnionDome(bx, GROUND_Y - 140, '#c0a000');
    drawOnionDome(bx - 16, GROUND_Y - 118, '#a08800');
    drawOnionDome(bx + 16, GROUND_Y - 118, '#a08800');
  }

  // Embankment railing
  ctx.fillStyle = '#546e7a';
  const railOff = -(parallax % 50);
  for (let rx = railOff - 50; rx < canvas.width + 50; rx += 50) {
    ctx.fillRect(Math.floor(rx), GROUND_Y - 25, 3, 25);
  }
  ctx.fillRect(0, GROUND_Y - 25, canvas.width, 2);
}
