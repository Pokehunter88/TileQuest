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

let tileX = 2;
let tileY = 0;

const levels = [
    [
        [0, 0, 1, 0],
        [0, 0, 1, 0],
        [0, 1, 1, 1],
        [4, 1, 0, 3],
        [0, 1, 1, 1],
    ]
]

let level = 0;
let levelLayout = levels[level];

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        ctx.drawImage(images.level1, 0, 0);
        ctx.drawImage(images.player, playerX, playerY);
    }, 200)
});

document.addEventListener("keypress", (event) => {
    if (event.code === "KeyW") {
        console.log("Up");
        if (levelLayout[tileY - 1][tileX] == 1) {
            playerY -= 16;
            tileY--;
        }
    } else if (event.code === "KeyS") {
        console.log("Down");
        if (levelLayout[tileY + 1][tileX] == 1) {
            

            playerY += 16;
            tileY++;
        }
    } else if (event.code === "KeyA") {
        console.log("Left");
        if (levelLayout[tileY][tileX - 1] == 1) {
            playerX -= 16;
            tileX--;
        }
    } else if (event.code === "KeyD") {
        console.log("Right");
        if (levelLayout[tileY][tileX + 1] == 1) {
            playerX += 16;
            tileX++;
        }
    }

    ctx.drawImage(images.level1, 0, 0);
    ctx.drawImage(images.player, playerX, playerY);
})
