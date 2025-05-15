const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const images = {
    level1: new Image(),
    player: new Image(),
    player1: new Image(),
    tile: new Image(),
    brokenTile: new Image(),
    keyTile: new Image(),
}

images.level1.src = 'assets/Level 1.png';
images.player.src = 'assets/Player.png';
images.player1.src = 'assets/Player1.png';
images.tile.src = 'assets/Tile.png';
images.brokenTile.src = 'assets/TileBroken.png';
images.keyTile.src = 'assets/TileKey.png';

let playerX = 96;
let playerY = 96;

let playerSpriteX = 96;
let playerSpriteY = 96;

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

        playerAnimation()
    }, 200)
});

// document.documentElement.style.setProperty('--canvas-scale', '3');

let frame = 0;
let playerIdleState = true;

function playerAnimation() {
    ctx.drawImage(images.level1, 0, 0);
    drawTiles();
    if (playerIdleState) {
        ctx.drawImage(images.player, playerSpriteX, playerSpriteY);
    } else {
        ctx.drawImage(images.player1, playerSpriteX, playerSpriteY);
    }

    frame++;

    if (frame % 30 == 0) {
        playerIdleState = !playerIdleState;
    }

    if (playerX > playerSpriteX) {
        playerSpriteX++;
    } else if (playerX < playerSpriteX) {
        playerSpriteX--;
    } else if (playerY > playerSpriteY) {
        playerSpriteY++;
    } else if (playerY < playerSpriteY) {
        playerSpriteY--;
    }

    requestAnimationFrame(playerAnimation);
}

function drawTiles() {
    for (let y = 0; y < levelLayout.length; y++) {
        for (let x = 0; x < levelLayout[y].length; x++) {
            if (levelLayout[y][x] == 1) {
                ctx.drawImage(images.tile, x * 16, y * 16);
            } else if (levelLayout[y][x] == 2) {
                ctx.drawImage(images.brokenTile, x * 16, y * 16);
            } else if (levelLayout[y][x] == 3) {
                ctx.drawImage(images.keyTile, x * 16, y * 16);
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
})
