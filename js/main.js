function setupPixelCanvas(canvas, logicalWidth, logicalHeight) {
    const dpr = window.devicePixelRatio || 1;
    canvas.width = logicalWidth * dpr * 4;
    canvas.height = logicalHeight * dpr * 4;

    const ctx = canvas.getContext('2d');
    // scale your drawing operations back to 1:1 logical pixels
    ctx.scale(dpr * 4, dpr * 4);

    // turn off smoothing as above
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    return ctx;
}

const canvas = document.getElementById('canvas1');
const ctx = setupPixelCanvas(canvas, 192, 256);

const restartButton = document.getElementById('restart');

restartButton.addEventListener("click", restart)

function restart() {
    console.log("Restart");

    frame = -10;
    playerDirection = "none";
    finishAnimation = false;

    levelLayout = levels[level].layout.map(function (arr) {
        return arr.slice();
    });
    keys = 0;

    playerX = levels[level].startX * 16;
    playerY = levels[level].startY * 16;

    playerSpriteX = levels[level].startX * 16;
    playerSpriteY = levels[level].startY * 16;

    tileX = levels[level].startX;
    tileY = levels[level].startY;
}

const images = {
    tiles: new Image(),
    level1: new Image(),
    player: new Image(),
    tile: new Image(),
    brokenTile: new Image(),
    keyTile: new Image(),
}

images.tiles.src = 'assets/Tile Sheet.png';
images.level1.src = 'assets/Level 1.png';
images.player.src = 'assets/Player Sheet.png';
images.tile.src = 'assets/Tile.png';
images.brokenTile.src = 'assets/TileBroken.png';
images.keyTile.src = 'assets/TileKey.png';

const levels = [
    {
        zoom: 1,
        startX: 6,
        startY: 6,
        keys: 1,
        layout: [
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
    },
    {
        zoom: 0.45,
        startX: 7,
        startY: 10,
        keys: 1,
        layout: [
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
    }
]

let level = 0;
let levelLayout = levels[level].layout.map(function (arr) {
    return arr.slice();
});

let playerX = levels[level].startX * 16;
let playerY = levels[level].startY * 16;

let playerSpriteX = levels[level].startX * 16;
let playerSpriteY = levels[level].startY * 16;

let tileX = levels[level].startX;
let tileY = levels[level].startY;

let keys = 0;

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        playerAnimation()

        document.documentElement.style.setProperty('--canvas-scale', (levels[level].zoom / window.devicePixelRatio).toString());

        setTimeout(() => {
            document.documentElement.style.setProperty('--scale-speed', '1s');
        }, 100,);
    }, 200)
});

// document.documentElement.style.setProperty('--canvas-scale', '3');

const keysPressed = {
    w: false,
    s: false,
    a: false,
    d: false
};

document.addEventListener("keydown", (event) => {
    if (event.code === "KeyR") {
        restart();
    } else if (event.code === "KeyW") {
        keysPressed.w = true;
    } else if (event.code === "KeyS") {
        keysPressed.s = true;
    } else if (event.code === "KeyA") {
        keysPressed.a = true;
    } else if (event.code === "KeyD") {
        keysPressed.d = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.code === "KeyW") {
        keysPressed.w = false;
    } else if (event.code === "KeyS") {
        keysPressed.s = false;
    } else if (event.code === "KeyA") {
        keysPressed.a = false;
    } else if (event.code === "KeyD") {
        keysPressed.d = false;
    }
});

let frame = -10;
let playerIdleState = true;
let playerAnimationState = 0;
let playerDirection = "none";

let finishAnimationFrame = 0;
let finishAnimation = false;

const speed = 2;
const playerOffset = 5;

function playerAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images.level1, 0, 0);
    // drawLevel();
    drawTiles();

    frame++;

    if (frame % 30 == 0) {
        playerIdleState = !playerIdleState;
    }

    let moving = false;

    if (playerX > playerSpriteX) {
        if (frame % speed == 0)
            playerSpriteX++;
        playerDirection = "right";
        moving = true;
    } else if (playerX < playerSpriteX) {
        if (frame % speed == 0)
            playerSpriteX--;
        playerDirection = "left";
        moving = true;
    } else if (playerY > playerSpriteY) {
        if (frame % speed == 0)
            playerSpriteY++;
        playerDirection = "down";
        moving = true;
    } else if (playerY < playerSpriteY) {
        if (frame % speed == 0)
            playerSpriteY--;
        playerDirection = "up";
        moving = true;
    }

    if (moving) {
        if (frame % 10 == 0) {
            if (playerAnimationState == 3) {
                playerAnimationState = 0;
            } else {
                playerAnimationState++;
            }
        }

        switch (playerDirection) {
            case "down":
                if (playerAnimationState == 0 || playerAnimationState == 2) {
                    ctx.drawImage(images.player, 32, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 48, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "up":
                if (playerAnimationState == 0 || playerAnimationState == 2) {
                    ctx.drawImage(images.player, 32, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 48, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "left":
                if (playerAnimationState == 0) {
                    ctx.drawImage(images.player, 0, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else if (playerAnimationState == 1) {
                    ctx.drawImage(images.player, 16, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else if (playerAnimationState == 2) {
                    ctx.drawImage(images.player, 0, 48, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 16, 48, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "right":
                if (playerAnimationState == 0) {
                    ctx.drawImage(images.player, 32, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else if (playerAnimationState == 1) {
                    ctx.drawImage(images.player, 48, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else if (playerAnimationState == 2) {
                    ctx.drawImage(images.player, 32, 48, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 48, 48, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
        }
    } else {
        switch (playerDirection) {
            case "none":
                if (playerIdleState) {
                    ctx.drawImage(images.player, 64, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 80, 32, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "down":
                if (playerIdleState) {
                    ctx.drawImage(images.player, 0, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 16, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "up":
                if (playerIdleState) {
                    ctx.drawImage(images.player, 0, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 16, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "left":
                if (playerIdleState) {
                    ctx.drawImage(images.player, 64, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 80, 0, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
            case "right":
                if (playerIdleState) {
                    ctx.drawImage(images.player, 64, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                } else {
                    ctx.drawImage(images.player, 80, 16, 16, 16, playerSpriteX, playerSpriteY - playerOffset, 16, 16);
                }
                break;
        }

        if (keysPressed.w && !keysPressed.s) {
            move("up");
        }
        if (keysPressed.s && !keysPressed.w) {
            move("down");
        }
        if (keysPressed.a && !keysPressed.d) {
            move("left");
        }
        if (keysPressed.d && !keysPressed.a) {
            move("right");
        }
    }

    for (let y = 0; y < levelLayout.length; y++) {
        for (let x = 0; x < levelLayout[y].length; x++) {
            if (levelLayout[y][x] == 2) {
                if (playerSpriteY >= (y * 16) + 10) {
                    levelLayout[y][x] = 5;
                } else if (playerSpriteY <= (y * 16) - 10) {
                    levelLayout[y][x] = 5;
                } else if (playerSpriteX >= (x * 16) + 10) {
                    levelLayout[y][x] = 5;
                } else if (playerSpriteX <= (x * 16) - 10) {
                    levelLayout[y][x] = 5;
                }
            }
        }
    }

    if (frame < 128 && !finishAnimation) {
        ctx.fillStyle = "#1E1F3B";
        ctx.fillRect(0, 0, 192, 128 - frame);
        ctx.fillRect(0, 128 + frame, 192, 128 - frame);
    }

    if (finishAnimation) {
        ctx.fillStyle = "#1E1F3B";
        ctx.fillRect(0, 0, 192, finishAnimationFrame);
        ctx.fillRect(0, 256 - finishAnimationFrame, 192, finishAnimationFrame);

        finishAnimationFrame++;

        if (finishAnimationFrame > 128) {
            level++;
            document.documentElement.style.setProperty('--canvas-scale', (levels[level].zoom / window.devicePixelRatio).toString());
            restart();
        }
    }

    requestAnimationFrame(playerAnimation);
}

function drawTiles() {
    for (let y = 0; y < levelLayout.length; y++) {
        for (let x = 0; x < levelLayout[y].length; x++) {
            if (levelLayout[y][x] == 1 || levelLayout[y][x] == 2) {
                ctx.drawImage(images.tile, x * 16, y * 16);
            } else if (levelLayout[y][x] == 5) {
                ctx.drawImage(images.brokenTile, x * 16, y * 16);
            } else if (levelLayout[y][x] == 3) {
                ctx.drawImage(images.keyTile, x * 16, y * 16);
            }
        }
    }
}

function drawLevel() {
    for (let y = 0; y < levelLayout.length; y++) {
        for (let x = 0; x < levelLayout[y].length; x++) {
            if (levelLayout[y + 1] != undefined && levelLayout[y - 1] != undefined && levelLayout[y + 1][x] != 0)
            if (levelLayout[y + 1] != undefined && levelLayout[y + 1][x] != 0) {
                ctx.drawImage(images.tiles, 16, 16, 16, 16, x * 16, y * 16, 16, 16);
            }
        }
    }
}

function nextLevel() {
    setTimeout(() => {
        // document.documentElement.style.setProperty('--canvas-scale', (100 / window.devicePixelRatio).toString());
        finishAnimation = true;
        finishAnimationFrame = 0;
    }, 100);
}

let startX, startY;

document.addEventListener('touchstart', (event) => {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
});

document.addEventListener('touchmove', (event) => {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;

    // Check if it's a swipe (minimal distance threshold)
    const swipeThreshold = 50;
    if (Math.abs(deltaX) > swipeThreshold || Math.abs(deltaY) > swipeThreshold) {
        // Determine swipe direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            if (deltaX > 0) {
                move("right");
            } else {
                move("left");
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                move("down");
            } else {
                move("up");
            }
        }
    }
});

function move(direction) {
    if (playerX == playerSpriteX && playerY == playerSpriteY) {
        if (direction === "up") {
            if (levelLayout[tileY - 1][tileX] == 1 || levelLayout[tileY - 1][tileX] == 3) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                if (levelLayout[tileY - 1][tileX] == 3) {
                    keys++;
                }

                playerY -= 16;
                tileY--;
            } else if (levelLayout[tileY - 1][tileX] == 4 && keys > levels[level].keys) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                playerY -= 16;
                tileY--;

                nextLevel();
            } else {
                playerDirection = "up"
            }
        } else if (direction === "down") {
            if (levelLayout[tileY + 1][tileX] == 1 || levelLayout[tileY + 1][tileX] == 3) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                if (levelLayout[tileY + 1][tileX] == 3) {
                    keys++;
                }

                playerY += 16;
                tileY++;
            } else if (levelLayout[tileY + 1][tileX] == 4 && keys > levels[level].keys) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                playerY += 16;
                tileY++;

                nextLevel();
            } else {
                playerDirection = "down"
            }
        } else if (direction === "left") {
            if (levelLayout[tileY][tileX - 1] == 1 || levelLayout[tileY][tileX - 1] == 3) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                if (levelLayout[tileY][tileX - 1] == 3) {
                    keys++;
                }

                playerX -= 16;
                tileX--;
            } else if (levelLayout[tileY][tileX - 1] == 4 && keys >= levels[level].keys) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                playerX -= 16;
                tileX--;

                nextLevel();
            } else {
                playerDirection = "left"
            }
        } else if (direction === "right") {
            if (levelLayout[tileY][tileX + 1] == 1 || levelLayout[tileY][tileX + 1] == 3) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                if (levelLayout[tileY][tileX + 1] == 3) {
                    keys++;
                }

                playerX += 16;
                tileX++;
            } else if (levelLayout[tileY][tileX + 1] == 4 && keys > levels[level].keys) {
                if (levelLayout[tileY][tileX] == 1 || levelLayout[tileY][tileX] == 3) {
                    levelLayout[tileY][tileX] = 2;
                }

                playerX += 16;
                tileX++;

                nextLevel();
            } else {
                playerDirection = "right"
            }
        }
    }
}
