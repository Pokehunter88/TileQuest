export default class Player {
    constructor(levels, ctx, input) {
        this.levels = levels;
        this.ctx = ctx;
        this.input = input;
        this.renderer = null;

        this.playerY = this.levels.levels[this.levels.level].startY * 16;
        this.playerX = this.levels.levels[this.levels.level].startX * 16;

        this.playerSpriteX = this.levels.levels[this.levels.level].startX * 16;
        this.playerSpriteY = this.levels.levels[this.levels.level].startY * 16;

        this.tileX = this.levels.levels[this.levels.level].startX;
        this.tileY = this.levels.levels[this.levels.level].startY;

        this.keys = 0;

        this.playerIdleState = true;
        this.playerAnimationState = 0;
        this.playerDirection = "none";

        this.speed = 1;
        this.playerOffset = 5;
    }

    update(frame) {
        if (frame % 30 == 0) {
            this.playerIdleState = !this.playerIdleState;
        }

        let moving = false;

        if (this.playerX > this.playerSpriteX) {
            if (frame % this.speed == 0)
                this.playerSpriteX++;
            this.playerDirection = "right";
            moving = true;
        } else if (this.playerX < this.playerSpriteX) {
            if (frame % this.speed == 0)
                this.playerSpriteX--;
            this.playerDirection = "left";
            moving = true;
        } else if (this.playerY > this.playerSpriteY) {
            if (frame % this.speed == 0)
                this.playerSpriteY++;
            this.playerDirection = "down";
            moving = true;
        } else if (this.playerY < this.playerSpriteY) {
            if (frame % this.speed == 0)
                this.playerSpriteY--;
            this.playerDirection = "up";
            moving = true;
        }

        if (moving) {
            if (frame % 10 == 0) {
                if (this.playerAnimationState == 3) {
                    this.playerAnimationState = 0;
                } else {
                    this.playerAnimationState++;
                }
            }

            switch (this.playerDirection) {
                case "down":
                    if (this.playerAnimationState == 0 || this.playerAnimationState == 2) {
                        this.ctx.drawImage(this.renderer.images.player, 32, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 48, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "up":
                    if (this.playerAnimationState == 0 || this.playerAnimationState == 2) {
                        this.ctx.drawImage(this.renderer.images.player, 32, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 48, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "left":
                    if (this.playerAnimationState == 0) {
                        this.ctx.drawImage(this.renderer.images.player, 0, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else if (this.playerAnimationState == 1) {
                        this.ctx.drawImage(this.renderer.images.player, 16, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else if (this.playerAnimationState == 2) {
                        this.ctx.drawImage(this.renderer.images.player, 0, 48, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 16, 48, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "right":
                    if (this.playerAnimationState == 0) {
                        this.ctx.drawImage(this.renderer.images.player, 32, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else if (this.playerAnimationState == 1) {
                        this.ctx.drawImage(this.renderer.images.player, 48, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else if (this.playerAnimationState == 2) {
                        this.ctx.drawImage(this.renderer.images.player, 32, 48, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 48, 48, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
            }
        } else {
            switch (this.playerDirection) {
                case "none":
                    if (this.playerIdleState) {
                        this.ctx.drawImage(this.renderer.images.player, 64, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 80, 32, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "down":
                    if (this.playerIdleState) {
                        this.ctx.drawImage(this.renderer.images.player, 0, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 16, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "up":
                    if (this.playerIdleState) {
                        this.ctx.drawImage(this.renderer.images.player, 0, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 16, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "left":
                    if (this.playerIdleState) {
                        this.ctx.drawImage(this.renderer.images.player, 64, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 80, 0, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
                case "right":
                    if (this.playerIdleState) {
                        this.ctx.drawImage(this.renderer.images.player, 64, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    } else {
                        this.ctx.drawImage(this.renderer.images.player, 80, 16, 16, 16, this.playerSpriteX, this.playerSpriteY - this.playerOffset, 16, 16);
                    }
                    break;
            }

            if (this.input.keysPressed.w && !this.input.keysPressed.s) {
                this.move("up");
            }
            if (this.input.keysPressed.s && !this.input.keysPressed.w) {
                this.move("down");
            }
            if (this.input.keysPressed.a && !this.input.keysPressed.d) {
                this.move("left");
            }
            if (this.input.keysPressed.d && !this.input.keysPressed.a) {
                this.move("right");
            }
        }

        for (let y = 0; y < this.levels.levelLayout.length; y++) {
            for (let x = 0; x < this.levels.levelLayout[y].length; x++) {
                if (this.levels.levelLayout[y][x] == 2) {
                    if (this.playerSpriteY >= (y * 16) + 10) {
                        this.levels.levelLayout[y][x] = 5;
                    } else if (this.playerSpriteY <= (y * 16) - 10) {
                        this.levels.levelLayout[y][x] = 5;
                    } else if (this.playerSpriteX >= (x * 16) + 10) {
                        this.levels.levelLayout[y][x] = 5;
                    } else if (this.playerSpriteX <= (x * 16) - 10) {
                        this.levels.levelLayout[y][x] = 5;
                    }
                }
            }
        }
    }

    move(direction) {
        if (this.playerX == this.playerSpriteX && this.playerY == this.playerSpriteY) {
            if (direction === "up") {
                if (this.levels.levelLayout[this.tileY][this.tileX] == 4) {
                    this.playerDirection = "up";
                    return;
                }

                if (this.levels.levelLayout[this.tileY - 1][this.tileX] == 1 || this.levels.levelLayout[this.tileY - 1][this.tileX] == 3) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    if (this.levels.levelLayout[this.tileY - 1][this.tileX] == 3) {
                        this.keys++;
                    }

                    this.playerY -= 16;
                    this.tileY--;
                } else if (this.levels.levelLayout[this.tileY - 1][this.tileX] == 4 && this.keys >= this.levels.levels[this.levels.level].keys) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    this.playerY -= 16;
                    this.tileY--;

                    this.renderer.nextLevel();
                } else {
                    this.playerDirection = "up";
                }
            } else if (direction === "down") {
                if (this.levels.levelLayout[this.tileY][this.tileX] == 4) {
                    this.playerDirection = "down";
                    return;
                }

                if (this.levels.levelLayout[this.tileY + 1][this.tileX] == 1 || this.levels.levelLayout[this.tileY + 1][this.tileX] == 3) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    if (this.levels.levelLayout[this.tileY + 1][this.tileX] == 3) {
                        this.keys++;
                    }

                    this.playerY += 16;
                    this.tileY++;
                } else if (this.levels.levelLayout[this.tileY + 1][this.tileX] == 4 && this.keys >= this.levels.levels[this.levels.level].keys) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    this.playerY += 16;
                    this.tileY++;

                    this.renderer.nextLevel();
                } else {
                    this.playerDirection = "down"
                }
            } else if (direction === "left") {
                if (this.levels.levelLayout[this.tileY][this.tileX] == 4) {
                    this.playerDirection = "left";
                    return;
                }

                if (this.levels.levelLayout[this.tileY][this.tileX - 1] == 1 || this.levels.levelLayout[this.tileY][this.tileX - 1] == 3) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    if (this.levels.levelLayout[this.tileY][this.tileX - 1] == 3) {
                        this.keys++;
                    }

                    this.playerX -= 16;
                    this.tileX--;
                } else if (this.levels.levelLayout[this.tileY][this.tileX - 1] == 4 && this.keys >= this.levels.levels[this.levels.level].keys) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    this.playerX -= 16;
                    this.tileX--;

                    this.renderer.nextLevel();
                } else {
                    this.playerDirection = "left"
                }
            } else if (direction === "right") {
                if (this.levels.levelLayout[this.tileY][this.tileX] == 4) {
                    this.playerDirection = "right";
                    return;
                }

                if (this.levels.levelLayout[this.tileY][this.tileX + 1] == 1 || this.levels.levelLayout[this.tileY][this.tileX + 1] == 3) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    if (this.levels.levelLayout[this.tileY][this.tileX + 1] == 3) {
                        this.keys++;
                    }

                    this.playerX += 16;
                    this.tileX++;
                } else if (this.levels.levelLayout[this.tileY][this.tileX + 1] == 4 && this.keys >= this.levels.levels[this.levels.level].keys) {
                    if (this.levels.levelLayout[this.tileY][this.tileX] == 1 || this.levels.levelLayout[this.tileY][this.tileX] == 3) {
                        this.levels.levelLayout[this.tileY][this.tileX] = 2;
                    }

                    this.playerX += 16;
                    this.tileX++;

                    this.renderer.nextLevel();
                } else {
                    this.playerDirection = "right"
                }
            }
        }
    }

    restart() {
        this.playerDirection = "none";

        this.keys = 0;

        this.playerX = this.levels.levels[this.levels.level].startX * 16;
        this.playerY = this.levels.levels[this.levels.level].startY * 16;

        this.playerSpriteX = this.levels.levels[this.levels.level].startX * 16;
        this.playerSpriteY = this.levels.levels[this.levels.level].startY * 16;

        this.tileX = this.levels.levels[this.levels.level].startX;
        this.tileY = this.levels.levels[this.levels.level].startY;
    }
}