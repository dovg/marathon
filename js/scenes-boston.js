// ======== BOSTON SCENES ========
function drawBostonScene(scene, parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  switch (scene) {
    case 0: { // Hopkinton - small town start
      // New England houses
      const houseSp = 140;
      const houseOff = -(midP % houseSp);
      const colors = ['#e8e0d0','#d8d0c0','#f0e8d8','#e0d8c8'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const ci = ((x * 7) & 0xFF) % colors.length;
        ctx.fillStyle = colors[ci];
        ctx.fillRect(x, GROUND_Y - 70, 60, 70);
        // Pitched roof
        ctx.fillStyle = '#5a4a3a';
        ctx.beginPath();
        ctx.moveTo(x - 5, GROUND_Y - 70);
        ctx.lineTo(x + 30, GROUND_Y - 100);
        ctx.lineTo(x + 65, GROUND_Y - 70);
        ctx.fill();
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 55; wy < GROUND_Y - 10; wy += 18) {
          ctx.fillRect(x + 10, wy, 8, 10);
          ctx.fillRect(x + 38, wy, 8, 10);
        }
      }
      // Trees
      const treeSp = 200;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx + 100);
        if (x < -20 || x > canvas.width + 20) continue;
        ctx.fillStyle = '#4a3a20';
        ctx.fillRect(x, GROUND_Y - 80, 5, 80);
        ctx.fillStyle = '#2a7a2e';
        ctx.beginPath();
        ctx.arc(x + 2, GROUND_Y - 90, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 1: { // Ashland & Framingham - suburbs
      const houseSp = 120;
      const houseOff = -(midP % houseSp);
      const colors = ['#c8d8e8','#d8c8b8','#e0d0c0','#c0d0c0'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const ci = ((x * 7) & 0xFF) % colors.length;
        ctx.fillStyle = colors[ci];
        ctx.fillRect(x, GROUND_Y - 60, 70, 60);
        ctx.fillStyle = '#4a4a4a';
        ctx.beginPath();
        ctx.moveTo(x - 3, GROUND_Y - 60);
        ctx.lineTo(x + 35, GROUND_Y - 85);
        ctx.lineTo(x + 73, GROUND_Y - 60);
        ctx.fill();
        ctx.fillStyle = '#ffeaa7';
        ctx.fillRect(x + 12, GROUND_Y - 45, 8, 10);
        ctx.fillRect(x + 45, GROUND_Y - 45, 8, 10);
      }
      break;
    }
    case 2: { // Wellesley College
      // College buildings (brick)
      const bldgSp = 200;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -80 || x > canvas.width + 80) continue;
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(x, GROUND_Y - 100, 100, 100);
        ctx.fillStyle = '#a0522d';
        ctx.fillRect(x - 2, GROUND_Y - 104, 104, 6);
        // Tower
        ctx.fillStyle = '#7a3a10';
        ctx.fillRect(x + 35, GROUND_Y - 140, 30, 45);
        ctx.beginPath();
        ctx.moveTo(x + 33, GROUND_Y - 140);
        ctx.lineTo(x + 50, GROUND_Y - 165);
        ctx.lineTo(x + 67, GROUND_Y - 140);
        ctx.fill();
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 90; wy < GROUND_Y - 10; wy += 16) {
          for (let wx = x + 6; wx < x + 94; wx += 18) {
            ctx.fillRect(wx, wy, 8, 10);
          }
        }
      }
      // Trees
      const treeSp = 100;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx + 60);
        if (x < -20 || x > canvas.width + 20) continue;
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(x, GROUND_Y - 55, 4, 55);
        ctx.fillStyle = '#2a7a2e';
        ctx.beginPath();
        ctx.arc(x + 2, GROUND_Y - 65, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 3: { // Newton / Heartbreak Hill
      // Hilly terrain hint — undulating treeline
      const treeSp = 45;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx);
        if (x < -25 || x > canvas.width + 25) continue;
        const hillY = Math.sin((x + midP) * 0.008) * 20;
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(x + 6, GROUND_Y - 70 + hillY, 4, 70 - hillY);
        ctx.fillStyle = '#1a6a20';
        ctx.beginPath();
        ctx.arc(x + 8, GROUND_Y - 80 + hillY, 18, 0, Math.PI * 2);
        ctx.fill();
      }
      // "HEARTBREAK HILL" sign
      const signOff = -(midP % 3000);
      for (let sx = signOff; sx < canvas.width + 3000; sx += 3000) {
        const x = Math.floor(sx + 500);
        if (x < -60 || x > canvas.width + 60) continue;
        ctx.fillStyle = '#f0c040';
        ctx.fillRect(x, GROUND_Y - 60, 90, 16);
        ctx.fillStyle = '#1a1a2e';
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('HEARTBREAK HILL', x + 45, GROUND_Y - 49);
      }
      break;
    }
    case 4: { // Brookline - Citgo Sign
      const houseSp = 100;
      const houseOff = -(midP % houseSp);
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const h = 80 + ((x * 7) & 0x1F);
        ctx.fillStyle = '#8b5e3c';
        ctx.fillRect(x, GROUND_Y - h, 70, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 10; wy < GROUND_Y - 10; wy += 16) {
          for (let wx = x + 6; wx < x + 64; wx += 14) {
            ctx.fillRect(wx, wy, 6, 8);
          }
        }
      }
      // CITGO sign
      const citgoOff = -(farP % 3000);
      for (let cx = citgoOff; cx < canvas.width + 3000; cx += 3000) {
        const x = Math.floor(cx + 800);
        if (x < -30 || x > canvas.width + 30) continue;
        ctx.fillStyle = '#333';
        ctx.fillRect(x - 2, GROUND_Y - 200, 4, 120);
        // CITGO triangle
        ctx.fillStyle = '#e63946';
        ctx.beginPath();
        ctx.moveTo(x - 20, GROUND_Y - 170);
        ctx.lineTo(x, GROUND_Y - 200);
        ctx.lineTo(x + 20, GROUND_Y - 170);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = '7px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('CITGO', x, GROUND_Y - 177);
      }
      break;
    }
    case 5: { // Boylston Street Finish
      // Tall city buildings
      const bldgSp = 80;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -50 || x > canvas.width + 50) continue;
        const h = 120 + ((x * 13) & 0x7F);
        ctx.fillStyle = ['#546e7a','#607d8b','#455a64'][(x & 0xFF) % 3];
        ctx.fillRect(x, GROUND_Y - h, 55, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 8; wy < GROUND_Y - 8; wy += 12) {
          for (let wx = x + 4; wx < x + 51; wx += 10) {
            if (((wx * 11 + wy * 7) & 0xF) < 4)
              ctx.fillRect(wx, wy, 5, 6);
          }
        }
      }
      // Finish banner
      ctx.fillStyle = 'rgba(240,192,64,0.9)';
      ctx.fillRect(canvas.width / 2 - 100, GROUND_Y - 50, 200, 18);
      ctx.fillStyle = '#1a1a2e';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('BOSTON MARATHON', canvas.width / 2, GROUND_Y - 37);
      break;
    }
  }
}
