// ======== SINGAPORE SCENES ========
function drawSingaporeScene(scene, parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  switch (scene) {
    case 0: { // Padang / Colonial District
      // Colonial buildings
      const bldgSp = 180;
      const bldgOff = -(midP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -80 || x > canvas.width + 80) continue;
        ctx.fillStyle = '#f0e8d0';
        ctx.fillRect(x, GROUND_Y - 90, 100, 90);
        // Columns
        ctx.fillStyle = '#e8e0c8';
        for (let c = 0; c < 5; c++) {
          ctx.fillRect(x + 6 + c * 22, GROUND_Y - 95, 6, 80);
        }
        ctx.fillStyle = '#e0d8c0';
        ctx.fillRect(x - 3, GROUND_Y - 98, 106, 6);
        // Red tile roof
        ctx.fillStyle = '#b04030';
        ctx.fillRect(x - 5, GROUND_Y - 104, 110, 8);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 75; wy < GROUND_Y - 15; wy += 18) {
          for (let wx = x + 10; wx < x + 90; wx += 22) {
            ctx.fillRect(wx, wy, 8, 10);
          }
        }
      }
      break;
    }
    case 1: { // Marina Bay / Merlion
      // Marina Bay Sands in background
      const mbsOff = -(farP % 3000);
      for (let mx = mbsOff; mx < canvas.width + 3000; mx += 3000) {
        const x = Math.floor(mx + 500);
        if (x < -100 || x > canvas.width + 100) continue;
        // Three towers
        ctx.fillStyle = '#546e7a';
        ctx.fillRect(x - 60, GROUND_Y - 220, 25, 220);
        ctx.fillRect(x - 12, GROUND_Y - 230, 25, 230);
        ctx.fillRect(x + 35, GROUND_Y - 220, 25, 220);
        // SkyPark (boat on top)
        ctx.fillStyle = '#78909c';
        ctx.fillRect(x - 70, GROUND_Y - 240, 170, 12);
        // Windows
        ctx.fillStyle = '#90caf9';
        for (let t = 0; t < 3; t++) {
          const tx = x - 60 + t * 47 + (t === 1 ? -1 : 0);
          for (let wy = GROUND_Y - 210; wy < GROUND_Y - 10; wy += 10) {
            ctx.fillRect(tx + 3, wy, 19, 4);
          }
        }
      }
      // Merlion
      const merlOff = -(midP % 3000);
      for (let mx = merlOff; mx < canvas.width + 3000; mx += 3000) {
        const x = Math.floor(mx + 200);
        if (x < -20 || x > canvas.width + 20) continue;
        ctx.fillStyle = '#d0d0d0';
        ctx.fillRect(x - 8, GROUND_Y - 50, 16, 50);
        ctx.fillRect(x - 12, GROUND_Y - 60, 24, 15);
        // Water spray
        ctx.fillStyle = '#74b9ff';
        ctx.fillRect(x + 10, GROUND_Y - 55, 15, 3);
        ctx.fillRect(x + 20, GROUND_Y - 50, 10, 3);
      }
      // Water
      ctx.fillStyle = '#0d47a1';
      ctx.fillRect(0, GROUND_Y - 15, canvas.width, 15);
      break;
    }
    case 2: { // Gardens by the Bay / Supertrees
      // Supertree grove
      const treeSp = 120;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx);
        if (x < -30 || x > canvas.width + 30) continue;
        const h = 120 + ((x * 7) & 0x3F);
        // Trunk (tapers)
        ctx.fillStyle = '#5a7a5a';
        ctx.fillRect(x + 6, GROUND_Y - h, 6, h);
        // Canopy (mushroom shape)
        ctx.fillStyle = '#2e7d32';
        ctx.beginPath();
        ctx.arc(x + 9, GROUND_Y - h, 25, Math.PI, 0);
        ctx.fill();
        ctx.fillStyle = '#388e3c';
        ctx.beginPath();
        ctx.arc(x + 9, GROUND_Y - h + 5, 20, Math.PI, 0);
        ctx.fill();
        // Hanging vines
        ctx.fillStyle = '#43a047';
        for (let v = -15; v < 15; v += 6) {
          ctx.fillRect(x + 9 + v, GROUND_Y - h + 5, 2, 15 + ((v * 3) & 0x7));
        }
      }
      // Skyway between trees
      ctx.strokeStyle = '#78909c';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 130);
      ctx.quadraticCurveTo(canvas.width / 2, GROUND_Y - 110, canvas.width, GROUND_Y - 130);
      ctx.stroke();
      break;
    }
    case 3: { // East Coast Park / Beach
      // Palm trees
      const palmSp = 150;
      const palmOff = -(midP % palmSp);
      for (let px = palmOff - palmSp; px < canvas.width + palmSp; px += palmSp) {
        const x = Math.floor(px);
        if (x < -30 || x > canvas.width + 30) continue;
        // Curved trunk
        ctx.fillStyle = '#8b7355';
        ctx.fillRect(x + 4, GROUND_Y - 80, 6, 80);
        // Fronds
        ctx.fillStyle = '#2e7d32';
        for (let f = 0; f < 5; f++) {
          const angle = -0.6 + f * 0.3;
          ctx.save();
          ctx.translate(x + 7, GROUND_Y - 80);
          ctx.rotate(angle);
          ctx.fillRect(-2, -30, 4, 30);
          ctx.fillRect(-8, -30, 16, 5);
          ctx.restore();
        }
      }
      // Ocean in background
      ctx.fillStyle = '#0288d1';
      ctx.fillRect(0, GROUND_Y - 40, canvas.width, 20);
      ctx.fillStyle = '#039be5';
      const waveOff = -(farP * 0.5) % 30;
      for (let wx = waveOff - 30; wx < canvas.width + 30; wx += 30) {
        ctx.fillRect(Math.floor(wx), GROUND_Y - 36, 15, 3);
      }
      break;
    }
    case 4: { // Chinatown / Shophouses
      const houseSp = 70;
      const houseOff = -(midP % houseSp);
      const houseColors = ['#e63946','#ffd600','#2196f3','#4caf50','#ff9800','#9c27b0'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -40 || x > canvas.width + 40) continue;
        const ci = ((x * 7) & 0xFF) % houseColors.length;
        ctx.fillStyle = houseColors[ci];
        ctx.fillRect(x, GROUND_Y - 80, 55, 80);
        // Shuttered windows
        ctx.fillStyle = '#fff';
        for (let wy = GROUND_Y - 65; wy < GROUND_Y - 15; wy += 20) {
          ctx.fillRect(x + 8, wy, 14, 12);
          ctx.fillRect(x + 32, wy, 14, 12);
        }
        // Five-foot way (covered walkway)
        ctx.fillStyle = houseColors[ci] + 'cc';
        ctx.fillRect(x - 3, GROUND_Y - 25, 61, 4);
        // Ornamental top
        ctx.fillStyle = '#fff';
        ctx.fillRect(x - 2, GROUND_Y - 82, 59, 4);
      }
      // Red lanterns
      const lantSp = 100;
      const lantOff = -(midP % lantSp);
      for (let lx = lantOff - lantSp; lx < canvas.width + lantSp; lx += lantSp) {
        const x = Math.floor(lx + 30);
        if (x < -10 || x > canvas.width + 10) continue;
        ctx.fillStyle = '#e63946';
        ctx.fillRect(x, GROUND_Y - 100, 10, 14);
        ctx.fillStyle = '#ffd600';
        ctx.fillRect(x + 2, GROUND_Y - 102, 6, 2);
        ctx.fillRect(x + 2, GROUND_Y - 88, 6, 2);
      }
      break;
    }
    case 5: { // Marina Bay Sands Finish (night feel)
      // Skyline silhouettes
      const bldgSp = 70;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -40 || x > canvas.width + 40) continue;
        const h = 100 + ((x * 13) & 0x7F);
        ctx.fillStyle = '#2a2a3a';
        ctx.fillRect(x, GROUND_Y - h, 50, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 8; wy < GROUND_Y - 8; wy += 10) {
          for (let wx = x + 4; wx < x + 46; wx += 8) {
            if (((wx * 11 + wy * 7) & 0xF) < 5)
              ctx.fillRect(wx, wy, 4, 5);
          }
        }
      }
      // Marina Bay water reflections
      ctx.fillStyle = '#0d47a1';
      ctx.fillRect(0, GROUND_Y - 20, canvas.width, 20);
      ctx.fillStyle = '#ffeaa7';
      ctx.globalAlpha = 0.15;
      for (let rx = -(farP % 30); rx < canvas.width + 30; rx += 30) {
        ctx.fillRect(Math.floor(rx), GROUND_Y - 15, 10, 2);
        ctx.fillRect(Math.floor(rx) + 5, GROUND_Y - 8, 8, 2);
      }
      ctx.globalAlpha = 1;
      // Finish
      ctx.fillStyle = 'rgba(230,57,70,0.9)';
      ctx.fillRect(canvas.width / 2 - 100, GROUND_Y - 50, 200, 18);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('SINGAPORE MARATHON', canvas.width / 2, GROUND_Y - 37);
      break;
    }
  }
}
