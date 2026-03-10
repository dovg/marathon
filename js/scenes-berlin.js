// ======== BERLIN SCENES ========
function drawBerlinScene(scene, parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  switch (scene) {
    case 0: { // Brandenburg Gate / Unter den Linden
      // Linden trees lining the avenue
      const treeSp = 120;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const bx = Math.floor(tx);
        if (bx < -40 || bx > canvas.width + 40) continue;
        ctx.fillStyle = '#4a3520';
        ctx.fillRect(bx + 8, GROUND_Y - 60, 4, 60);
        ctx.fillStyle = '#2d6b2e';
        ctx.beginPath();
        ctx.arc(bx + 10, GROUND_Y - 70, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#3a8a3b';
        ctx.beginPath();
        ctx.arc(bx + 10, GROUND_Y - 75, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      // Brandenburg Gate
      const gateOff = -(farP % 2000);
      for (let gx = gateOff; gx < canvas.width + 2000; gx += 2000) {
        const bx = Math.floor(gx + 400);
        if (bx < -100 || bx > canvas.width + 100) continue;
        // Columns
        ctx.fillStyle = '#c8b898';
        for (let c = 0; c < 6; c++) {
          ctx.fillRect(bx - 50 + c * 20, GROUND_Y - 160, 8, 120);
        }
        // Top beam
        ctx.fillStyle = '#d0c8a0';
        ctx.fillRect(bx - 55, GROUND_Y - 165, 110, 12);
        ctx.fillRect(bx - 55, GROUND_Y - 40, 110, 5);
        // Quadriga on top
        ctx.fillStyle = '#c0a850';
        ctx.fillRect(bx - 15, GROUND_Y - 185, 30, 18);
        ctx.fillRect(bx - 5, GROUND_Y - 195, 10, 12);
      }
      break;
    }
    case 1: { // Tiergarten Park
      // Dense trees
      const treeSp = 60;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const bx = Math.floor(tx);
        if (bx < -30 || bx > canvas.width + 30) continue;
        const h = 50 + ((bx * 7) & 0x1F);
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(bx + 6, GROUND_Y - h, 4, h);
        ctx.fillStyle = '#1a6a20';
        ctx.beginPath();
        ctx.arc(bx + 8, GROUND_Y - h - 10, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2a8a30';
        ctx.beginPath();
        ctx.arc(bx + 12, GROUND_Y - h - 5, 15, 0, Math.PI * 2);
        ctx.fill();
      }
      // Victory Column in distance
      const colOff = -(farP % 3000);
      for (let cx = colOff; cx < canvas.width + 3000; cx += 3000) {
        const bx = Math.floor(cx + 800);
        if (bx < -20 || bx > canvas.width + 20) continue;
        ctx.fillStyle = '#8a7a60';
        ctx.fillRect(bx - 8, GROUND_Y - 200, 16, 160);
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(bx, GROUND_Y - 210, 10, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 2: { // Potsdamer Platz - modern buildings
      const bldgSp = 100;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -60 || x > canvas.width + 60) continue;
        const h = 120 + ((x * 13) & 0x7F);
        const w = 30 + ((x * 7) & 0x1F);
        ctx.fillStyle = ['#37474f','#455a64','#546e7a'][(x & 0xFF) % 3];
        ctx.fillRect(x, GROUND_Y - h, w, h);
        ctx.fillStyle = '#78909c';
        for (let wy = GROUND_Y - h + 6; wy < GROUND_Y - 4; wy += 8) {
          ctx.fillRect(x + 2, wy, w - 4, 3);
        }
      }
      // Sony Center dome hint
      const domeOff = -(farP % 2500);
      for (let dx = domeOff; dx < canvas.width + 2500; dx += 2500) {
        const x = Math.floor(dx + 600);
        if (x < -80 || x > canvas.width + 80) continue;
        ctx.strokeStyle = '#78909c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 100, 60, Math.PI, 0);
        ctx.stroke();
        ctx.fillStyle = 'rgba(120,144,156,0.2)';
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 100, 60, Math.PI, 0);
        ctx.fill();
      }
      break;
    }
    case 3: { // East Side Gallery / Berlin Wall
      // Wall segments
      const wallSp = 80;
      const wallOff = -(midP % wallSp);
      const wallColors = ['#e63946','#1e88e5','#ffd600','#4caf50','#9c27b0','#ff9800'];
      for (let wx = wallOff - wallSp; wx < canvas.width + wallSp; wx += wallSp) {
        const x = Math.floor(wx);
        if (x < -50 || x > canvas.width + 50) continue;
        // Wall segment
        ctx.fillStyle = '#b0b0b0';
        ctx.fillRect(x, GROUND_Y - 80, 70, 80);
        // "Art" - colored rectangles
        const ci = ((x * 7) & 0xFF) % wallColors.length;
        ctx.fillStyle = wallColors[ci] + 'cc';
        ctx.fillRect(x + 4, GROUND_Y - 74, 62, 68);
        // Abstract shapes
        ctx.fillStyle = wallColors[(ci + 2) % wallColors.length] + 'aa';
        ctx.fillRect(x + 10, GROUND_Y - 60, 20, 30);
        ctx.beginPath();
        ctx.arc(x + 45, GROUND_Y - 50, 12, 0, Math.PI * 2);
        ctx.fill();
      }
      // Spree river behind
      ctx.fillStyle = '#1565c0';
      ctx.fillRect(0, GROUND_Y - 100, canvas.width, 20);
      ctx.fillStyle = '#1e88e5';
      const waveOff = -(farP * 0.5) % 40;
      for (let wx = waveOff - 40; wx < canvas.width + 40; wx += 40) {
        ctx.fillRect(Math.floor(wx), GROUND_Y - 95, 20, 3);
      }
      break;
    }
    case 4: { // Alexanderplatz / TV Tower
      // Buildings
      const bldgSp = 120;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -60 || x > canvas.width + 60) continue;
        const h = 80 + ((x * 11) & 0x3F);
        ctx.fillStyle = '#607d8b';
        ctx.fillRect(x, GROUND_Y - h, 50, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 8; wy < GROUND_Y - 8; wy += 14) {
          for (let wx = x + 4; wx < x + 46; wx += 10) {
            if (((wx * 11 + wy * 7) & 0xF) < 5)
              ctx.fillRect(wx, wy, 6, 8);
          }
        }
      }
      // TV Tower (Fernsehturm)
      const tvOff = -(farP * 0.5 % 3000);
      for (let tx = tvOff; tx < canvas.width + 3000; tx += 3000) {
        const x = Math.floor(tx + 500);
        if (x < -30 || x > canvas.width + 30) continue;
        ctx.fillStyle = '#90a4ae';
        ctx.fillRect(x - 2, GROUND_Y - 280, 4, 240);
        // Sphere
        ctx.fillStyle = '#b0bec5';
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 220, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.beginPath();
        ctx.arc(x - 5, GROUND_Y - 225, 8, 0, Math.PI * 2);
        ctx.fill();
        // Antenna
        ctx.fillStyle = '#78909c';
        ctx.fillRect(x - 1, GROUND_Y - 300, 2, 22);
      }
      break;
    }
    case 5: { // Reichstag Finish
      // Reichstag building
      const reichOff = -(farP % 2500);
      for (let rx = reichOff; rx < canvas.width + 2500; rx += 2500) {
        const x = Math.floor(rx + 500);
        if (x < -120 || x > canvas.width + 120) continue;
        ctx.fillStyle = '#c8c0a8';
        ctx.fillRect(x - 80, GROUND_Y - 120, 160, 120);
        // Columns
        ctx.fillStyle = '#d8d0b8';
        for (let c = 0; c < 6; c++) {
          ctx.fillRect(x - 70 + c * 28, GROUND_Y - 130, 8, 100);
        }
        // Pediment
        ctx.fillStyle = '#d0c8a0';
        ctx.beginPath();
        ctx.moveTo(x - 85, GROUND_Y - 130);
        ctx.lineTo(x, GROUND_Y - 160);
        ctx.lineTo(x + 85, GROUND_Y - 130);
        ctx.fill();
        // Glass dome
        ctx.strokeStyle = '#a0c0d0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 160, 30, Math.PI, 0);
        ctx.stroke();
        ctx.fillStyle = 'rgba(160,192,208,0.25)';
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 160, 30, Math.PI, 0);
        ctx.fill();
        // "DEM DEUTSCHEN VOLKE"
        ctx.fillStyle = '#8a8070';
        ctx.font = '6px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DEM DEUTSCHEN VOLKE', x, GROUND_Y - 132);
      }
      // Finish banners
      ctx.fillStyle = 'rgba(240,192,64,0.9)';
      ctx.fillRect(canvas.width / 2 - 100, GROUND_Y - 50, 200, 18);
      ctx.fillStyle = '#1a1a2e';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BERLIN MARATHON', canvas.width / 2, GROUND_Y - 37);
      break;
    }
  }
}
