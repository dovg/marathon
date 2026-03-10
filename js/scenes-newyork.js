// ======== NEW YORK SCENES ========
function drawNewYorkScene(scene, parallax) {
  const farP = parallax * 0.3;
  const midP = parallax * 0.5;

  switch (scene) {
    case 0: { // Verrazzano Bridge
      // Bridge cables
      ctx.strokeStyle = '#607d8b';
      ctx.lineWidth = 3;
      // Two towers
      ctx.fillStyle = '#546e7a';
      ctx.fillRect(200, GROUND_Y - 200, 16, 200);
      ctx.fillRect(580, GROUND_Y - 200, 16, 200);
      // Main cables
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#78909c';
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y - 60);
      ctx.quadraticCurveTo(208, GROUND_Y - 200, 400, GROUND_Y - 60);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(400, GROUND_Y - 60);
      ctx.quadraticCurveTo(588, GROUND_Y - 200, 800, GROUND_Y - 60);
      ctx.stroke();
      // Vertical cables
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#90a4ae';
      for (let cx = 50; cx < 800; cx += 40) {
        const towerX = cx < 400 ? 208 : 588;
        const baseX = cx < 400 ? 0 : 400;
        const t = (cx - baseX) / 400;
        const cableY = GROUND_Y - 60 - (cx < 400
          ? Math.sin(t * Math.PI) * 140
          : Math.sin(t * Math.PI) * 140);
        ctx.beginPath();
        ctx.moveTo(cx, GROUND_Y - 40);
        ctx.lineTo(cx, cableY);
        ctx.stroke();
      }
      // Water below
      ctx.fillStyle = '#0d47a1';
      ctx.fillRect(0, GROUND_Y - 15, canvas.width, 15);
      break;
    }
    case 1: { // Brooklyn - brownstones
      const houseSp = 90;
      const houseOff = -(midP % houseSp);
      const houseColors = ['#8b5e3c','#7a5230','#9a6840','#6a4a28','#a07848'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const ci = ((x * 7) & 0xFF) % houseColors.length;
        const h = 90 + (ci % 3) * 15;
        ctx.fillStyle = houseColors[ci];
        ctx.fillRect(x, GROUND_Y - h, 70, h);
        // Stoops
        ctx.fillStyle = '#9a8a7a';
        ctx.fillRect(x + 25, GROUND_Y - 20, 20, 20);
        // Windows
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 10; wy < GROUND_Y - 25; wy += 18) {
          for (let wx = x + 6; wx < x + 64; wx += 16) {
            ctx.fillRect(wx, wy, 8, 10);
          }
        }
        // Cornice
        ctx.fillStyle = '#c0a888';
        ctx.fillRect(x - 2, GROUND_Y - h, 74, 4);
      }
      break;
    }
    case 2: { // Queens
      const bldgSp = 130;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -70 || x > canvas.width + 70) continue;
        const h = 70 + ((x * 11) & 0x3F);
        const w = 50 + ((x * 3) & 0x1F);
        ctx.fillStyle = ['#607d8b','#546e7a','#78909c'][(x & 0xFF) % 3];
        ctx.fillRect(x, GROUND_Y - h, w, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 8; wy < GROUND_Y - 8; wy += 14) {
          for (let wx = x + 4; wx < x + w - 4; wx += 10) {
            if (((wx * 11 + wy * 7) & 0xF) < 4)
              ctx.fillRect(wx, wy, 5, 7);
          }
        }
      }
      break;
    }
    case 3: { // Bronx & Harlem
      const houseSp = 100;
      const houseOff = -(midP % houseSp);
      const colors = ['#8b4513','#a0522d','#6b3410','#cd853f'];
      for (let hx = houseOff - houseSp; hx < canvas.width + houseSp; hx += houseSp) {
        const x = Math.floor(hx);
        if (x < -60 || x > canvas.width + 60) continue;
        const ci = ((x * 7) & 0xFF) % colors.length;
        const h = 80 + (ci % 2) * 20;
        ctx.fillStyle = colors[ci];
        ctx.fillRect(x, GROUND_Y - h, 80, h);
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 10; wy < GROUND_Y - 10; wy += 16) {
          for (let wx = x + 6; wx < x + 74; wx += 14) {
            ctx.fillRect(wx, wy, 6, 8);
          }
        }
      }
      // Fire escapes
      ctx.fillStyle = '#333';
      const feOff = -(midP % 200);
      for (let fx = feOff; fx < canvas.width + 200; fx += 200) {
        const x = Math.floor(fx + 30);
        if (x < -20 || x > canvas.width + 20) continue;
        for (let fy = GROUND_Y - 70; fy < GROUND_Y - 10; fy += 20) {
          ctx.fillRect(x, fy, 15, 2);
          ctx.fillRect(x, fy, 2, 20);
          ctx.fillRect(x + 13, fy, 2, 20);
        }
      }
      break;
    }
    case 4: { // Central Park
      // Dense park trees
      const treeSp = 50;
      const treeOff = -(midP % treeSp);
      for (let tx = treeOff - treeSp; tx < canvas.width + treeSp; tx += treeSp) {
        const x = Math.floor(tx);
        if (x < -30 || x > canvas.width + 30) continue;
        const h = 60 + ((x * 7) & 0x1F);
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(x + 8, GROUND_Y - h, 4, h);
        const leafColors = ['#1a6a20','#2a8a30','#1a5a18'];
        ctx.fillStyle = leafColors[((x * 3) & 0xFF) % 3];
        ctx.beginPath();
        ctx.arc(x + 10, GROUND_Y - h - 12, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      // Manhattan skyline in far background
      ctx.fillStyle = '#546e7a';
      const skyOff = -(farP * 0.3 % 600);
      const skyH = [100,140,200,120,180,160,220,110,150,190];
      for (let i = 0; i < skyH.length; i++) {
        const x = Math.floor(skyOff + i * 60);
        if (x > -40 && x < canvas.width + 40) {
          ctx.globalAlpha = 0.3;
          ctx.fillRect(x, GROUND_Y - skyH[i] - 50, 40, skyH[i]);
          ctx.globalAlpha = 1;
        }
      }
      break;
    }
    case 5: { // Times Square Finish
      // Tall buildings with neon signs
      const bldgSp = 80;
      const bldgOff = -(farP % bldgSp);
      for (let bx = bldgOff - bldgSp; bx < canvas.width + bldgSp; bx += bldgSp) {
        const x = Math.floor(bx);
        if (x < -50 || x > canvas.width + 50) continue;
        const h = 160 + ((x * 13) & 0x7F);
        ctx.fillStyle = '#37474f';
        ctx.fillRect(x, GROUND_Y - h, 60, h);
        // Neon signs
        const neonColors = ['#ff1744','#00e676','#2979ff','#ffd600','#e040fb'];
        const ni = ((x * 7) & 0xFF) % neonColors.length;
        ctx.fillStyle = neonColors[ni];
        ctx.fillRect(x + 5, GROUND_Y - h + 20, 50, 25);
        ctx.fillStyle = neonColors[(ni+2)%neonColors.length];
        ctx.fillRect(x + 5, GROUND_Y - h + 55, 50, 20);
        // Windows
        ctx.fillStyle = '#ffeaa7';
        for (let wy = GROUND_Y - h + 85; wy < GROUND_Y - 8; wy += 12) {
          for (let wx = x + 4; wx < x + 56; wx += 10) {
            if (((wx * 11 + wy * 7) & 0xF) < 5)
              ctx.fillRect(wx, wy, 5, 6);
          }
        }
      }
      // Finish banner
      ctx.fillStyle = 'rgba(30,136,229,0.9)';
      ctx.fillRect(canvas.width / 2 - 100, GROUND_Y - 50, 200, 18);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('NYC MARATHON', canvas.width / 2, GROUND_Y - 37);
      break;
    }
  }
}
