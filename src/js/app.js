function Sun(x, y) {
  this.x = 400;
  this.y = 0;
}

function Enemy(x, y, style, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.style = style;

}

// The starting speed of each of the enemies, as well as some other variables I'll need 
let enemy1Speed = 0.6;
let enemy2Speed = 0.9;
let enemy3Speed = 1.4;
let lives = 3;
let level = 0;

let levelDisplay = document.getElementById("score").firstElementChild;

let livesDisplay = document.getElementById("lives").firstElementChild;


// this is checking for when each enemy individually hits a wall of the canvas and when they do, it reverses their direction.
Enemy.prototype.update = function (dt) {
  if (allEnemies[0].x <= 0) {
    allEnemies[0].direction = "ltr";
  }
  if (allEnemies[1].x <= 0) {
    allEnemies[1].direction = "ltr";
  }
  if (allEnemies[2].x <= 0) {
    allEnemies[2].direction = "ltr";
  }
  if (allEnemies[0].x >= 800) {
    allEnemies[0].direction = "rtl";
  }
  if (allEnemies[1].x >= 800) {
    allEnemies[1].direction = "rtl";
  }
  if (allEnemies[2].x >= 800) {
    allEnemies[2].direction = "rtl";
  }

  // this checks which way each enemy is facing and changes their x position based on that.
  if (allEnemies[0].direction === "rtl") {
    allEnemies[0].x -= enemy1Speed;
  } else {
    allEnemies[0].x += enemy1Speed;
  }
  if (allEnemies[1].direction === "rtl") {
    allEnemies[1].x -= enemy2Speed;
  } else {
    allEnemies[1].x += enemy2Speed;
  }
  if (allEnemies[2].direction === "rtl") {
    allEnemies[2].x -= enemy3Speed;
  } else {
    allEnemies[2].x += enemy3Speed;
  }

  if ((player.x < this.x + 85) && (player.x + 85 > this.x) && (player.y < this.y + 85) && (player.y + 85 > this.y)) {
    player.x = 400;
    player.y = 400;
    allEnemies[0].x = 0;
    allEnemies[0].y = 0;
    allEnemies[1].x = 0;
    allEnemies[1].y = 100;
    allEnemies[2].x = 0;
    allEnemies[2].y = 200;

    lives--;

  }
  if (lives === 0) {
    alert(`You lose. You made it to level ${level}.`);
    level = 0;
    lives = 3;
    enemy1Speed = 0.6;
    enemy2Speed = 0.9;
    enemy3Speed = 1.4;
  }
  levelDisplay.textContent = level;
  livesDisplay.textContent = lives;
};


const allowedKeys = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

document.addEventListener("keyup", function (e) {
  player.handleInput(allowedKeys[e.keyCode]);
});

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update() {

    if ((this.x < sun.x + 85) && (this.x + 85 > sun.x) && (this.y < sun.y + 85) && (this.y + 85 > sun.y)) {
      level++;
      player.x = 400;
      player.y = 400;
      enemy1Speed += .4;
      enemy2Speed += .45;
      enemy3Speed += .2;

    }
  }
  handleInput(key) {
    if (player.x > 0) {
      if (key === allowedKeys["37"]) {
        player.x -= 50;
      }
    }
    if (player.y > 0) {
      if (key === allowedKeys["38"]) {
        player.y -= 50;
      }
    }
    if (player.x < 800) {
      if (key === allowedKeys["39"]) {
        player.x += 50;
      }
    }
    if (player.y < 450) {
      if (key === allowedKeys["40"]) {
        player.y += 50;
      }
    }
  }
}


const allEnemies = [
  new Enemy(0, 0, "enemy1", "ltr"),
  new Enemy(0, 100, "enemy2", "ltr"),
  new Enemy(0, 200, "enemy3", "ltr")
];
const sun = new Sun(0, 0);

const player = new Player(400, 400);




