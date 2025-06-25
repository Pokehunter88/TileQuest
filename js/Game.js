import CanvasManager from "./CanvasManager.js";
import Player from "./Player.js";
import Levels from "./Levels.js";
import Renderer from "./Renderer.js";
import Input from "./Input.js";
import Tiles from "./Tiles.js";
import StartScreen from "./StartScreen.js";
import PauseMenu from "./PauseMenu.js";

class Game {
    static instance;
    constructor() {
        Game.instance = this;
        this.canvas = document.getElementById("canvas1");
        this.ctx = new CanvasManager(this.canvas, 192, 256);
        this.playing = false;

        this.restartButton = document.getElementById("restart");
        this.restartButton?.addEventListener("click", () => this.restart());

        this.pauseMenu = new PauseMenu(this);

        this.menuButton = document.getElementById("menu-button");
        this.menuButton?.addEventListener("click", () => {
            // if (!document.fullscreenElement) {
            //     document.documentElement.requestFullscreen();
            //     navigator.keyboard.lock(["Escape"]);
            // }

            if (this.playing) {
                this.pauseMenu.showing = !this.pauseMenu.showing;

                if (this.pauseMenu.showing) {
                    this.pauseMenu.selected = 0;
                }
            }
        });

        this.levels = new Levels(this.canvas);
        this.input = new Input(this);
        this.player = new Player(this, this.levels, this.ctx, this.input);
        this.input.player = this.player;
        this.renderer = new Renderer(this.levels, this.player, this.ctx, this);
        this.player.renderer = this.renderer;
        this.tiles = new Tiles(this.levels, this.ctx, this.renderer);

        this.lastFrame = window.performance.now();

        const levelsToChange = this.levels;

        fetch("/js/levels.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }

                return response.json();
            })
            .then((json) => {
                levelsToChange.levels = json;
            })
            .catch(function () {
                console.log("Failed to fetch levels using fallback");
                fetch(
                    "https://raw.githubusercontent.com/Pokehunter88/TileQuest/refs/heads/main/js/levels.json"
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }

                        return response.json();
                    })
                    .then((json) => {
                        levelsToChange.levels = json;
                    })
                    .catch(function (error) {
                        console.log("Failed to fetch levels using fallback");
                        console.log(error);
                    });
            });

        const url = new URL(window.location);
        const startLevel = url.searchParams.get("level");

        if (startLevel != null) {
            setTimeout(() => this.start(startLevel), 100);
        } else {
            new StartScreen(this);
            // new LevelSelect(this);
        }
    }

    start(level) {
        requestAnimationFrame(() => this.update());
        this.playing = true;
        document.documentElement.style.setProperty("--ui-visible", "1");
        this.levels.level = level;
        this.restart();
        this.renderer.timers.start = 0;
    }

    startScreen() {
        this.playing = false;
        new StartScreen(this);
        document.documentElement.style.setProperty("--ui-visible", 0);
    }

    update() {
        if (!this.playing) return;


        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#1E1F3B";
        this.ctx.fillRect(0, 0, 192, 256);

        this.tiles.drawTiles();
        const delta = (window.performance.now() - this.lastFrame) / 1000;
        this.player.update(delta);
        this.renderer.update(delta);
        this.pauseMenu.update();

        this.lastFrame = window.performance.now();

        requestAnimationFrame(() => this.update());
    }

    restart() {
        localStorage.setItem("level", this.levels.level);
        localStorage.setItem("unlockedLevel", Math.max(this.levels.level, localStorage.getItem("unlockedLevel") ?? 0));
        this.player.restart();
        this.levels.restart();
        this.renderer.restart();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => new Game(), 100);
});
