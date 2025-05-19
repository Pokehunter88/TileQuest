export default class Renderer {
    constructor(levels, player, ctx, game) {
        this.levels = levels;
        this.player = player;
        this.ctx = ctx;
        this.game = game;

        this.images = {
            tiles: new Image(),
            level1: new Image(),
            player: new Image(),
            tile: new Image(),
            brokenTile: new Image(),
            keyTile: new Image(),
        }

        this.images.tiles.src = 'assets/Tile Sheet.png';
        this.images.level1.src = 'assets/Level 1.png';
        this.images.player.src = 'assets/Player Sheet.png';
        this.images.tile.src = 'assets/Tile.png';
        this.images.brokenTile.src = 'assets/TileBroken.png';
        this.images.keyTile.src = 'assets/TileKey.png';

        this.finishAnimationFrame = 0;
        this.finishAnimation = false;
    }

    drawTiles() {
        for (let y = 0; y < this.levels.levelLayout.length; y++) {
            for (let x = 0; x < this.levels.levelLayout[y].length; x++) {
                if (this.levels.levelLayout[y][x] == 1 || this.levels.levelLayout[y][x] == 2) {
                    this.ctx.drawImage(this.images.tile, x * 16, y * 16);
                } else if (this.levels.levelLayout[y][x] == 5) {
                    this.ctx.drawImage(this.images.brokenTile, x * 16, y * 16);
                } else if (this.levels.levelLayout[y][x] == 3) {
                    this.ctx.drawImage(this.images.keyTile, x * 16, y * 16);
                } else if (this.levels.levelLayout[y][x] == 4) {
                    this.ctx.drawImage(this.images.tiles, 32, 0, 16, 16, x * 16, y * 16, 16, 16);
                }
            }
        }
    }

    drawLevel() {
        for (let y = 0; y < this.levels.levelLayout.length; y++) {
            for (let x = 0; x < this.levels.levelLayout[y].length; x++) {
                if (this.levels.levelLayout[y + 1] != undefined && this.levels.levelLayout[y - 1] != undefined && this.levels.levelLayout[y + 1][x] != 0)
                    if (this.levels.levelLayout[y + 1] != undefined && this.levels.levelLayout[y + 1][x] != 0) {
                        // this.ctx.drawImage(this.images.tiles, 16, 16, 16, 16, x * 16, y * 16, 16, 16);
                    }
            }
        }
    }

    update(frame) {
        if (frame < 128 && !this.finishAnimation) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(0, 0, 192, 128 - frame);
            this.ctx.fillRect(0, 128 + frame, 192, 128 - frame);
        }

        if (this.finishAnimation) {
            this.ctx.fillStyle = "#1E1F3B";
            this.ctx.fillRect(0, 0, 192, this.finishAnimationFrame);
            this.ctx.fillRect(0, 256 - this.finishAnimationFrame, 192, this.finishAnimationFrame);

            this.finishAnimationFrame++;

            if (this.finishAnimationFrame > 128) {
                this.levels.level++;
                document.documentElement.style.setProperty('--canvas-scale', (this.levels.levels[this.levels.level].zoom / window.devicePixelRatio).toString());
                this.game.restart();
            }
        }
    }

    restart() {
        this.finishAnimation = false;
        this.finishAnimationFrame = 0;
    }

    nextLevel() {
        setTimeout(() => {
            this.finishAnimation = true;
            this.finishAnimationFrame = 0;
        }, 100);
    }
}