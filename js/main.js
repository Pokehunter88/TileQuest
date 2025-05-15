const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const images = {
    level1: new Image(),
    player: new Image()
}

images.level1.src = 'assets/Level 1.png';
images.player.src = 'assets/Player.png';

let playerX = 96;
let playerY = 96;

let tileX = 6;
let tileY = 6;

let keys = 0;

const levels = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 4, 1, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
]

let level = 0;
let levelLayout = levels[level];

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        ctx.drawImage(images.level1, 0, 0);
        drawTiles();
        ctx.drawImage(images.player, playerX, playerY);
    }, 200)
});

// document.documentElement.style.setProperty('--canvas-scale', '3');

function drawTiles() {
    for (let y = 0; y < levelLayout.length; y++) {
        for (let x = 0; x < levelLayout[y].length; x++) {
            if (levelLayout[y][x] == 1) {
                ctx.fillStyle = "grey";
                ctx.fillRect(x * 16, y * 16, 16, 16);
                console.log("filling")
            } else if (levelLayout[y][x] == 2) {
                ctx.fillStyle = "black";
                ctx.fillRect(x * 16, y * 16, 16, 16);
                console.log("filling")
            } else if (levelLayout[y][x] == 3) {
                ctx.fillStyle = "yellow";
                ctx.fillRect(x * 16, y * 16, 16, 16);
                console.log("filling")
            }
        }
    }
}

function nextLevel() {

}

document.addEventListener("keypress", (event) => {
    if (event.code === "KeyW") {
        console.log("Up");
        if (levelLayout[tileY - 1][tileX] == 1 || levelLayout[tileY - 1][tileX] == 3) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            if (levelLayout[tileY - 1][tileX] == 3) {
                keys++;
            }

            playerY -= 16;
            tileY--;
        } else if (levelLayout[tileY - 1][tileX] == 4 && keys > 0) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            playerY -= 16;
            tileY--;

            nextLevel();
        }
    } else if (event.code === "KeyS") {
        console.log("Down");
        if (levelLayout[tileY + 1][tileX] == 1 || levelLayout[tileY + 1][tileX] == 3) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            if (levelLayout[tileY + 1][tileX] == 3) {
                keys++;
            }

            playerY += 16;
            tileY++;
        } else if (levelLayout[tileY + 1][tileX] == 4 && keys > 0) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            playerY += 16;
            tileY++;

            nextLevel();
        }
    } else if (event.code === "KeyA") {
        console.log("Left");
        if (levelLayout[tileY][tileX - 1] == 1 || levelLayout[tileY][tileX - 1] == 3) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            if (levelLayout[tileY][tileX - 1] == 3) {
                keys++;
            }

            playerX -= 16;
            tileX--;
        } else if (levelLayout[tileY][tileX - 1] == 4 && keys > 0) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            playerX -= 16;
            tileX--;

            nextLevel();
        }
    } else if (event.code === "KeyD") {
        console.log("Right");
        if (levelLayout[tileY][tileX + 1] == 1 || levelLayout[tileY][tileX + 1] == 3) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            if (levelLayout[tileY][tileX + 1] == 3) {
                keys++;
            }

            playerX += 16;
            tileX++;
        } else if (levelLayout[tileY][tileX + 1] == 4 && keys > 0) {
            if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                levelLayout[tileY][tileX] = 2;
            }

            playerX += 16;
            tileX++;

            nextLevel();
        }
    }

    ctx.drawImage(images.level1, 0, 0);
    drawTiles();
    ctx.drawImage(images.player, playerX, playerY);
})
