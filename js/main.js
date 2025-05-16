function setupPixelCanvas(canvas, logicalWidth, logicalHeight) {
    const dpr = window.devicePixelRatio || 1;
    console.log(window.devicePixelRatio)
    canvas.width = logicalWidth * dpr;
    canvas.height = logicalHeight * dpr;

    const ctx = canvas.getContext('2d');
    // scale your drawing operations back to 1:1 logical pixels
    ctx.scale(dpr, dpr);

    // turn off smoothing as above
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;

    return ctx;
}

const canvas = document.getElementById('canvas1');
const ctx = setupPixelCanvas(canvas, 192, 256);

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

const images = {
    level1: new Image(),
    player: new Image(),
    tile: new Image(),
    brokenTile: new Image(),
    keyTile: new Image(),
}

images.level1.src = 'assets/Level 1.png';
images.player.src = 'assets/Player Sheet.png';
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

        document.documentElement.style.setProperty('--canvas-scale', (4 / window.devicePixelRatio).toString());

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
        window.location.reload();
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
    ctx.drawImage(images.level1, 0, 0);
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

        for (let y = 0; y < levelLayout.length; y++) {
            for (let x = 0; x < levelLayout[y].length; x++) {
                if (levelLayout[y][x] == 2) {
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
            // finishAnimation = false;
            // frame = -10;
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
    console.log("touch start");
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
                console.log('Swiped right');
                move("right");
                // document.documentElement.style.setProperty('--canvas-scale', '1');
            } else {
                console.log('Swiped left');
                move("left");
                // document.documentElement.style.setProperty('--canvas-scale', '3');
            }
        } else {
            // Vertical swipe
            if (deltaY > 0) {
                console.log('Swiped down');
                move("down");
                // document.documentElement.style.setProperty('--canvas-scale', '2');
            } else {
                console.log('Swiped up');
                move("up");
                // document.documentElement.style.setProperty('--canvas-scale', '4');
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
            } else if (levelLayout[tileY - 1][tileX] == 4 && keys > 0) {
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
            } else if (levelLayout[tileY + 1][tileX] == 4 && keys > 0) {
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
            } else if (levelLayout[tileY][tileX - 1] == 4 && keys > 0) {
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
            } else if (levelLayout[tileY][tileX + 1] == 4 && keys > 0) {
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
