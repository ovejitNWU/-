const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = 'https://i.ibb.co/YZjqFxS/army-guy.png'; // Replace with your army character image

const enemyImage = new Image();
enemyImage.src = 'https://i.ibb.co/MnQDd0K/enemy.png'; // Replace with your enemy character image

const player = {
  x: canvas.width / 2 - 20,
  y: canvas.height - 100,
  width: 40,
  height: 40,
  speed: 5
};

const bullets = [];
const enemies = [];

function drawPlayer() {
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

function drawBullets() {
  bullets.forEach((b, i) => {
    b.y -= 8;
    ctx.fillStyle = 'yellow';
    ctx.fillRect(b.x, b.y, 5, 10);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

function drawEnemies() {
  enemies.forEach((e, i) => {
    e.y += e.speed;
    if (enemyImage.complete) {
      ctx.drawImage(enemyImage, e.x, e.y, 40, 40);
    } else {
      ctx.fillStyle = 'red';
      ctx.fillRect(e.x, e.y, 40, 40);
    }
    if (e.y > canvas.height) enemies.splice(i, 1);
  });
}

function detectHits() {
  enemies.forEach((e, ei) => {
    bullets.forEach((b, bi) => {
      if (
        b.x < e.x + 40 &&
        b.x + 5 > e.x &&
        b.y < e.y + 40 &&
        b.y + 10 > e.y
      ) {
        enemies.splice(ei, 1);
        bullets.splice(bi, 1);
        if (enemies.length === 0) {
          alert("জয় বাংলা!");
        }
      }
    });
  });
}

function movePlayer(keys) {
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

const keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.key] = true;
  if (e.key === ' ') {
    bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y });
  }
});
document.addEventListener('keyup', (e) => keys[e.key] = false);

function spawnEnemy() {
  const x = Math.random() * (canvas.width - 40);
  enemies.push({ x: x, y: -40, speed: 2 + Math.random() * 3 });
}
setInterval(spawnEnemy, 1000);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  movePlayer(keys);
  drawPlayer();
  drawBullets();
  drawEnemies();
  detectHits();
  requestAnimationFrame(animate);
}
animate();
