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
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                navigator.keyboard.lock(["Escape"]);
            }

            if (this.playing) {
                this.pauseMenu.showing = !this.pauseMenu.showing;

                if (this.pauseMenu.showing) {
                    this.pauseMenu.selected = 0;
                }

                // if (
                //     document.documentElement.style.getPropertyValue(
                //         "--menu-visible"
                //     ) == 0 ||
                //     document.documentElement.style.getPropertyValue(
                //         "--menu-visible"
                //     ) === ""
                // ) {
                //     document.documentElement.style.setProperty(
                //         "--menu-visible",
                //         100
                //     );
                // } else {
                //     document.documentElement.style.setProperty(
                //         "--menu-visible",
                //         0
                //     );
                // }
            }
        });

        this.closeButton = document.getElementById("close-button");
        this.closeButton?.addEventListener("click", () => {
            if (
                this.playing &&
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 100
            ) {
                document.documentElement.style.setProperty("--menu-visible", 0);
                this.startScreen();
            }
        });

        this.levels = new Levels(this.canvas);
        this.input = new Input(this);
        this.player = new Player(this, this.levels, this.ctx, this.input);
        this.input.player = this.player;
        this.renderer = new Renderer(this.levels, this.player, this.ctx, this);
        this.player.renderer = this.renderer;
        this.tiles = new Tiles(this.levels, this.ctx, this.renderer);

        this.leftButton = document.getElementById("menu-left");
        this.leftButton?.addEventListener("click", () => {
            if (
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 100
            ) {
                if (this.levels.level == 0) {
                    this.levels.level = this.levels.levels.length - 1;
                } else {
                    this.levels.level--;
                }

                this.restart();
                document.documentElement.style.setProperty(
                    "--canvas-scale",
                    this.levels.getZoom(this.levels.level)
                );

                document.documentElement.style.setProperty("--menu-visible", 0);
            }
        });

        this.rightButton = document.getElementById("menu-right");
        this.rightButton?.addEventListener("click", () => {
            if (
                document.documentElement.style.getPropertyValue(
                    "--menu-visible"
                ) == 100
            ) {
                if (this.levels.level + 1 >= this.levels.levels.length) {
                    this.levels.level = 0;
                } else {
                    this.levels.level++;
                }

                this.restart();
                document.documentElement.style.setProperty(
                    "--canvas-scale",
                    this.levels.getZoom(this.levels.level)
                );

                document.documentElement.style.setProperty("--menu-visible", 0);
            }
        });

        this.lastFrame = Date.now();

        // document.documentElement.style.setProperty(
        //     "--canvas-scale",
        //     this.levels.getZoom(this.levels.level)
        // );

        // setTimeout(() => {
        //     document.documentElement.style.setProperty("--scale-speed", "1s");
        // }, 100);

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
            .catch(function (error) {
                console.log("Failed to fetch levels 1");
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
                        console.log("Failed to fetch levels 2");
                        console.log(error);
                    });
            });

        const url = new URL(window.location);
        const startLevel = url.searchParams.get("level");

        if (startLevel != null) {
            setTimeout(() => this.start(startLevel), 100);
        } else {
            new StartScreen(this);
        }
    }

    start(level) {
        requestAnimationFrame(() => this.update());
        document.documentElement.style.setProperty("--ui-visible", "1");
        this.levels.level = level;
        this.restart();
        this.renderer.timers.start = 0;
        this.playing = true;
    }

    startScreen() {
        this.playing = false;
        new StartScreen(this);
        document.documentElement.style.setProperty("--ui-visible", 0);
    }

    update() {
        if (!this.playing) return;

        const delta = (Date.now() - this.lastFrame) / 1000;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#1E1F3B";
        this.ctx.fillRect(0, 0, 192, 256);

        this.tiles.drawTiles();
        this.player.update(delta);
        this.renderer.update(delta);
        this.pauseMenu.update();

        this.lastFrame = Date.now();

        requestAnimationFrame(() => this.update());
    }

    restart() {
        localStorage.setItem("level", this.levels.level);
        this.player.restart();
        this.levels.restart();
        this.renderer.restart();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => new Game(), 100);
});
