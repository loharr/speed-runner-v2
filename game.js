
const player = document.getElementById('player');
const obstacles = document.getElementById('obstacles');
const scoreVal = document.getElementById('scoreVal');
const message = document.getElementById('message');
let jumping=false, vy=0, y=0, score=0, running=true;

function jump(){
  if(!jumping){ jumping=true; vy = 12; message.style.display='none'; }
}
document.addEventListener('keydown', e=>{ if(e.code==='Space') jump(); });
document.addEventListener('touchstart', e=>{ jump(); });

function spawnObstacle(){
  const el = document.createElement('div');
  el.className = 'obstacle';
  const start = 900;
  el.style.left = start + 'px';
  obstacles.appendChild(el);
  // move
  let x = start;
  const speed = 5 + Math.min(6, Math.floor(score/100));
  const id = setInterval(()=>{
    x -= speed;
    el.style.left = x+'px';
    if(x < -60){ clearInterval(id); el.remove(); }
    // collision simple check
    const playerRect = player.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    if(playerRect.left < elRect.right && playerRect.right > elRect.left && playerRect.bottom > elRect.top){
      // hit
      running = false;
      message.innerText = 'Game Over — Refresh to retry';
      message.style.display='block';
      clearInterval(id);
    }
  }, 20);
}

function gameLoop(){
  if(!running) return;
  // physics
  if(jumping){
    y += vy;
    vy -= 0.8;
    if(y <= 0){ y=0; vy=0; jumping=false; }
  }
  player.style.bottom = (60 + y) + 'px';
  // spawn random obstacles
  if(Math.random() < 0.02) spawnObstacle();
  score += 1;
  scoreVal.innerText = score;
  requestAnimationFrame(gameLoop);
}

// start
message.style.display='block';
gameLoop();
