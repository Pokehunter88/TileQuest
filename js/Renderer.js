export default class Renderer {
    constructor(levels, player, ctx, game) {
        this.levels = levels;
        this.player = player;
        this.ctx = ctx;
        this.game = game;

        this.images = {
            tiles: new Image(),
            player: new Image(),
            confetti: new Image(),
        }

        this.images.tiles.src = 'assets/Tile Sheet.png';
        this.images.player.src = 'assets/Player Sheet.png';
        this.images.confetti.src = 'assets/Confetti.png';

        this.finishAnimationFrame = 0;
        this.finishAnimation = false;
    }

    drawTiles() {
        for (let y = 0; y < this.levels.levelLayout.length; y++) {
            for (let x = 0; x < this.levels.levelLayout[y].length; x++) {
                if (this.levels.levelLayout[y][x] == 1 || this.levels.levelLayout[y][x] == 2) {
                    this.ctx.drawImage(this.images.tiles, 0, 0, 16, 16, x * 16, y * 16, 16, 16);
                } else if (this.levels.levelLayout[y][x] == 5) {
                    this.ctx.drawImage(this.images.tiles, 16, 0, 16, 16, x * 16, y * 16, 16, 16);
                } else if (this.levels.levelLayout[y][x] == 3) {
                    this.ctx.drawImage(this.images.tiles, 48, 0, 16, 16, x * 16, y * 16, 16, 16);
                } else if (this.levels.levelLayout[y][x] == 4) {
                    this.ctx.drawImage(this.images.tiles, 32, 0, 16, 16, x * 16, y * 16, 16, 16);
                }
            }
        }
    }

    update(frame) {
        if (frame < 128 && !this.finishAnimation) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(0, 0, 192, 128 - frame);
            this.ctx.fillRect(0, 128 + frame, 192, 128 - frame);

            // const width = 350;
            // const height = 1000;

            // const posX = -830 + frame * 3;
            // // const posX = -850 + this.finishAnimationFrame * 3;
            // const posY = -1000;

            // this.ctx.save();
            // this.ctx.translate(width, height);
            // this.ctx.rotate((30 * Math.PI) / 180);
            // // this.ctx.fillStyle = "red";
            // this.ctx.fillRect(posX, posY, width, height);
            // this.ctx.restore();
        }

        if (this.finishAnimation) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(0, 0, 192, this.finishAnimationFrame);
            this.ctx.fillRect(0, 256 - this.finishAnimationFrame, 192, this.finishAnimationFrame);

            // const width = 350;
            // const height = 1000;

            // const posX = -1150 + this.finishAnimationFrame * 3;
            // const posY = -1000;

            // this.ctx.save();
            // this.ctx.translate(width, height);
            // this.ctx.rotate((30 * Math.PI) / 180);
            // this.ctx.fillRect(posX, posY, width, height);
            // this.ctx.restore();

            this.finishAnimationFrame++;

            for (let i = 0; i < 10; i++) {
                if (this.finishAnimationFrame > 20 && this.finishAnimationFrame < 25 + (i * 5)) {
                    this.ctx.drawImage(this.images.confetti, i * 48, 0, 48, 48, (this.player.tileX * 16) - 16, (this.player.tileY * 16) - 20, 48, 48);
                    break;
                }
            }

            if (this.finishAnimationFrame > 128) {
                this.levels.level++;
                if (this.levels.level >= this.levels.levels.length) {
                    this.levels.level = 0;
                }
                this.game.restart();
                document.documentElement.style.setProperty('--canvas-scale', this.levels.getZoom(this.levels.level));
            }
        }
    }

    restart() {
        this.finishAnimation = false;
        this.finishAnimationFrame = 0;
    }

    nextLevel() {
        this.finishAnimation = true;
        this.finishAnimationFrame = 0;
    }
}