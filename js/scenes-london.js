// ======== LONDON SCENES ========
function drawLondonScene(scene, parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  switch (scene) {
    case 0: { // Greenwich
      // Georgian houses
      const houseSp = 100;
      const houseOff = -(midP % houseSp);
      const colors = ['#d8c8a8','#e8d8b8','#c8b898','#e0d0b0'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const ci = ((x * 7) & 0xFF) % colors.length;
        ctx.fillStyle = colors[ci];
        ctx.fillRect(x, GROUND_Y - 90, 80, 90);
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(x - 2, GROUND_Y - 94, 84, 6);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 80; wy < GROUND_Y - 10; wy += 18) {
          for (let wx = x + 6; wx < x + 74; wx += 16) {
            ctx.fillRect(wx, wy, 8, 10);
          }
        }
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x + 32, GROUND_Y - 22, 14, 22);
      }
      // Cutty Sark ship masts
      const shipOff = -(farP % 3000);
      for (let sx = shipOff; sx < canvas.width + 3000; sx += 3000) {
        const x = Math.floor(sx + 600);
        if (x < -40 || x > canvas.width + 40) continue;
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(x - 1, GROUND_Y - 180, 3, 140);
        ctx.fillRect(x + 20, GROUND_Y - 160, 3, 120);
        ctx.fillRect(x - 22, GROUND_Y - 160, 3, 120);
        // Hull
        ctx.fillStyle = '#2d1f10';
        ctx.fillRect(x - 35, GROUND_Y - 45, 70, 15);
      }
      break;
    }
    case 1: { // Tower Bridge
      // Tower Bridge structure
      const bridgeOff = -(farP % 2500);
      for (let bx = bridgeOff; bx < canvas.width + 2500; bx += 2500) {
        const x = Math.floor(bx + 500);
        if (x < -150 || x > canvas.width + 150) continue;
        // Two towers
        ctx.fillStyle = '#7a8a9a';
        ctx.fillRect(x - 60, GROUND_Y - 160, 30, 160);
        ctx.fillRect(x + 30, GROUND_Y - 160, 30, 160);
        // Tower tops (pointed)
        ctx.fillStyle = '#5a6a7a';
        ctx.beginPath();
        ctx.moveTo(x - 60, GROUND_Y - 160);
        ctx.lineTo(x - 45, GROUND_Y - 185);
        ctx.lineTo(x - 30, GROUND_Y - 160);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(x + 30, GROUND_Y - 160);
        ctx.lineTo(x + 45, GROUND_Y - 185);
        ctx.lineTo(x + 60, GROUND_Y - 160);
        ctx.fill();
        // Upper walkway
        ctx.fillStyle = '#6a7a8a';
        ctx.fillRect(x - 60, GROUND_Y - 130, 150, 8);
        // Road span
        ctx.fillStyle = '#4a5a6a';
        ctx.fillRect(x - 100, GROUND_Y - 40, 200, 10);
        // Cables
        ctx.strokeStyle = '#8a9aaa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x - 120, GROUND_Y - 30);
        ctx.lineTo(x - 45, GROUND_Y - 160);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x + 120, GROUND_Y - 30);
        ctx.lineTo(x + 45, GROUND_Y - 160);
        ctx.stroke();
      }
      // Thames
      ctx.fillStyle = '#2a5a6a';
      ctx.fillRect(0, GROUND_Y - 20, canvas.width, 20);
      break;
    }
    case 2: { // Canary Wharf
      const bldgSp = 90;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -50 || x > canvas.width + 50) continue;
        const h = 130 + ((x * 13) & 0x7F);
        const w = 30 + ((x * 7) & 0x1F);
        ctx.fillStyle = ['#37474f','#455a64','#546e7a'][(x & 0xFF) % 3];
        ctx.fillRect(x, GROUND_Y - h, w, h);
        ctx.fillStyle = '#90a4ae';
        for (let wy = GROUND_Y - h + 6; wy < GROUND_Y - 4; wy += 8) {
          ctx.fillRect(x + 2, wy, w - 4, 3);
        }
        if (h > 180) {
          ctx.fillStyle = '#ff1744';
          ctx.fillRect(x + w / 2 - 2, GROUND_Y - h - 15, 4, 15);
        }
      }
      break;
    }
    case 3: { // Thames Embankment / London Eye
      // Thames river
      ctx.fillStyle = '#2a5a6a';
      ctx.fillRect(0, GROUND_Y - 25, canvas.width, 25);
      ctx.fillStyle = '#3a7a8a';
      const waveOff = -(farP * 0.5) % 40;
      for (let wx = waveOff - 40; wx < canvas.width + 40; wx += 40) {
        ctx.fillRect(Math.floor(wx), GROUND_Y - 20, 20, 3);
      }
      // London Eye
      const eyeOff = -(farP * 0.4 % 3000);
      for (let ex = eyeOff; ex < canvas.width + 3000; ex += 3000) {
        const x = Math.floor(ex + 600);
        if (x < -80 || x > canvas.width + 80) continue;
        ctx.strokeStyle = '#b0b0b0';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, GROUND_Y - 120, 70, 0, Math.PI * 2);
        ctx.stroke();
        // Spokes
        for (let a = 0; a < 12; a++) {
          const angle = a * Math.PI / 6;
          ctx.beginPath();
          ctx.moveTo(x, GROUND_Y - 120);
          ctx.lineTo(x + Math.cos(angle) * 70, GROUND_Y - 120 + Math.sin(angle) * 70);
          ctx.stroke();
        }
        // Support
        ctx.fillStyle = '#909090';
        ctx.fillRect(x - 3, GROUND_Y - 50, 6, 50);
      }
      // Embankment railing
      ctx.fillStyle = '#546e7a';
      const railOff = -(parallax % 50);
      for (let rx = railOff - 50; rx < canvas.width + 50; rx += 50) {
        ctx.fillRect(Math.floor(rx), GROUND_Y - 25, 3, 25);
      }
      break;
    }
    case 4: { // Westminster / Big Ben
      // Houses of Parliament
      const parlOff = -(farP % 2500);
      for (let px = parlOff; px < canvas.width + 2500; px += 2500) {
        const x = Math.floor(px + 400);
        if (x < -150 || x > canvas.width + 150) continue;
        // Main building
        ctx.fillStyle = '#a09070';
        ctx.fillRect(x - 100, GROUND_Y - 100, 200, 100);
        // Gothic windows
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 90; wy < GROUND_Y - 10; wy += 20) {
          for (let wx = x - 90; wx < x + 90; wx += 18) {
            ctx.fillRect(wx, wy, 8, 12);
            ctx.beginPath();
            ctx.arc(wx + 4, wy, 4, Math.PI, 0);
            ctx.fill();
          }
        }
        // Big Ben tower
        ctx.fillStyle = '#b0a080';
        ctx.fillRect(x + 80, GROUND_Y - 200, 30, 200);
        ctx.fillStyle = '#c0b090';
        ctx.beginPath();
        ctx.moveTo(x + 78, GROUND_Y - 200);
        ctx.lineTo(x + 95, GROUND_Y - 230);
        ctx.lineTo(x + 112, GROUND_Y - 200);
        ctx.fill();
        // Clock face
        ctx.fillStyle = '#f0e8d0';
        ctx.beginPath();
        ctx.arc(x + 95, GROUND_Y - 170, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#2d3436';
        ctx.fillRect(x + 94, GROUND_Y - 178, 2, 9);
        ctx.fillRect(x + 94, GROUND_Y - 172, 7, 2);
      }
      // Thames
      ctx.fillStyle = '#2a5a6a';
      ctx.fillRect(0, GROUND_Y - 15, canvas.width, 15);
      break;
    }
    case 5: { // Buckingham Palace / The Mall
      // Trees lining The Mall
      const treeSp = 80;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx);
        if (x < -25 || x > canvas.width + 25) continue;
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(x + 8, GROUND_Y - 55, 4, 55);
        ctx.fillStyle = '#2a7a2e';
        ctx.beginPath();
        ctx.arc(x + 10, GROUND_Y - 65, 16, 0, Math.PI * 2);
        ctx.fill();
      }
      // Buckingham Palace
      const palOff = -(farP % 3000);
      for (let px = palOff; px < canvas.width + 3000; px += 3000) {
        const x = Math.floor(px + 600);
        if (x < -120 || x > canvas.width + 120) continue;
        ctx.fillStyle = '#d8d0c0';
        ctx.fillRect(x - 100, GROUND_Y - 110, 200, 110);
        ctx.fillStyle = '#c8c0b0';
        ctx.fillRect(x - 105, GROUND_Y - 115, 210, 8);
        // Windows
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - 100; wy < GROUND_Y - 10; wy += 20) {
          for (let wx = x - 90; wx < x + 90; wx += 20) {
            ctx.fillRect(wx, wy, 10, 12);
          }
        }
        // Central balcony
        ctx.fillStyle = '#e0d8c8';
        ctx.fillRect(x - 20, GROUND_Y - 70, 40, 6);
        // Flag
        ctx.fillStyle = '#c0392b';
        ctx.fillRect(x - 1, GROUND_Y - 135, 12, 8);
        ctx.fillRect(x - 1, GROUND_Y - 140, 2, 30);
      }
      // Finish
      ctx.fillStyle = 'rgba(192,57,43,0.9)';
      ctx.fillRect(canvas.width / 2 - 100, GROUND_Y - 50, 200, 18);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('LONDON MARATHON', canvas.width / 2, GROUND_Y - 37);
      break;
    }
  }
}
