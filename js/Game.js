import CanvasManager from './CanvasManager.js';
import Player from './Player.js';
import Levels from './Levels.js';
import Renderer from './Renderer.js';
import Input from './Input.js';
import Tiles from './Tiles.js';

class Game {
    static instance;
    constructor() {
        Game.instance = this;
        this.canvas = document.getElementById('canvas1');
        this.ctx = new CanvasManager(this.canvas, 192, 256);

        this.restartButton = document.getElementById('restart');
        this.restartButton?.addEventListener("click", () => this.restart());

        this.levels = new Levels();
        this.input = new Input(this);
        this.player = new Player(this.levels, this.ctx, this.input);
        this.renderer = new Renderer(this.levels, this.player, this.ctx, this);
        this.player.renderer = this.renderer;
        this.tiles = new Tiles(this.levels, this.ctx, this.renderer);

        this.frame = -10;
        requestAnimationFrame(() => this.update());

        document.documentElement.style.setProperty('--canvas-scale', (this.levels.levels[this.levels.level].zoom / window.devicePixelRatio).toString());

        setTimeout(() => {
            document.documentElement.style.setProperty('--scale-speed', '1s');
        }, 100,);
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.drawImage(this.renderer.images.level1, 0, 0);
        // this.renderer.drawLevel();
        this.tiles.drawTiles();
        this.renderer.drawTiles();

        this.frame++;
        this.player.update(this.frame);

        this.renderer.update(this.frame);

        requestAnimationFrame(() => this.update());
    }

    restart() {
        console.log("Restart");

        this.frame = -10;
        this.player.restart();
        this.levels.restart();
        this.renderer.restart();
    }
}

window.addEventListener('DOMContentLoaded', () => new Game());
