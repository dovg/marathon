// ---- Generic ground for non-Moscow cities ----
function drawGroundGeneric() {
  const city = getCity();
  const scene = getCurrentScene();
  ctx.fillStyle = '#4a5568';
  ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

  if (city.id === 'berlin') {
    if (scene === 1) {
      // Park path
      ctx.fillStyle = '#8a7a60';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#9a8a70';
      const off = -(game.worldX % 20);
      for (let x = off - 20; x < canvas.width + 20; x += 20) {
        ctx.fillRect(Math.floor(x), GROUND_Y + 2, 18, 10);
      }
    } else {
      // Clean European asphalt
      ctx.fillStyle = '#505050';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#e2e8f0';
      const ms = 60;
      const off = -(game.worldX % ms);
      for (let i = off; i < canvas.width + ms; i += ms) {
        ctx.fillRect(Math.floor(i), GROUND_Y + 18, 20, 3);
      }
    }
  } else if (city.id === 'newyork') {
    if (scene === 0) {
      // Bridge road
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#ffd600';
      ctx.fillRect(0, GROUND_Y + 18, canvas.width, 2);
    } else if (scene === 4) {
      // Central Park path
      ctx.fillStyle = '#7a7060';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    } else {
      // NYC asphalt with yellow center
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#ffd600';
      ctx.fillRect(0, GROUND_Y + 19, canvas.width, 2);
      ctx.fillStyle = '#e2e8f0';
      const ms = 60;
      const off = -(game.worldX % ms);
      for (let i = off; i < canvas.width + ms; i += ms) {
        ctx.fillRect(Math.floor(i), GROUND_Y + 8, 20, 3);
      }
    }
  } else if (city.id === 'london') {
    // British tarmac
    ctx.fillStyle = '#484848';
    ctx.fillRect(0, GROUND_Y, canvas.width, 40);
    ctx.fillStyle = '#e2e8f0';
    const ms = 60;
    const off = -(game.worldX % ms);
    for (let i = off; i < canvas.width + ms; i += ms) {
      ctx.fillRect(Math.floor(i), GROUND_Y + 18, 20, 3);
    }
    // Red lane marking (London marathon)
    ctx.fillStyle = '#c0392b';
    ctx.fillRect(0, GROUND_Y + 2, canvas.width, 2);
    ctx.fillRect(0, GROUND_Y + 36, canvas.width, 2);
  } else if (city.id === 'boston') {
    if (scene <= 2) {
      // Suburban road
      ctx.fillStyle = '#505050';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#e2e8f0';
      const ms = 60;
      const off = -(game.worldX % ms);
      for (let i = off; i < canvas.width + ms; i += ms) {
        ctx.fillRect(Math.floor(i), GROUND_Y + 18, 20, 3);
      }
    } else if (scene === 3) {
      // Hilly asphalt
      ctx.fillStyle = '#484848';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      // Blue/yellow Boston marathon line
      ctx.fillStyle = '#f0c040';
      ctx.fillRect(0, GROUND_Y + 19, canvas.width, 2);
    } else {
      // City road
      ctx.fillStyle = '#404040';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#f0c040';
      ctx.fillRect(0, GROUND_Y + 19, canvas.width, 2);
      ctx.fillStyle = '#e2e8f0';
      const ms = 60;
      const off = -(game.worldX % ms);
      for (let i = off; i < canvas.width + ms; i += ms) {
        ctx.fillRect(Math.floor(i), GROUND_Y + 8, 20, 3);
      }
    }
  } else if (city.id === 'singapore') {
    if (scene === 3) {
      // Beach boardwalk
      ctx.fillStyle = '#c0a878';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#d0b888';
      const off = -(game.worldX % 16);
      for (let x = off - 16; x < canvas.width + 16; x += 16) {
        ctx.fillRect(Math.floor(x), GROUND_Y + 2, 14, 6);
      }
    } else {
      // Clean modern asphalt
      ctx.fillStyle = '#454545';
      ctx.fillRect(0, GROUND_Y, canvas.width, 40);
      ctx.fillStyle = '#e2e8f0';
      const ms = 60;
      const off = -(game.worldX % ms);
      for (let i = off; i < canvas.width + ms; i += ms) {
        ctx.fillRect(Math.floor(i), GROUND_Y + 18, 20, 3);
      }
    }
  }
  // Sidewalk edge
  ctx.fillStyle = '#9e9e9e';
  ctx.fillRect(0, GROUND_Y + 38, canvas.width, 2);
}
